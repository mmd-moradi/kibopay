CREATE SCHEMA "users";
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."auth_type" AS ENUM('email', 'google', 'github');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."onramp_status" AS ENUM('Success', 'Failure', 'Processing');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users"."balance" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"amount" integer NOT NULL,
	"locked" integer NOT NULL,
	CONSTRAINT "balance_user_id_unique" UNIQUE("user_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users"."onramp_transactions" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"status" "onramp_status" NOT NULL,
	"token" text NOT NULL,
	"provider" text NOT NULL,
	"amount" integer NOT NULL,
	"start_time" timestamp with time zone NOT NULL,
	CONSTRAINT "onramp_transactions_token_unique" UNIQUE("token")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users"."users" (
	"id" serial PRIMARY KEY NOT NULL,
	"email" text,
	"name" text,
	"number" text NOT NULL,
	"password" text NOT NULL,
	"auth_type" "auth_type" DEFAULT 'email' NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email"),
	CONSTRAINT "users_number_unique" UNIQUE("number")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "users"."balance" ADD CONSTRAINT "balance_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"."users"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "users"."onramp_transactions" ADD CONSTRAINT "onramp_transactions_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"."users"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
