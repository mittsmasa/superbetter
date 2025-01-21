CREATE TABLE `powerupHistory` (
	`id` varchar(255) NOT NULL,
	`questId` varchar(255) NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `powerupHistory_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `powerupHistory` ADD CONSTRAINT `powerupHistory_questId_quest_id_fk` FOREIGN KEY (`questId`) REFERENCES `quest`(`id`) ON DELETE cascade ON UPDATE no action;