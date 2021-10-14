-- DROP TABLE IF EXISTS `u1489690_flowers_app`.`purchase_content`;

CREATE TABLE IF NOT EXISTS `u1489690_flowers_app`.`purchase_content` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `purchase/id` INT UNSIGNED NOT NULL COMMENT 'Идентификактор закупки из purchase_list',
  `product/id` INT UNSIGNED NOT NULL COMMENT 'Идентификактор товара из product',
  `sale_price` DECIMAL(20,2) UNSIGNED NOT NULL COMMENT 'Отпускная цена за единицу',
  `sale_currency`  VARCHAR(3) NOT NULL COMMENT 'Валюта продажи',
  `shipping`  VARCHAR(3) NOT NULL COMMENT 'Транспотрные расходы',
  `count` INT UNSIGNED NOT NULL COMMENT 'Количество единиц товара в закупке',
  `remains` INT UNSIGNED NOT NULL COMMENT 'Остаток единиц товара',
  `created` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deleted` TIMESTAMP NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
)
  ENGINE=InnoDB
  COMMENT='Список закупок'
  DEFAULT CHARACTER SET utf8 COLLATE utf8_bin;
  
-- ALTER TABLE `u1489690_flowers_app`.`purchase_content`
--   MODIFY `remains` INT 
--   as (getRemains(`count`, `purchase/id`, `id`))
--   COMMENT 'Остаток единиц товара';

create or replace
	view purchaseContentView as 
		select 
			`purchase_content`.`purchase/id`,
			`purchase_content`.`id`,
			`purchase_content`.`sale_price`,
			`purchase_content`.`sale_currency`,
			`purchase_content`.`shipping`,
			`purchase_content`.`count`,
			`product`.`id` as `product/id`,
			`product`.`group` as `product/group`,
			`product`.`name` as `product/name`,
			`product`.`detales` as `product/detales`,
			`product`.`primary_price` as `product/primary_price`,
			`product`.`primary_currency` as `product/primary_currency`,
			`product`.`primary_order_quantity` as `product/primary_order_quantity`,
			`product`.`order_quantity` as `product/order_quantity`,
			getRemains(`purchase_content`.`purchase/id`, `purchase_content`.`id`, `purchase_content`.`count`) as `remains`
        from `purchase_content`
		left join `product` ON `purchase_content`.`product/id` = `product`.`id`
        order by `purchase_content`.`id`;

select * from purchaseContentView where `purchase/id` = 1;
select getRemains(1, 28, 51);


drop function if exists getRemains;
DELIMITER $$
create function getRemains(
	purchase_id int,
	purchase_content_id int,
    purchase_content_count int
)
returns int
begin      
	declare purchase_member_count int;
    set purchase_member_count = ifnull((
		select sum(`count`)
			from `purchase_member`
			where `purchase/id` = purchase_id
			and `purchase_content/id` = purchase_content_id
	), 0);
	return purchase_content_count - purchase_member_count;
end$$
DELIMITER ;