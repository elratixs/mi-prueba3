function agregarAlCarrito(producto){
    const memoria = JSON.parse(localStorage.getItem("ropaHombre"));
    console.log(memoria);
    let cuenta = 0;
    if(!memoria){
        const nuevoProductoHombre = getNuevoProductoParaMemoria(producto);
        localStorage.setItem("ropaHombre",JSON.stringify([nuevoProductoHombre]));
        cuenta = 1;
    } else {
        const indiceProducto = memoria.findIndex(ropaHombre => ropaHombre.id === producto.id);
        console.log(indiceProducto);
        const nuevaMemoria = memoria;
        if(indiceProducto === -1){
            nuevaMemoria.push(getNuevoProductoParaMemoria(producto))
            cuenta = 1;
        } else{
            nuevaMemoria[indiceProducto].cantidad ++;
            cuenta = nuevaMemoria[indiceProducto].cantidad;
            actualizarNumeroCarrito();
        }
        localStorage.setItem("ropaHombre",JSON.stringify(nuevaMemoria));
    }
    actualizarNumeroCarrito();
    return cuenta;
}


function restarAlCarrito(producto){
    const memoria = JSON.parse(localStorage.getItem("ropaHombre"));
    const indiceProducto = memoria.findIndex(ropaHombre => ropaHombre.id === producto.id);
    if(memoria[indiceProducto].cantidad === 1){
        memoria.splice(indiceProducto,1);
    } else {
        memoria[indiceProducto].cantidad--;
    }
    localStorage.setItem("ropaHombre",JSON.stringify(memoria));
    actualizarNumeroCarrito()
}



//** Toma un producto, le agrega cantidad 1 y lo devuelve */
function getNuevoProductoParaMemoria(producto){
    const nuevoProductoHombre = producto;
    nuevoProductoHombre.cantidad = 1;
    return nuevoProductoHombre;
}


const cuentaCarritoElement = document.getElementById("cuenta-carrito");


function actualizarNumeroCarrito(){
    const memoria = JSON.parse(localStorage.getItem("ropaHombre"));
    if(memoria && memoria.length >0){
    const cuenta = memoria.reduce((acum, current) => acum+current.cantidad,0);
    cuentaCarritoElement.innerText = cuenta;
    console.log(cuenta)
    } else{
    cuentaCarritoElement.innerText = 0;
    }
}

actualizarNumeroCarrito();