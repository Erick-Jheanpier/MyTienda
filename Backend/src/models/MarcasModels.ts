import { RowDataPacket } from 'mysql2';

export interface MarcaModel extends RowDataPacket {
    id_marca: number;
    marca: string;
}
