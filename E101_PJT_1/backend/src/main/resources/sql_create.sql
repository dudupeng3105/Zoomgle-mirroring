DROP TABLE IF EXISTS `user`;

CREATE TABLE `user` (
	`user_seq`	INT	NOT NULL	COMMENT 'Auto Increment',
	`id`	VARCHAR(30)	NOT NULL,
	`name`	VARCHAR(30)	NULL,
	`email`	VARCHAR(45)	NULL,
	`password`	VARCHAR(30)	NULL,
	`nickname`	VARCHAR(30)	NULL,
	`REG_DTM`	DATETIME	NOT NULL,
	`MOD_DTM`	DATETIME	NULL
);

DROP TABLE IF EXISTS `freind`;

CREATE TABLE friend (
	`relation_seq`	INT	NOT NULL	COMMENT 'Auto Increment',
	`my`	INT	NOT NULL	COMMENT 'Auto Increment',
	`friend`	INT	NOT NULL	COMMENT 'Auto Increment',
	`REG_DTM`	DATETIME	NULL,
	`MOD_DTM`	DATETIME	NULL
);

DROP TABLE IF EXISTS `photo`;

CREATE TABLE `photo` (
	`photo_seq`	INT	NOT NULL	COMMENT 'Auto Increment',
	`game`	INT	NOT NULL	COMMENT 'Auto Increment',
	`photo_url`	VARCHAR(45)	NULL,
	`REG_DTM`	DATETIME	NOT NULL,
	`MOD_DTM`	DATETIME	NULL
);

DROP TABLE IF EXISTS `mission`;

CREATE TABLE `mission` (
	`mission_seq`	INT	NOT NULL	COMMENT 'Auto Increment',
	`name`	VARCHAR(45)	NULL,
	`description_url`	VARCHAR(45)	NULL
);

DROP TABLE IF EXISTS `game`;

CREATE TABLE `game` (
	`game_seq`	INT	NOT NULL	COMMENT 'Auto Increment',
	`mvp`	INT	NOT NULL	COMMENT 'Auto Increment',
	`date`	DATETIME	NOT NULL,
	`REG_DTM`	DATETIME	NOT NULL,
	`MOD_DTM`	DATETIME	NULL
);

DROP TABLE IF EXISTS `game_user`;

CREATE TABLE `game_user` (
	`game_user_seq`	INT	NOT NULL	COMMENT 'Auto Increment',
	`game`	INT	NOT NULL	COMMENT 'Auto Increment',
	`user`	INT	NOT NULL	COMMENT 'Auto Increment',
	`REG_DTM`	DATETIME	NOT NULL,
	`MOD_DTM`	DATETIME	NULL
);

DROP TABLE IF EXISTS `invite`;

CREATE TABLE `invite` (
	`invite_seq`	INT	NOT NULL	COMMENT 'Auto Increment',
	`game`	INT	NOT NULL	COMMENT 'Auto Increment',
	`sender`	INT	NOT NULL	COMMENT 'Auto Increment',
	`receiver`	INT	NOT NULL	COMMENT 'Auto Increment',
	`REG_DTM`	DATETIME	NOT NULL,
	`MOD_DTM`	DATETIME	NULL
);

DROP TABLE IF EXISTS `mission_content`;

CREATE TABLE `mission_content` (
	`mission_seq`	INT	NOT NULL	COMMENT 'Auto Increment',
	`code`	CHAR(3)	NULL,
	`content`	VARCHAR(45)	NULL
);

ALTER TABLE `user` ADD CONSTRAINT `PK_USER` PRIMARY KEY (
	`user_seq`
);

ALTER TABLE friend ADD CONSTRAINT `PK_FREIND` PRIMARY KEY (
	`relation_seq`
);

ALTER TABLE `photo` ADD CONSTRAINT `PK_PHOTO` PRIMARY KEY (
	`photo_seq`,
	`game`
);

ALTER TABLE `mission` ADD CONSTRAINT `PK_MISSION` PRIMARY KEY (
	`mission_seq`
);

ALTER TABLE `game` ADD CONSTRAINT `PK_GAME` PRIMARY KEY (
	`game_seq`
);

ALTER TABLE `game_user` ADD CONSTRAINT `PK_GAME_USER` PRIMARY KEY (
	`game_user_seq`,
	`game`
);

ALTER TABLE `invite` ADD CONSTRAINT `PK_INVITE` PRIMARY KEY (
	`invite_seq`,
	`game`
);

ALTER TABLE `mission_content` ADD CONSTRAINT `PK_MISSION_CONTENT` PRIMARY KEY (
	`mission_seq`
);

ALTER TABLE `photo` ADD CONSTRAINT `FK_game_TO_photo_1` FOREIGN KEY (
	`game`
)
REFERENCES `game` (
	`game_seq`
);

ALTER TABLE `game_user` ADD CONSTRAINT `FK_game_TO_game_user_1` FOREIGN KEY (
	`game`
)
REFERENCES `game` (
	`game_seq`
);

ALTER TABLE `invite` ADD CONSTRAINT `FK_game_TO_invite_1` FOREIGN KEY (
	`game`
)
REFERENCES `game` (
	`game_seq`
);

ALTER TABLE `mission_content` ADD CONSTRAINT `FK_mission_TO_mission_content_1` FOREIGN KEY (
	`mission_seq`
)
REFERENCES `mission` (
	`mission_seq`
);

