CREATE TABLE `Admins` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`username` varchar(255) NOT NULL,
	`password` varchar(255) NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `Admins_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `NFTCollections` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`is_approved` boolean NOT NULL,
	`contractAddress` varchar(255) NOT NULL,
	`user_id` bigint,
	`teacher_id` bigint NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `NFTCollections_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `NFTs` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`token_id` bigint NOT NULL,
	`hash` varchar(512) NOT NULL,
	`user_id` bigint NOT NULL,
	`minted_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `NFTs_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `Teachers` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`email` varchar(255) NOT NULL,
	`password` varchar(255) NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `Teachers_id` PRIMARY KEY(`id`),
	CONSTRAINT `Teachers_email_unique` UNIQUE(`email`)
);
--> statement-breakpoint
CREATE TABLE `Users` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`userhash` varchar(255) NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `Users_id` PRIMARY KEY(`id`),
	CONSTRAINT `Users_userhash_unique` UNIQUE(`userhash`)
);
--> statement-breakpoint
ALTER TABLE `NFTCollections` ADD CONSTRAINT `NFTCollections_user_id_Users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `Users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `NFTCollections` ADD CONSTRAINT `NFTCollections_teacher_id_Teachers_id_fk` FOREIGN KEY (`teacher_id`) REFERENCES `Teachers`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `NFTs` ADD CONSTRAINT `NFTs_user_id_Users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `Users`(`id`) ON DELETE no action ON UPDATE no action;