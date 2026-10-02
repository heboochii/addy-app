CREATE TABLE `accounts` (
	`id` text PRIMARY KEY NOT NULL,
	`email` text NOT NULL,
	`display_name` text NOT NULL,
	`kind` text NOT NULL,
	`sector` text DEFAULT '' NOT NULL,
	`interests_json` text DEFAULT '[]' NOT NULL,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL,
	`consent_version` text NOT NULL,
	`intake_step` integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE INDEX `idx_accounts_kind_created` ON `accounts` (`kind`,`created_at`);--> statement-breakpoint
CREATE TABLE `account_events` (
	`user_id` text NOT NULL,
	`event_id` text NOT NULL,
	`action` text NOT NULL,
	`item_id` text DEFAULT '' NOT NULL,
	`created_at` text NOT NULL,
	PRIMARY KEY(`user_id`, `event_id`),
	FOREIGN KEY (`user_id`) REFERENCES `accounts`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `idx_events_created` ON `account_events` (`created_at`);