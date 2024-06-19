ALTER TABLE "journal_entry" RENAME TO "entry";--> statement-breakpoint
ALTER TABLE "entry" DROP CONSTRAINT "journal_entry_user_id_users_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "entry" ADD CONSTRAINT "entry_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
