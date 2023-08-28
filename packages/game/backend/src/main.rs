use axum::{
    extract::{ws::WebSocket, State, WebSocketUpgrade},
    http::{Method, StatusCode},
    response::{IntoResponse, Response},
    routing::get,
    Json, Router, Server,
};
use sqlx::{postgres::PgPoolOptions, PgPool};
use std::{env, net::SocketAddr, time::Duration};
use tokio::sync::broadcast;
use tower_http::trace::TraceLayer;
use tower_http::{
    cors::{Any, CorsLayer},
    trace::DefaultMakeSpan,
};
use tracing_subscriber::{layer::SubscriberExt, util::SubscriberInitExt};

mod chat;
mod queries;
mod websocket;

struct Position {
    x: i32,
    y: i32,
}

enum GameMessage {
    PlayerMove { from: Position, to: Position },
}

#[derive(Clone)]
pub struct AppContext {
    // Connection to the postgres database
    pg: PgPool,
    // Broadcast channel for chat messages
    tx: broadcast::Sender<String>,
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
    let (tx, _rx) = broadcast::channel(100);
    let ctx = AppContext { pg, tx };

    let cors = CorsLayer::new()
        // allow `GET` and `POST` when accessing the resource
        .allow_methods(vec![Method::GET, Method::POST])
        // allow requests from any origin
        .allow_origin(Any);

    // Routes
    let app = Router::new()
        .route("/", get(index))
        .route("/ws", get(websocket::ws_handler))
        .with_state(ctx)
        .layer(cors)
        .layer(
            TraceLayer::new_for_http()
                .make_span_with(DefaultMakeSpan::default().include_headers(true)),
        )
        .into_make_service_with_connect_info::<SocketAddr>();

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
