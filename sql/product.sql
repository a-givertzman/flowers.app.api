DROP TABLE IF EXISTS `u1489690_flowers_app`.`product`;

CREATE TABLE IF NOT EXISTS `u1489690_flowers_app`.`product` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `group`  VARCHAR(50) NOT NULL COMMENT 'Признак группировки',
  `name` VARCHAR(255) NOT NULL COMMENT 'Нименование товара',
  `detales` VARCHAR(255) NULL COMMENT 'Комментарий',
  `primary_price` DECIMAL(20,2) UNSIGNED NOT NULL COMMENT 'Цена за единицу в валюте заккупки',
  `primary_currency`  VARCHAR(3) NOT NULL COMMENT 'Валюта закупки',
  `primary_order_quantity` INT UNSIGNED NOT NULL COMMENT 'Квант заказа у постовщика',
  `order_quantity` INT UNSIGNED NOT NULL COMMENT 'Квант заказа для участников',
  `picture` VARCHAR(2100) NULL COMMENT 'Ссылка на изображение товара',
  `description` VARCHAR(3000) NULL COMMENT 'Описание товара',
  `created` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deleted` TIMESTAMP NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
)
  ENGINE=InnoDB
  COMMENT='Товары закупок'
  DEFAULT CHARACTER SET utf8 COLLATE utf8_bin;
