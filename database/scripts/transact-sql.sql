--OPERACIONES TRANSACT SQL
--CRUD -> (CREATE, READ, UPDATE, DELETE)
--INSERT -> (CREATE)
/*
INSERT INTO usuario(address, email, first_name, last_name, password, telephone)
VALUES('Santo Domingo', 'ifer343@gmail.com', 'Ivan',  'Paz', '123456', '0989297817')
*/

--SELECT -> (READ)
--SELECT * FROM usuario order by user_id desc

--UPDATE -> (UPDATE)
/*
UPDATE usuario SET address = 'Santo Domingo',
telephone = '05544897987'
WHERE user_id = 15
*/

--DELETE -> (DELETE)
--DELETE FROM usuario WHERE user_id = 1

--EJERCICIOS DE LECTURA DE DATOS

SELECT * FROM usuario WHERE user_id = 16

SELECT user_id
	,address
	,email
	,first_name
	,last_name
	,telephone
FROM usuario WHERE user_id = 16

SELECT * FROM usuario WHERE address = 'Manabi'

SELECT * FROM usuario WHERE first_name ILIKE '%e%'

SELECT * 
FROM usuario
WHERE first_name LIKE '%a%'
	OR last_name LIKE '%a%'

SELECT * FROM usuario WHERE user_id IN (4)

SELECT * FROM usuario WHERE user_id NOT IN (4,5)


