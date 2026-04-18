import { useEffect, useState } from "react";

export function getPromocionPropia() {
    const [promocionPropia, setPromocionPropia] = useState([]);

    useEffect( () =>{
        fetch('/promocionPropia',{
            method: "GET",
            headers:{
                "Content-Type": "application/json"
            }
        })
        .then(res =>{
            if(res.ok) {
                return res.json();
            }else{
                throw new Error('Erro al obtener los datos');
            }
        })
        .then(data =>{
            setPromocionPropia(data.promocionPropia);
        })
    }, [])
    return promocionPropia; 
}