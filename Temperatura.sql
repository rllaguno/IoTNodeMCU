DROP DATABASE IF EXISTS IoT;

CREATE DATABASE IoT;

use IoT;

create table devices(
	device_id int primary key auto_increment,
    device_name varchar(20));
    
-- Abre tabla para verla
select * from devices;

-- Crea Taabla de Logs
create table log_temp (
log_id int primary key auto_increment,
log_date timestamp,
device_id int,
foreign key (device_id)
references devices (device_id),
temp float);

-- Inserta dispositivos en la tabla de devices
insert into devices
(device_name)
values ('Sensor-01');

-- Inserta registros en la tabla logs
insert into log_temp
(log_date, device_id, temp)
values(now(), 1, 37);

-- Abre tabla de logs para verla
select * from log_temp;

-- Abre tabla de devices para verla
select * from devices;

UPDATE devices
SET device_name = 'Sensor-Temp-01'
WHERE device_id = 1;

INSERT INTO devices
(device_name)
VALUES ('Sensor-Hum-01');

select * from devices;

-- Crea Taabla de Logs para la humedad
create table log_hum (
 log_id int primary key auto_increment,
 log_date timestamp,
 device_id int,
 foreign key (device_id)
 references devices (device_id),
 hum float);

-- Inserta registros en la tabla log_hum
insert into log_hum
(log_date, device_id, hum)
values(now(), 2, 8);

-- Abre tabla log_hum para verla
select * from log_hum;

select * from devices;

insert into log_hum
(log_date, device_id, hum)
values(now(), 1, 60);

-- Crea Taabla de Logs para el movimiento
create table log_mov (
 log_id int primary key auto_increment,
 log_date timestamp,
 device_id int,
 foreign key (device_id)
 references devices (device_id),
 mov bool);
 
 -- Crea Taabla de Logs para la distancia
create table log_dis (
 log_id int primary key auto_increment,
 log_date timestamp,
 device_id int,
 foreign key (device_id)
 references devices (device_id),
 estatusCapacidad bool,
 alturaDisponible float,
 porcentaje float
 );
 
insert into log_mov
(log_date, device_id, mov)
values(now(), 1, 0);

insert into log_mov
(log_date, device_id, mov)
values(now(), 1, 1);

SELECT * FROM log_mov;

insert into log_dis
(log_date, device_id, estatusCapacidad, alturaDisponible, porcentaje)
values(now(), 1, 1, 30, 70);

insert into log_dis
(log_date, device_id, estatusCapacidad, alturaDisponible, porcentaje)
values(now(), 1, 1, 10, 90);

insert into log_dis
(log_date, device_id, estatusCapacidad, alturaDisponible, porcentaje)
values(now(), 1, 0, 0, 100);

SELECT * FROM log_dis;

-- DROP TABLE log_dis;

SELECT * FROM log_hum;
SELECT * FROM log_temp;
SELECT * FROM log_dis;
SELECT * FROM log_mov;
SELECT * FROM devices;