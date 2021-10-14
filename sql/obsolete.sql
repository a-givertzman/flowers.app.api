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
	and `purchase_member`.`purchase_content/id` = purchase_content_id));
    
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

drop trigger if exists beforeUpdatePurchaseContent;
DELIMITER //
create
	trigger beforeUpdatePurchaseContent before update on `purchase_content`
	for each row
	begin
		-- if !(new.`count` <=> old.`count`) then
		set new.`remains` = (new.`count` - ifnull((select sum(`count`)
		from `purchase_member`
		where `purchase_member`.`purchase/id` = new.`purchase/id`
		and `purchase_member`.`purchase_content/id` = new.`id`), 0));
		-- end if;
       
		-- обновляем стоимость 
		-- если изменилась цена продажи
		-- если изменились транспортные расходы
		-- if !(new.`sale_price` <=> old.`sale_price`) or !(new.`shipping` <=> old.`shipping`) then
			-- call updatePurchaseMemberCost(new.`purchase/id`, new.`id`, new.`sale_price`, new.`shipping`);
		-- end if;
	end;//
	DELIMITER ;

drop procedure if exists updatePurchaseMemberCost;
DELIMITER $$
create procedure updatePurchaseMemberCost(
	in purchase_id int,
	in purchase_content_id int,
    in purchase_content_price DECIMAL(20,2),	#purchase_content.sale_price
    in purchase_content_shipping DECIMAL(20,2)	#purchase_content.shipping
)
begin                  
	update `purchase_member`
		set `purchase_member`.`cost` = `purchase_member`.`count` * (purchase_content_price + purchase_content_shipping)
        where `purchase_member`.`purchase/id` = purchase_id
        and `purchase_content/id` = purchase_content_id;
end$$
DELIMITER ;