CREATE TABLE IF NOT EXISTS "journal_entry" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"title" varchar(80) DEFAULT 'Untintled' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"word_count" integer DEFAULT 0 NOT NULL,
	"content" json DEFAULT '{"title":"Untitled","content":{"type":"doc","content":[{"type":"heading","attrs":{"level":1},"content":[{"type":"text","text":"Untitled"}]}]},"word_count":8}'::json,
	"is_private" boolean DEFAULT false NOT NULL,
	"end_date" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(50) NOT NULL,
	"email" varchar(100) NOT NULL,
	"password" varchar(255) NOT NULL,
	"end_date" date,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "journal_entry" ADD CONSTRAINT "journal_entry_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
