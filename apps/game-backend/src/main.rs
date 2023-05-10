use axum::{extract::State, http::StatusCode, routing::get, Json, Router, Server};
use game_postgres_entities::{user::Entity as User, user_item::Entity as UserItem};
use sea_orm::{ConnectionTrait, Database, DatabaseConnection, EntityTrait};
use serde_json::{json, Value};
use std::env;

#[derive(Clone)]
struct AppState {
    pg: DatabaseConnection,
}

async fn index(ctx: State<AppState>) -> Result<Json<Value>, (StatusCode, &'static str)> {
    let response = json!({"status": "ok"}).into();

    let users = match User::find().all(&ctx.pg).await {
        Ok(rows) => serde_json::to_string(&rows),
        Err(_) => return Err((StatusCode::INTERNAL_SERVER_ERROR, "Failed to load users")),
    };

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
    axum::Server::bind(&"0.0.0.0:1234".parse()?)
        .serve(app)
        .await?;

    Ok(())
}

pub fn main() {
    let result = start();

    if let Some(err) = result.err() {
        println!("Error: {err}");
    }
}
