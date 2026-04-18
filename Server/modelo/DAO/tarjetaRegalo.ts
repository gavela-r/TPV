import { Request, Response } from "express";
import { RowDataPacket } from "mysql2";
import bd from "../../conexion/bd";
import { TarjetaRegalo } from "../tarjetasRegalos";

interface TarjetaRegaloRow extends RowDataPacket{
    id: number;
    codigo: number;
    pin: number;
    saldo_inicial: number;
    saldo_actual: number;
    estado: string;
}

function obtenerTarjetaRegalo(_req: Request, res: Response): void{
    const sql = "SELECT * FROM tarjetas_regalo";

    try{
        bd.query(sql,(err, result ) =>{
            if(err){
                res.status(404).json({Error: "Error al obtener las tarjetas regalo"});
                return;
            }
            const tarjetaRegalo: TarjetaRegalo[] = (result as TarjetaRegaloRow[]).map((t) =>({
                id: t.id,
                codigo: t.codigo,
                pin: t.pin,
                saldo_inicial: t.saldo_inicial,
                saldo_actual: t.saldo_actual,
                estado: t.estado,
            }));
            res.status(200).json({ tarjetaRegalo });
        })
    }catch(err){
        res.status(500).json({Error: "Error en el servidor"});
    }
}

export { obtenerTarjetaRegalo };