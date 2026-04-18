import { useEffect } from "react";
import { useState } from "react";

export function getProductos(){
    const [productos, setProductos] = useState([]);

    useEffect(() =>{
        fetch('/productos', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => {
            if(res.ok){
                return res.json();
            }else{
                throw new Error('Error en el servidor');
            }
        })
        .then(data =>{
            setProductos(data.productos);
        })
    }, [])
    return productos;
}