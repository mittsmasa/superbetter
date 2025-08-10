CREATE TABLE `epicwinHistory` (
	`id` varchar(255) NOT NULL,
	`epicwinId` varchar(255) NOT NULL,
	`createdAt` datetime(3) NOT NULL,
	`updatedAt` datetime(3) NOT NULL,
	CONSTRAINT `epicwinHistory_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `epicwinHistory` ADD CONSTRAINT `epicwinHistory_epicwinId_epicwin_id_fk` FOREIGN KEY (`epicwinId`) REFERENCES `epicwin`(`id`) ON DELETE cascade ON UPDATE no action;