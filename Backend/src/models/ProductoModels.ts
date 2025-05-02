import { RowDataPacket } from 'mysql2';

export interface ProductoModel extends RowDataPacket {
    id_producto: number;
    nombre: string;
    imagen: string;
    descripcion: string;
    id_categoria: number;
    id_marca: number;
    precio: number;
}
