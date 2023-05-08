CREATE TABLE "user" (
  "id" SERIAL PRIMARY KEY,
  "username" varchar not null,
  "email" varchar,
  "password" varchar,
  "created_at" timestamp DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "user_item" (
  "id" SERIAL PRIMARY KEY,
  "user_id" integer not null,
  "item_id" integer not null,
  "amount" integer not null
);


