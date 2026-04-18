import { Request, Response } from "express";
import { RowDataPacket } from "mysql2";
import bd from "../../conexion/bd";
import { PromocionPropia } from "../promocionesPropias";

interface PromocionPropiaRow extends RowDataPacket{
    id: number;
    codigo: number;
    fecha_inicio: Date;
    fecha_fin: Date;
}

function obtenerPromocionPropia(_rep: Request, res: Response): void{
    const sql = "SELECT * FROM promociones_propias";

    try{
        bd.query(sql, ((err, result) =>{
            if(err){
                res.status(404).json({Error: "Error al obtener los datos"});
            }

            const promocionPropia: PromocionPropia[] = (result as PromocionPropiaRow[]).map((p) =>({
                id: p.id,
                descuento: p.descuento,
                codigo: p.codigo,
                fecha_inicio: p.fecha_inicio,
                fecha_fin: p.fecha_fin
            })) 

            res.status(200).json({ promocionPropia })
        }))
    }catch(err){
        res.status(500).json({Error: "Error en el servidor"});
    }
}

export { obtenerPromocionPropia }