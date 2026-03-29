import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [hora, setHora] = useState(new Date());
  const [numGuardado, setNumGuardado] = useState('');

  useEffect(() =>{
    const interval = setInterval(() =>{
      setHora(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  function handleClick(digito){
    setNumGuardado(prev => prev + digito.target.innerText);
  }

  function handleDelete(){
    setNumGuardado(prev => prev.slice(0, -1));
  }

  function handleClear(){
    setNumGuardado("");
  }

  return (
    <>
      <div className='hora'>
        <p>{hora.toLocaleTimeString()}</p>
      </div>
      <div className='cuadroProductos'>
        <div className='escanerProductos'>
          <h1>Nuevo Cliente</h1>
          <p>{numGuardado}</p>
        </div>
        <div className='listaProductos'></div>
      </div>
      <div className='numeros'>
        <ul className='listaNumeros'>
          <li className='oculto'></li>
          <li className='borrar' onClick={handleClear}>Borrar</li>
          <li onClick={handleDelete}><i class="fa-solid fa-delete-left"></i></li>
          <li onClick={handleClick}>7</li>
          <li onClick={handleClick}>8</li>
          <li onClick={handleClick}>9</li>
          <li onClick={handleClick}>4</li>
          <li onClick={handleClick}>5</li>
          <li onClick={handleClick}>6</li>
          <li onClick={handleClick}>1</li>
          <li onClick={handleClick}>2</li>
          <li onClick={handleClick}>3</li>
          <li className='oculto'></li>
          <li onClick={handleClick}>0</li>
        </ul>
        <div className='opciones'>
            <div className='cantidad'>
              <p>Cantidad</p>
            </div>
            <div className='precio'>
              <p>Precio</p>
            </div>
            <div className="total">
              <p>Total</p>
            </div>
        </div>
        <div className='opciones2'>
            <div className='targeta'>
              <p>Targeta</p>
            </div>
            <div className='promociones'>
              <p>Promociones Propias</p>
            </div>
            <div className='tarRegalo'>
              <p>Tarjeta Regalo</p>
            </div>
        </div>
      </div>
    </> 
  )
}

export default App
