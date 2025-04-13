CREATE TABLE "products" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text,
	"email" text,
	"created_at" timestamp DEFAULT now()
);
