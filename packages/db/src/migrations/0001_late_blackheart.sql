CREATE TABLE IF NOT EXISTS "users"."p2p_transfers" (
	"id" serial PRIMARY KEY NOT NULL,
	"amount" integer NOT NULL,
	"timestamp" timestamp with time zone NOT NULL,
	"from_user_id" integer NOT NULL,
	"to_user_id" integer NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "users"."p2p_transfers" ADD CONSTRAINT "p2p_transfers_from_user_id_users_id_fk" FOREIGN KEY ("from_user_id") REFERENCES "users"."users"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "users"."p2p_transfers" ADD CONSTRAINT "p2p_transfers_to_user_id_users_id_fk" FOREIGN KEY ("to_user_id") REFERENCES "users"."users"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
