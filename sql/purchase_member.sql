DROP TABLE IF EXISTS `u1489690_flowers_app`.`purchase_member`;

CREATE TABLE IF NOT EXISTS `u1489690_flowers_app`.`purchase_member` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `purchase/id` INT UNSIGNED NOT NULL COMMENT 'Идентификактор закупки из purchase',
  `client/id` INT UNSIGNED NOT NULL COMMENT 'Идентификактор клиента из client',
  `product/id` INT UNSIGNED NOT NULL COMMENT 'Идентификактор товара из product',
  `count` INT UNSIGNED NOT NULL COMMENT 'Количество заказал участник',
  `distributed` INT UNSIGNED NOT NULL COMMENT 'Количество получил участник',
  `cost` DECIMAL(20,2) UNSIGNED NOT NULL COMMENT 'Отпускная стоимость заказа',
  `paid` DECIMAL(20,2) UNSIGNED NOT NULL COMMENT 'Орплачено заказчиком',
  `torefound` DECIMAL(20,2) UNSIGNED NOT NULL COMMENT 'Сумма к возврату по заказу',
  `refounded` DECIMAL(20,2) UNSIGNED NOT NULL COMMENT 'Возвращено по заказу',
  `created` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deleted` TIMESTAMP NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
)
  ENGINE=InnoDB
  COMMENT='Участники закупки'
  DEFAULT CHARACTER SET utf8 COLLATE utf8_bin;