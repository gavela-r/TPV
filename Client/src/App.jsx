import { useEffect, useState } from 'react';
import './App.css';
import { getProductos } from './hook/productos';
import { getTarjetasRegalos } from './hook/tarjetasRegalos';
import { getPromocionPropia } from './hook/promocionPropia';


function App() {
  const [hora, setHora] = useState(new Date());
  const [numGuardado, setNumGuardado] = useState('');
  const [listaCompra, setListaCompra] = useState([]);
  const [cantidadPendiente, setCantidadPendiente] = useState(1);
  const [mostrarTarjeta, setMostrarTarjeta] = useState(false);
  const [tarjeta, setTarjeta] = useState(false);
  const [mostrarSiNo, setMostrarSiNo] = useState(false);
  const [comentario, setComentario] = useState('');
  const [mostrarConfirmacion, setMostrarConfirmacion] = useState(false);
  const [totalPendiente, setTotalPendiente] = useState(null);
  const [mostrarPromocionSiNo, setMostrarPromocionSiNo] = useState(false);
  const productos = getProductos();
  const tarjetasRegalos = getTarjetasRegalos(); 
  const promocionesPropias = getPromocionPropia();


  useEffect(() => {
    const interval = setInterval(() => {
      setHora(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  function handleClick(digito) {
    setNumGuardado((prev) => prev + digito.target.innerText);
  }

  function handleDelete() {
    setNumGuardado((prev) => prev.slice(0, -1));
  }

  function handleClear() {
    setNumGuardado('');
    setCantidadPendiente(1);
  }

  function anadirProducto() {
    const productoEncontrado = productos.find(
      (producto) => producto.codigoIan == numGuardado
    );

    if (!productoEncontrado) {
      setComentario('Producto no encontrado');
      return;
    }

    const productoConCantidad = {
      ...productoEncontrado,
      cantidad: cantidadPendiente,
      total: productoEncontrado.precio * cantidadPendiente,
    };

    setListaCompra((prev) => [...prev, productoConCantidad]);
    setCantidadPendiente(1);
    setNumGuardado('');
    setComentario('');
  }

  function anadirCantidad() {
    if (!numGuardado) {
      return;
    }

    const cantidad = parseInt(numGuardado, 10);
    if (!isNaN(cantidad) && cantidad > 0) {
      setCantidadPendiente(cantidad);
      setNumGuardado('');
    }
  }

  function pagoTarjeta() {
    setTarjeta(true);
    setListaCompra([]);
    setNumGuardado('');
    setMostrarTarjeta(false);
    setTotalPendiente(0);
  }

  function totalCompra() {
    setMostrarTarjeta(true);
  }

  function botonesSiNo() {
    setMostrarSiNo(true);
  }

  function botonesPromocionSiNo() {
    setMostrarPromocionSiNo(true);
  }

  function cancelarTarjetaRegalo(){
    setMostrarSiNo(false);
  }

  function confirmarPerdidaSaldo(){
    setTotalPendiente(0);
    setListaCompra([]);
    setComentario('Pago completado con exito, se ha perdido el saldo restante de la tarjeta regalo');
    setMostrarSiNo(false);
    setNumGuardado('');
  }

  function tarjetaRegalo() {
    const tarjetaEncontrada = tarjetasRegalos.find(
      (tarjeta) => tarjeta.codigo == numGuardado
    );
    
    if(!tarjetaEncontrada){
      const timeout = setTimeout(() => {
        setComentario('Tarjeta regalo no encontrada');
      }, 5000);
      return;
    }

    const total = listaCompra.reduce((acc, producto) => acc + producto.total, 0);
    let nuevoTotal = 0;
    if(tarjetaEncontrada.saldo_actual < total){
      nuevoTotal = total - tarjetaEncontrada.saldo_actual;
      setTotalPendiente(nuevoTotal);
      setMostrarSiNo(false);
      setNumGuardado('')
      return;
    }else if(tarjetaEncontrada.saldo_actual > total){
      setComentario('Saldo de la tarjeta mayor al total de la compra, se perderá el saldo restante, ¿Estas seguro de continuar?');
      setMostrarConfirmacion(true);
      setInterval(() => {
        setComentario('');
        setMostrarConfirmacion(false);
        setMostrarSiNo(false);
      }, 5000);
      return;
    }else if(tarjetaEncontrada.saldo_actual == total){
      setTotalPendiente(0);
    }else{
      setTotalPendiente(total);
      return;
    }
  }

  function promocionPropia() {
    const promocionPropiaEncontrada = promocionesPropias.find(
      (promocion) => promocion.codigo == numGuardado
    );

    if(!promocionPropiaEncontrada){
      const timeout = setTimeout(() => {
        setComentario("Promocion Propia no encontrada");
      }, 5000);
      return;
    }

    const total = listaCompra.reduce((acc, producto) => acc + producto.total, 0);
    let nuevoTotal = 0;
    const fechaFin = new Date(promocionPropiaEncontrada.fecha_fin);
    const hoy = new Date();

    if(promocionPropiaEncontrada.codigo === numGuardado && fechaFin > hoy){
      nuevoTotal = total - promocionPropiaEncontrada.descuento;
      console.log(typeof promocionPropiaEncontrada.descuento);
      setTotalPendiente(nuevoTotal);
      setNumGuardado('');
      setMostrarPromocionSiNo(false);
      return;
    }

    if(fechaFin < hoy){
      const timeout = setTimeout(() => {
        setComentario("Promocion Propia encontrada pero ya ha caducado");
      }, 5000);
      setNumGuardado('');
      return;
    }
  }

  useEffect(() => {
    if (tarjeta) {
      const timeout = setTimeout(() => {
        setTarjeta(false);
      }, 5000);

      return () => clearTimeout(timeout);
    }
  }, [tarjeta]);

  useEffect(() => {
    if (numGuardado.length == 13) {
      anadirProducto();
    }
  }, [numGuardado]);

  return (
    <>
      <div className='hora'>
        <p>{hora.toLocaleTimeString()}</p>
      </div>
      <div className='cuadroProductos'>
        <div className='escanerProductos'>
          <h1>Nuevo Cliente</h1>
          <p>{numGuardado}</p>
          {cantidadPendiente == 1 ? <p></p> : <p>x{cantidadPendiente}</p>}
          {tarjeta ? <p>Pago con tarjeta realizado con exito</p> : ''}
          {comentario != '' && <p>{comentario}</p>}
        </div>
        <div className='listaProductos'>
          {listaCompra.map((producto, index) => (
            <div key={index} className='productos'>
              <p>{producto.nombre}</p>
              <p>
                {producto.cantidad > 1
                  ? `${producto.cantidad} x ${producto.precio}€`
                  : `${producto.precio}€`}
              </p>
              <p>{producto.total.toFixed(2)}€</p>
            </div>
          ))}
          <div className='mostrarTotal'>
            {totalPendiente !== null ? (
              <p>Total: {totalPendiente.toFixed(2)}€</p>
            ) : (
              <p>
                Total:{' '}
                {listaCompra
                  .reduce((acc, producto) => acc + producto.total, 0)
                  .toFixed(2)}
                €
              </p>
            )}
          </div>
        </div>
      </div>
      <div className='numeros'>
        <ul className='listaNumeros'>
          <li className='oculto'></li>
          <li className='borrar' onClick={handleClear}>
            Borrar
          </li>
          <li onClick={handleDelete}>
            <i className='fa-solid fa-delete-left'></i>
          </li>
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
        {mostrarPromocionSiNo ? (
          <div className='opciones4'>
            <div className='si' onClick={promocionPropia}>
              <p>Si</p>
            </div>
            <div className='no' >
              <p>No</p>
            </div>
          </div>
        ): mostrarConfirmacion ? (
          <div className='opciones4'>
            <div className='si' onClick={confirmarPerdidaSaldo}>
              <p>Si</p>
            </div>
            <div className='no' >
              <p>No</p>
            </div>
          </div>
        ) : mostrarSiNo ? (
          <div className='opciones4'>
            <div className='si' onClick={tarjetaRegalo}>
              <p>Si</p>
            </div>
            <div className='no' onClick={cancelarTarjetaRegalo}>
              <p>No</p>
            </div>
          </div>
        ) : (
          <>
            <div className='opciones'>
              <div className='cantidad' onClick={anadirCantidad}>
                <p>Cantidad</p>
              </div>
              <div className='precio'>
                <p>Precio</p>
              </div>
              <div className='total' onClick={totalCompra}>
                <p>Total</p>
              </div>
            </div>
            <div className='opciones2'>
            {mostrarTarjeta && (
              <div className='targeta' onClick={pagoTarjeta}>
                <p>Tarjeta</p>
              </div>
            )}
              <div className='promociones' onClick={botonesPromocionSiNo}>
                <p>Promociones Propias</p>
              </div>
              <div className='tarRegalo' onClick={botonesSiNo}>
                <p>Tarjeta Regalo</p>
              </div>
            </div>
            <div className='opciones3'>
              <div className='anadirProducto'>
                <p onClick={anadirProducto}>Anadir Producto</p>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default App;
