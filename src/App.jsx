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
          <li className='oculto'></li>
          <li><i class="fa-solid fa-delete-left"></i></li>
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
      </div>
    </> 
  )
}

export default App
