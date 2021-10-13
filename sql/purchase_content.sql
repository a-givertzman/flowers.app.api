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


DROP FUNCTION IF EXISTS getRemains;
DELIMITER $$
CREATE FUNCTION getRemains(pCount INT, purchase_id INT, purchase_content_id INT)
RETURNS INT deterministic
begin
	return (pCount - (select sum(`count`)
	from `purchase_member`
	where `purchase/id` = purchase_id
	and `purchase_content/id` = purchase_content_id));
end$$
DELIMITER ;

drop procedure if exists updateRemains;
DELIMITER $$
create procedure updateRemains(in purchase_id int, in purchase_content_id int)
begin
	declare pCount int;	#purchase_content.count
	declare newRemains int;	#purchase_member.remains
    
    select `count` 
		into pCount 
        from `purchase_content` 
        where `purchase_content`.`id` = purchase_content_id;
    
	set newRemains = (pCount - (select sum(`count`)
	from `purchase_member`
	where `purchase_member`.`purchase/id` = purchase_id
	and `purchase_content/id` = purchase_content_id));
    
    update `purchase_content`
		set `purchase_content`.remains = newRemains
        where `purchase_content`.`id` = purchase_content_id;
end$$
DELIMITER ;

drop trigger if exists onUpdatePurchaseMemberCount;
DELIMITER //
create trigger onUpdatePurchaseMemberCount after update on `purchase_member`
for each row
begin
   -- if !(new.`count` <=> old.`count`) then
      call updateRemains(new.`purchase/id`, old.`purchase_content/id`);
      call updateRemains(new.`purchase/id`, new.`purchase_content/id`);
   -- end if;
end;//
DELIMITER ;

drop trigger if exists onUpdatePurchaseContentCount;
DELIMITER //
create trigger onUpdatePurchaseContentCount before update on `purchase_content`
for each row
begin
   -- if !(new.`count` <=> old.`count`) then
	set new.`remains` = (new.`count` - ifnull((select sum(`count`)
	from `purchase_member`
	where `purchase_member`.`purchase/id` = new.`purchase/id`
	and `purchase_member`.`purchase_content/id` = new.`id`), 0));
   -- end if;
end;//
DELIMITER ;