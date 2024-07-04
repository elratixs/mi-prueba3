const contenedorTarjetas = document.getElementById("productos-container");
const unidadesElement = document.getElementById("unidades");
const precioElement = document.getElementById("precio");
const carritoVacioElement = document.getElementById("carrito-vacio");
const totalesElement = document.getElementById("totales");
const reiniciarCarritoElement = document.getElementById("reiniciar");



async function crearTarjetasProductoInicioHombre() {

  await fetch('https://mindicador.cl/api').then(function (response) {
    return response.json();
  }).then(function (dailyIndicators) {
    let dolar = dailyIndicators.dolar.valor;
    contenedorTarjetas.innerHTML = "";
    const productos = JSON.parse(localStorage.getItem("ropaHombre"));
    console.log(productos)
    if (productos && productos.length > 0) {
      productos.forEach(producto => {
        const nuevaRopaHombre = document.createElement("div");
        nuevaRopaHombre.classList = "tarjeta-producto";
        nuevaRopaHombre.innerHTML = `
            <img src=${producto.img}>
            <h3>${producto.modelo}</h3>
            <p>$${(producto.precio * producto.cantidad / dolar).toFixed(2)} USD</p>
            <div>
              <button>-</button>
              <span class="cantidad">${producto.cantidad}</span>
              <button>+</button>
            </div>
          `

        contenedorTarjetas.appendChild(nuevaRopaHombre);
        nuevaRopaHombre.getElementsByTagName("button")[1].addEventListener("click", (e) => {
          const cuentaElement = e.target.parentElement.getElementsByTagName("span")[0];
          cuentaElement.innerText = agregarAlCarrito(producto);
          crearTarjetasProductoInicioHombre();
          actualizarTotales(dolar);
        });

        nuevaRopaHombre.getElementsByTagName("button")[0].addEventListener("click", (e) => {
          restarAlCarrito(producto);
          crearTarjetasProductoInicioHombre();
          actualizarTotales(dolar);
        });
      });
    }
    actualizarTotales(dolar);
  }).catch(function (error) {
    console.log('Requestfailed', error);
  });



}



crearTarjetasProductoInicioHombre();
// actualizarTotales(dolar);



function actualizarTotales(dolar) {
  const productos = JSON.parse(localStorage.getItem("ropaHombre"));
  let unidades = 0;
  let precio = 0;
  if (productos && productos.length > 0) {
    productos.forEach(producto => {
      unidades += producto.cantidad;
      precio += producto.precio * producto.cantidad;
    })
    unidadesElement.innerText = unidades;
    precioElement.innerText = (precio / dolar).toFixed(2);
  }
  revisarMensajeVacio();
}



function revisarMensajeVacio() {
  const productos = JSON.parse(localStorage.getItem("ropaHombre"));
  console.log(productos, productos == true)
  carritoVacioElement.classList.toggle("escondido", productos && productos.length > 0);
  totalesElement.classList.toggle("escondido", !(productos && productos.length > 0));
}

revisarMensajeVacio();


reiniciarCarritoElement.addEventListener("click", reiniciarCarrito);
function reiniciarCarrito() {
  localStorage.removeItem("ropaHombre");
  actualizarTotales();
  crearTarjetasProductoInicioHombre();
}