--SCRIPTS DE BD
--COMANDO PARA CREAR BASES DE DATOS
--CREATE DATABASE example;

--COMANDO PARA CREAR UNA TABLE;
--USE example;
--go

--DROP TABLE usuario
/*
CREATE TABLE usuario(
	user_id serial primary key,
	address varchar(300) null,
	email varchar(100) not null,
	first_name varchar(100) not null,
	last_name varchar(100) not null,
	password varchar(100) not null,
	telephone varchar(13) null
)
*/

--COMANDOS PARA VISUALIZAR LA INFORMACION
SELECT * FROM usuario;

