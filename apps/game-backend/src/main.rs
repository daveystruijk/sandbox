use axum::{extract::State, http::StatusCode, routing::get, Json, Router, Server};
use game_postgres_entities::user::Entity as User;
use sea_orm::{Database, DatabaseConnection, EntityTrait};
use serde_json::Value;
use std::env;
use tracing_subscriber::{layer::SubscriberExt, util::SubscriberInitExt};

mod websocket;

#[derive(Clone)]
pub struct AppContext {
    pg: DatabaseConnection,
}

async fn index(ctx: State<AppContext>) -> Result<Json<Value>, (StatusCode, &'static str)> {
    let users = User::find()
        .into_json()
        .all(&ctx.pg)
        .await
        .map_err(|_| (StatusCode::INTERNAL_SERVER_ERROR, "Failed to load users"))?;

    Ok(Json(users.into()))
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
    let pg = Database::connect(database_url)
        .await
        .expect("Database connection failed");

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
