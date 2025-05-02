use tienda;

DELIMITER //

CREATE PROCEDURE insertar_categoria(IN _categoria VARCHAR(100))
BEGIN
    INSERT INTO categoria(categoria) VALUES (_categoria);
END //

CREATE PROCEDURE actualizar_categoria(IN _id_categoria INT, IN _categoria VARCHAR(100))
BEGIN
    UPDATE categoria SET categoria = _categoria WHERE id_categoria = _id_categoria;
END //

CREATE PROCEDURE eliminar_categoria(IN _id_categoria INT)
BEGIN
    DELETE FROM categoria WHERE id_categoria = _id_categoria;
END //

CREATE PROCEDURE obtener_categorias()
BEGIN
    SELECT * FROM categoria;
END //

CREATE PROCEDURE obtener_categoria_por_id(IN _id_categoria INT)
BEGIN
    SELECT * FROM categoria WHERE id_categoria = _id_categoria;
END //

DELIMITER ;

DELIMITER //

CREATE PROCEDURE insertar_marca(IN _marca VARCHAR(100), IN _id_categoria INT)
BEGIN
    INSERT INTO marca(marca, id_categoria) VALUES (_marca, _id_categoria);
END //

CREATE PROCEDURE actualizar_marca(IN _id_marca INT, IN _marca VARCHAR(100), IN _id_categoria INT)
BEGIN
    UPDATE marca
    SET marca = _marca, id_categoria = _id_categoria
    WHERE id_marca = _id_marca;
END //

CREATE PROCEDURE eliminar_marca(IN _id_marca INT)
BEGIN
    DELETE FROM marca WHERE id_marca = _id_marca;
END //

CREATE PROCEDURE obtener_marcas()
BEGIN
    SELECT * FROM marca;
END //

CREATE PROCEDURE obtener_marca_por_id(IN _id_marca INT)
BEGIN
    SELECT * FROM marca WHERE id_marca = _id_marca;
END //

DELIMITER ;

DELIMITER //

CREATE PROCEDURE insertar_producto(
    IN _id_categoria INT,
    IN _id_marca INT,
    IN _modelo VARCHAR(100),
    IN _nombre VARCHAR(100),
    IN _precio DECIMAL(10,2),
    IN _imagen VARCHAR(1000),
    IN _descripcion VARCHAR(1000)
)
BEGIN
    INSERT INTO producto(id_categoria, id_marca, modelo, nombre, precio, imagen, descripcion)
    VALUES (_id_categoria, _id_marca, _modelo, _nombre, _precio, _imagen, _descripcion);
END //

CREATE PROCEDURE actualizar_producto(
  IN p_id_producto INT,
  IN p_id_categoria INT,
  IN p_id_marca INT,
  IN p_modelo VARCHAR(255),
  IN p_nombre VARCHAR(255),
  IN p_precio DECIMAL(10,2),
  IN p_imagen VARCHAR(255), -- Campo opcional
  IN p_descripcion TEXT
)
BEGIN
  UPDATE producto
  SET
    id_categoria = p_id_categoria,
    id_marca = p_id_marca,
    modelo = p_modelo,
    nombre = p_nombre,
    precio = p_precio,
    imagen = IFNULL(p_imagen, imagen), -- Mantener valor anterior si es NULL
    descripcion = p_descripcion
  WHERE id_producto = p_id_producto;
END$$

delimiter //
CREATE PROCEDURE eliminar_producto(IN _id_producto INT)
BEGIN
    DELETE FROM producto WHERE id_producto = _id_producto;
END //



DELIMITER $$
CREATE PROCEDURE obtener_productos_con_detalle()
BEGIN
  SELECT 
    p.id_producto,
    p.id_categoria,    -- ID de categoría
    c.categoria,        -- Nombre de categoría
    p.id_marca,         -- ID de marca
    m.marca,            -- Nombre de marca
    p.modelo,
    p.nombre,
    p.precio,
    p.imagen,
    p.descripcion
  FROM producto p
  INNER JOIN categoria c ON p.id_categoria = c.id_categoria
  INNER JOIN marca m ON p.id_marca = m.id_marca;
END$$
DELIMITER ;

DELIMITER $$

CREATE PROCEDURE obtener_productos()
BEGIN
    SELECT 
        id_producto,
        id_categoria,
        id_marca,
        modelo,
        nombre,
        precio,
        imagen,
        descripcion
    FROM producto
    ORDER BY id_producto DESC;  -- Ordenar por ID descendente (opcional)
END$$

DELIMITER ;

CALL obtener_productos_con_detalle();
CALL insertar_categoria('Electrónica');
CALL insertar_categoria('Ropa');
CALL insertar_categoria('Electrodomésticos');

CALL insertar_marca('Samsung', 1);
CALL insertar_marca('LG', 3);
CALL insertar_marca('Nike', 2);

