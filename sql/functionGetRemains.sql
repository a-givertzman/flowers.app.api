CREATE FUNCTION `getRemains`(count INT, purchase_id INT, purchase_content_id INT) RETURNS int(11)
BEGIN
RETURN count - (select sum(`count`)
	from `purchase_member`
	where `purchase/id` = purchase_id
	and `purchase_content/id` = purchase_content_id);
END