CREATE TABLE `testResult` (
	`id` varchar(255) NOT NULL,
	`userId` varchar(255) NOT NULL,
	`testTypeId` varchar(255) NOT NULL,
	`answer` json NOT NULL,
	`createdAt` datetime(3) NOT NULL,
	CONSTRAINT `testResult_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `testType` (
	`id` varchar(255) NOT NULL,
	`name` enum('pos-neg') NOT NULL,
	CONSTRAINT `testType_id` PRIMARY KEY(`id`),
	CONSTRAINT `testType_name_unique` UNIQUE(`name`)
);
--> statement-breakpoint
ALTER TABLE `testResult` ADD CONSTRAINT `testResult_userId_user_id_fk` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `testResult` ADD CONSTRAINT `testResult_testTypeId_testType_id_fk` FOREIGN KEY (`testTypeId`) REFERENCES `testType`(`id`) ON DELETE cascade ON UPDATE no action;