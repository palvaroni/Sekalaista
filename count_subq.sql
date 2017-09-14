SELECT COUNT(*) FROM (
	SELECT
	  w0_.id
	FROM 
	  worker w0_ 
	  LEFT JOIN profession p1_ ON w0_.profession_id = p1_.id 
	  INNER JOIN worker_requirement w4_ ON w0_.id = w4_.worker_id 
	  INNER JOIN requirement r3_ ON r3_.id = w4_.requirement_id 
	WHERE 
	  r3_.id IN ("07106527-934a-486a-8243-af88550e8e57","3fb5b618-ae53-48ad-ae3b-975108dc066c","83978783-457f-4bb1-84bc-998ed7f53459","8bf6011a-3b4e-43a0-9036-cda02eb72903") 
	GROUP BY
	  w0_.id
	HAVING 
	  COUNT(DISTINCT r3_.id) = 4
) AS worker_id;
