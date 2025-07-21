CREATE TABLE `notificationHistory` (
	`id` varchar(255) NOT NULL,
	`userId` varchar(255) NOT NULL,
	`type` enum('daily_mission_reminder','missed_streak','achievement_unlock') NOT NULL,
	`message` text NOT NULL,
	`sentAt` datetime(3) NOT NULL,
	`isRead` boolean NOT NULL DEFAULT false,
	`createdAt` datetime(3) NOT NULL,
	`updatedAt` datetime(3) NOT NULL,
	CONSTRAINT `notificationHistory_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `notificationSetting` (
	`userId` varchar(255) NOT NULL,
	`dailyMissionReminder` boolean NOT NULL DEFAULT true,
	`reminderTime` varchar(8) NOT NULL DEFAULT '20:00:00',
	`enablePushNotifications` boolean NOT NULL DEFAULT false,
	`pushSubscription` json,
	`createdAt` datetime(3) NOT NULL,
	`updatedAt` datetime(3) NOT NULL,
	CONSTRAINT `notificationSetting_userId` PRIMARY KEY(`userId`)
);
--> statement-breakpoint
ALTER TABLE `notificationHistory` ADD CONSTRAINT `notificationHistory_userId_user_id_fk` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `notificationSetting` ADD CONSTRAINT `notificationSetting_userId_user_id_fk` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE cascade ON UPDATE no action;