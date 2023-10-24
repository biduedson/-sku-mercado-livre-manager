create table users(
id serial primary key,
username text not null unique,
email text  not null unique,
password text not null
);

CREATE TABLE produtos (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(255) NOT NULL,
  descricao TEXT, NOT NULL
  preco int  NOT NULL,
  estoque INT NOT NULL,
  categoria_id INT NOT NULL
);

CREATE TABLE categorias (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(255) NOT NULL
);