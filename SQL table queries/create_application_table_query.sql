CREATE TABLE IF NOT EXISTS `kanban_web_app`.`application` (
  `app_acronym` CHAR(50) NOT NULL,
  `app_description` TEXT NULL DEFAULT NULL,
  `app_Rnumber` INT NULL DEFAULT NULL,
  `app_startDate` DATE NULL DEFAULT NULL,
  `app_endDate` DATE NULL DEFAULT NULL,
  `app_permit_open` INT NULL DEFAULT NULL,
  `app_permit_toDoList` INT NULL DEFAULT NULL,
  `app_permit_doing` INT NULL DEFAULT NULL,
  `app_permit_done` INT NULL DEFAULT NULL,
  `app_permit_create` INT NULL DEFAULT NULL,
  PRIMARY KEY (`app_acronym`))
ENGINE = InnoDB