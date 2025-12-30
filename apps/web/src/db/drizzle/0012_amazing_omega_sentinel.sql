CREATE TABLE `questHistory` (
	`id` varchar(255) NOT NULL,
	`questId` varchar(255) NOT NULL,
	`createdAt` datetime(3) NOT NULL,
	`updatedAt` datetime(3) NOT NULL,
	CONSTRAINT `questHistory_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `questHistory` ADD CONSTRAINT `questHistory_questId_quest_id_fk` FOREIGN KEY (`questId`) REFERENCES `quest`(`id`) ON DELETE cascade ON UPDATE no action;