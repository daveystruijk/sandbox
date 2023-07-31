use serde::{Deserialize, Serialize};
use sqlx::{query_as, PgPool};

#[derive(Serialize, Deserialize)]
pub struct UserResult {
    id: i32,
    username: String,
    email: Option<String>,
}

pub async fn fetch_all_users(pg: &PgPool) -> Result<Vec<UserResult>, sqlx::Error> {
    query_as!(
        UserResult,
        r#"
        SELECT id, username, email
        FROM users
        "#
    )
    .fetch_all(pg)
    .await
}
