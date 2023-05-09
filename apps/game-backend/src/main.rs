use axum::{extract::State, http::StatusCode, routing::get, Json, Router, Server};
use game_postgres_entities::{user, user_item};
use sea_orm::{Database, DatabaseConnection};
use serde_json::{json, Value};
use std::env;

#[derive(Clone)]
struct AppState {
    pg: DatabaseConnection,
}

async fn index(state: State<AppState>) -> Result<Json<Value>, (StatusCode, &'static str)> {
    let response = json!({"status": "ok"}).into();
    Ok(Json(response))
}

#[tokio::main]
async fn start() -> anyhow::Result<()> {
    dotenvy::dotenv().ok();

    // Initialize database connection
    let database_url = env::var("DATABASE_URL").expect("DATABASE_URL is not set in .env file");
    let pg = Database::connect(database_url)
        .await
        .expect("Database connection failed");

    // Build app context
    let state = AppState { pg };

    // Routes
    let app = Router::new()
        .route("/", get(index))
        .with_state(state)
        .into_make_service();

    // Server
    axum::Server::bind(&"0.0.0.0:1234".parse()?).serve(app).await?;

    Ok(())
}

pub fn main() {
    let result = start();

    if let Some(err) = result.err() {
        println!("Error: {err}");
    }
}