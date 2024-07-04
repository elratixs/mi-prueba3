const contenedorTarjetas = document.getElementById("productos-container");



function crearTarjetasProductoInicioHombre(productos){
    productos.forEach(producto => {
        const nuevaRopaHombre = document.createElement("div");
        nuevaRopaHombre.classList = "tarjeta-producto";
        nuevaRopaHombre.innerHTML =  `
          <img src=${producto.img}>
          <h3>${producto.modelo}</h3>
          <p>$${producto.precio}</p>
          <button>Agregar al carrito</button>
        `

        contenedorTarjetas.appendChild(nuevaRopaHombre);
        nuevaRopaHombre.getElementsByTagName("button")[0].addEventListener("click",()=> agregarAlCarrito(producto));

    });
}



crearTarjetasProductoInicioHombre(ropaHombre);