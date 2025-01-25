CREATE TABLE `epicwin` (
	`id` varchar(255) NOT NULL,
	`title` varchar(255) NOT NULL,
	`description` text,
	`userId` varchar(255) NOT NULL,
	`count` int NOT NULL DEFAULT 0,
	`archived` boolean NOT NULL DEFAULT false,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `epicwin_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `missionCondition` (
	`id` varchar(255) NOT NULL,
	`missionId` varchar(255) NOT NULL,
	`conditionType` enum('any','specific'),
	`itemType` enum('quest','powerup','villain','epicwin'),
	`itemId` varchar(255),
	`completed` boolean NOT NULL DEFAULT false,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `missionCondition_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `mission` (
	`id` varchar(255) NOT NULL,
	`title` varchar(255) NOT NULL,
	`description` text,
	`userId` varchar(255) NOT NULL,
	`count` int NOT NULL DEFAULT 0,
	`completed` boolean NOT NULL DEFAULT false,
	`deadline` timestamp,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `mission_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `powerup` (
	`id` varchar(255) NOT NULL,
	`title` varchar(255) NOT NULL,
	`description` text,
	`userId` varchar(255) NOT NULL,
	`count` int NOT NULL DEFAULT 0,
	`archived` boolean NOT NULL DEFAULT false,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `powerup_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `quest` (
	`id` varchar(255) NOT NULL,
	`title` varchar(255) NOT NULL,
	`description` text,
	`userId` varchar(255) NOT NULL,
	`count` int NOT NULL DEFAULT 0,
	`archived` boolean NOT NULL DEFAULT false,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `quest_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `userProfile` (
	`userId` varchar(255) NOT NULL,
	`challenge` varchar(255),
	`values` varchar(255),
	`hiddenIdentity` varchar(255)
);
--> statement-breakpoint
CREATE TABLE `villain` (
	`id` varchar(255) NOT NULL,
	`title` varchar(255) NOT NULL,
	`description` text,
	`userId` varchar(255) NOT NULL,
	`count` int NOT NULL DEFAULT 0,
	`archived` boolean NOT NULL DEFAULT false,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `villain_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `epicwin` ADD CONSTRAINT `epicwin_userId_user_id_fk` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `missionCondition` ADD CONSTRAINT `missionCondition_missionId_mission_id_fk` FOREIGN KEY (`missionId`) REFERENCES `mission`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `mission` ADD CONSTRAINT `mission_userId_user_id_fk` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `powerup` ADD CONSTRAINT `powerup_userId_user_id_fk` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `quest` ADD CONSTRAINT `quest_userId_user_id_fk` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `userProfile` ADD CONSTRAINT `userProfile_userId_user_id_fk` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `villain` ADD CONSTRAINT `villain_userId_user_id_fk` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE cascade ON UPDATE no action;