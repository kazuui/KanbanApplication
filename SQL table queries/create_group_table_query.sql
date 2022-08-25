CREATE TABLE IF NOT EXISTS `kanban_web_app`.`group` (
  `group_id` INT NOT NULL AUTO_INCREMENT,
  `group_name` CHAR(45) NULL DEFAULT NULL,
  PRIMARY KEY (`group_id`))
ENGINE = InnoDB