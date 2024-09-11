// CARRITO DE COMPRAS

// ARRAY DE OBJETOS
const productos = [
    {
        id:1,
        nombre: "proteina whey",
        precio: 200,
        cantidad: 1,
    },
    {
        id:2,
        nombre: "creatina",
        precio: 100,
        cantidad: 1
    },
    {
        id:3,
        nombre: "pre workout",
        precio: 150,
        cantidad: 1
    },
    {
        id:4,
        nombre: "straps",
        precio: 80,
        cantidad: 1
    },
    {
        id:5,
        nombre: "cinturon",
        precio: 300,
        cantidad: 1
    },
    {
        id:6,
        nombre: "rodilleras",
        precio: 250,
        cantidad: 1
    },
]

let carrito = []
let contenedorProductos = document.getElementById("productos")
let contenedorCarrito = document.getElementById("carrito");
let totalCarrito = document.getElementById("total-carrito")


// ESTA FUNCION MUESTRA EL ARRAY DE OBJETOS

function mostrarProductos () {
    productos.forEach((producto) => {
        let divProd = document.createElement("div")
        divProd.innerHTML = `<h3>${producto.nombre}</h3>
        <p>Precio: $${producto.precio}</p>
        <button onclick="agregarAlCarrito(${producto.id})">Agregar al Carrito</button>`
        contenedorProductos.appendChild(divProd)
            
    })
}
mostrarProductos()


//ESTA FUNCION VA ACTUALIZANDO EL CARRITO DE COMPRAS

function actualizarCarrito() {
    contenedorCarrito.innerHTML = "";
    
    carrito.forEach(producto => {
        let div = document.createElement("div");
        div.innerHTML = `
            <h4>${producto.nombre}</h4>
            <p>Precio: $${producto.precio}</p>
            <p>Cantidad: ${producto.cantidad}</p>
            <button onclick="eliminarDelCarrito(${producto.id})">Eliminar</button>
        `;
        contenedorCarrito.appendChild(div);
    });
    
    let total = carrito.reduce((acc, producto) => acc + producto.precio * producto.cantidad, 0);
        
    totalCarrito.innerText = total;
}
actualizarCarrito()
    

// ESTA FUNCION AGREGA PRODUCTOS AL ARRAY CARRITO

if (localStorage.getItem("carrito")) {
    carrito = JSON.parse(localStorage.getItem("carrito"));
    actualizarCarrito();
}
    
function agregarAlCarrito(idProducto) {
    const producto = productos.find((producto) => producto.id === idProducto)
    const productoEnCarrito = carrito.find((producto) => producto.id === idProducto)
        
    if (productoEnCarrito) {
        productoEnCarrito.cantidad += 1
    } else {
        carrito.push({ ...producto, cantidad: 1 })
    }
        
    localStorage.setItem("carrito", JSON.stringify(carrito))
    actualizarCarrito()
}
    

// ESTA FUNCION ELIMINA PRODUCTOS DEL ARRAY CARRITO

function eliminarDelCarrito(idProd) {
    const productoEnCarrito = carrito.find((producto) => producto.id === idProd);
    
    if (productoEnCarrito && productoEnCarrito.cantidad > 1) {
        productoEnCarrito.cantidad -= 1;
    } else {
        
        carrito = carrito.filter(producto => producto.id !== idProd);
    }
    localStorage.setItem("carrito", JSON.stringify(carrito))
    actualizarCarrito()
}
eliminarDelCarrito()


// ESTA FUNCION SUMA EL TOTAL DEL CARRITO

const calcularTotal = () => {
    return carrito.reduce ((total, producto) => total + (producto.precio * producto.cantidad), 0)
} 


// ESTA FUNCION MUESTRA EL CARRITO Y LOS PRODUCTOS SELECCIONADOS DENTRO

function mostrarCarrito () {
    carrito.forEach((producto) =>{
        console.log(`${producto.url}
                    producto: ${producto.nombre},
                    precio: $${producto.precio},
                    cantidad: ${producto.cantidad}`)
    })

    console.log(`total: $${calcularTotal()}`)
}
mostrarCarrito();  


// BOTON PARA VACIAR CARRITO

let botonVaciar = document.getElementById("vaciar-carrito")

botonVaciar.addEventListener("click", () => {
    carrito = []
    localStorage.clear()
    actualizarCarrito()
});

// BOTON DE REALIZAR COMPRA Y MENSAJE DE COMPRA HECHA

let botonComprar = document.getElementById("comprar");
let compraHecha = document.getElementById("compraHecha")

botonComprar.addEventListener("click", () => {
    if (carrito) {
        compraHecha.innerHTML = `Gracias por tu compra!`
        return;
    }

});
 


