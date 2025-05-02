CREATE DATABASE tienda;
USE tienda;

-- Tabla categoria
CREATE TABLE categoria (
    id_categoria INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    categoria VARCHAR(100) NOT NULL,
    CONSTRAINT categoria_uk UNIQUE (categoria)
);

-- Tabla marca
CREATE TABLE marca (
    id_marca INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    marca VARCHAR(100) NOT NULL,
    id_categoria INT NOT NULL,
    CONSTRAINT marca_fk FOREIGN KEY (id_categoria) REFERENCES categoria(id_categoria)
        ON DELETE CASCADE
);

-- Tabla producto (corregida y mejorada)
CREATE TABLE producto (
    id_producto INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    id_categoria INT NOT NULL,
    id_marca INT NOT NULL,
    modelo VARCHAR(100) NOT NULL,
    nombre VARCHAR(100) NOT NULL,
    precio DECIMAL(10,2) CHECK (precio >= 0),
    imagen VARCHAR(1000) NOT NULL,
    descripcion VARCHAR(1000) NOT NULL,
    CONSTRAINT producto_categoria_fk FOREIGN KEY (id_categoria) REFERENCES categoria(id_categoria)
        ON DELETE CASCADE,
    CONSTRAINT producto_marca_fk FOREIGN KEY (id_marca) REFERENCES marca(id_marca)
        ON DELETE CASCADE
);

-- Vista previa
SELECT * FROM marca;
SELECT * FROM categoria;
SELECT * FROM producto;