import { useEffect, useState } from "react";

export function getTarjetasRegalos(){
    const [tarjetasRegalos, setTarjetasRegalos] = useState([]);

    useEffect(() =>{
        fetch('/tarjetas_regalos', {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(res =>{
            if(res.ok){
                return res.json();
            }else{
                throw new Error("Error en el servidor")
            }
        })
        .then(data =>{
            setTarjetasRegalos(data.tarjetaRegalo);
        })
    }, [])
    return tarjetasRegalos;
}