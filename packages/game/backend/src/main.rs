use axum::{
    extract::State,
    http::StatusCode,
    response::{IntoResponse, Response},
    routing::get,
    Json, Router, Server,
};
use sqlx::{postgres::PgPoolOptions, PgPool};
use std::{env, time::Duration};
use tracing_subscriber::{layer::SubscriberExt, util::SubscriberInitExt};

mod chat;
mod queries;
mod websocket;

#[derive(Clone)]
pub struct AppContext {
    pg: PgPool,
}

async fn index(ctx: State<AppContext>) -> Response {
    let users = match queries::users::fetch_all_users(&ctx.pg).await {
        Ok(result) => result,
        Err(_) => return StatusCode::INTERNAL_SERVER_ERROR.into_response(),
    };

    Json(users).into_response()
}

#[tokio::main]
async fn start() -> anyhow::Result<()> {
    // Initialize logging
    env::set_var("RUST_LOG", "info");
    tracing_subscriber::registry()
        .with(
            tracing_subscriber::EnvFilter::try_from_default_env()
                .unwrap_or_else(|_| "game_backend=trace".into()),
        )
        .with(tracing_subscriber::fmt::layer())
        .init();

    tracing::info!("🟠 Starting up...");

    // Parse environment variables
    dotenvy::dotenv().ok();
    let listen_addr = env::var("LISTEN_ADDR").unwrap_or("0.0.0.0:4001".to_string());
    let database_url = env::var("DATABASE_URL").expect("DATABASE_URL is not set in .env file");

    // Initialize database connection
    let pg = PgPoolOptions::new()
        .acquire_timeout(Duration::from_secs(4))
        .max_connections(4)
        .connect(&database_url)
        .await?;

    // Build app context
    let ctx = AppContext { pg };

    // Routes
    let app = Router::new()
        .route("/", get(index))
        .route("/ws", get(websocket::ws_handler))
        .with_state(ctx)
        .into_make_service();

    // Server
    let server = Server::bind(&listen_addr.parse()?);
    tracing::info!("🟢 Listening on {}", listen_addr);
    server.serve(app).await?;

    Ok(())
}

pub fn main() {
    let result = start();

    if let Some(err) = result.err() {
        println!("Error: {err}");
    }
}
