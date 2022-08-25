CREATE TABLE IF NOT EXISTS `kanban_web_app`.`user_in_group` (
  `user_id` INT NOT NULL,
  `group_id` INT NOT NULL,
  PRIMARY KEY (`group_id`, `user_id`),
  INDEX `group_id_idx` (`group_id` ASC) VISIBLE,
  INDEX `user_id_idx` (`user_id` ASC) VISIBLE,
  CONSTRAINT `group_id`
    FOREIGN KEY (`group_id`)
    REFERENCES `kanban_web_app`.`group` (`group_id`),
  CONSTRAINT `user_id`
    FOREIGN KEY (`user_id`)
    REFERENCES `kanban_web_app`.`user` (`user_id`))
ENGINE = InnoDB