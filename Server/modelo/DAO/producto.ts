import { Request, Response } from 'express';
import { RowDataPacket } from 'mysql2';
import bd from '../../conexion/bd';
import { Producto } from '../productos';

interface ProductoRow extends RowDataPacket {
  id: number;
  nombre: string;
  categoria: string;
  precio: number;
  stock: number;
  codigo_ian: string;
}

function obtenerProductos(_req: Request, res: Response): void {
  const sql = 'SELECT * FROM productos';

  try {
    bd.query(sql, (err, result) => {
      if (err) {
        res.status(404).json({ error: 'Error al obtener los productos' });
        return;
      }

      const productos: Producto[] = (result as ProductoRow[]).map((p) => ({
        id: p.id,
        nombre: p.nombre,
        categoria: p.categoria,
        precio: p.precio,
        stock: p.stock,
        codigoIan: p.codigo_ian
      }));

      res.status(200).json({ productos });
    });
  } catch (error) {
    res.status(500).json({ error: 'Error en el servidor' });
  }
}

export { obtenerProductos };
