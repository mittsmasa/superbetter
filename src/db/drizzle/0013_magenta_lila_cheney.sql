CREATE TABLE `villainHistory` (
	`id` varchar(255) NOT NULL,
	`villainId` varchar(255) NOT NULL,
	`createdAt` datetime(3) NOT NULL,
	`updatedAt` datetime(3) NOT NULL,
	CONSTRAINT `villainHistory_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `villainHistory` ADD CONSTRAINT `villainHistory_villainId_quest_id_fk` FOREIGN KEY (`villainId`) REFERENCES `quest`(`id`) ON DELETE cascade ON UPDATE no action;