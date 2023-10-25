create table users(
id serial primary key,
username text not null unique,
email text  not null unique,
password text not null
);

CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL UNIQUE,
  description TEXT NULL,
  price INT NOT NULL,
  stock INT NOT NULL,
  sku varchar(30) NOT NULL,
  category_id INT NOT NULL
);

CREATE TABLE categories (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL
);
