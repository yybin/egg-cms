create database cms;

create table resource
(
    id        int auto_increment
        primary key,
    name      varchar(255) not null,
    parent_id int          null
);

create table role
(
    id   int auto_increment
        primary key,
    name varchar(255) null
);

create table role_resource
(
    role_id     int not null,
    resource_id int not null
        primary key
);

create table role_user
(
    role_id int not null,
    user_id int not null
);

create table user
(
    id       int auto_increment
        primary key,
    username varchar(255) not null,
    password varchar(255) null,
    email    varchar(255) null,
    phone    varchar(255) null,
    gender   tinyint      null,
    age      int          null
);

