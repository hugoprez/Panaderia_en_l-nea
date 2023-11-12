//creamos un arreglo para almacenar los productos
let ArrayProductos = [];

//obtenemos todos los elementos de la lista para añadir o quitar la clase active
var navli = document.querySelectorAll(".nav__li");

//seleccionamos el contenedor que posee el menu que se adaptara a las pantallas
var section_contactos = document.querySelector(".menu-container__contact");

//seleccionamos el botón que mostrara y ocultara el menu
var menu = document.querySelector(".wrapper-menubars__icon");

//seleccionamos el botón que mostrara y ocultara el Carrito de compras
var btnmostrarCarrito = document.querySelector(".opciones-carrito__button");

let modalCarrito = document.querySelector(".modal");

let modalcloseCart = document.querySelector(".closeIcon-cart");



//Mostramos o cerramos el carrito de compra al realizar click
btnmostrarCarrito.addEventListener("click",e=>{

  if(modalCarrito.classList.contains("showcontenedorCarrito")){
   
    //reestablecemos el scroll al cerrar el modal del carrito
    document.body.style.overflowY= 'scroll';

    //removemos la clase que permite mostrar el modal del carrito
    modalCarrito.classList.remove("showcontenedorCarrito");

  }
  else{

    //Agregamos el scroll al tener esconder el modal del carrito
    document.body.style.overflow = 'hidden';

    //añadimos escrol si los elementos son muchos
    modalCarrito.style.overflowY="scroll";

    modalCarrito.classList.add("showcontenedorCarrito");
  }

  //invocamos la funcion que actualizara el valor total
  pagototal();

});

//recorremos todos los li de la lista
navli.forEach((actual) => {
  actual.addEventListener("click", (e) => {
    actual.classList.toggle("nav__li--active");
  });
});

//ocultamos o mostramos el menu
menu.addEventListener("click", (e) => {
  e.preventDefault();
  section_contactos.classList.toggle("show-menu-container__contact");
});

// Cerramos el modal del carrito al realizar clic al icono 
modalcloseCart.addEventListener("click", (e) => {
  e.preventDefault();

    //Agregamos el scroll al tener esconder el modal del carrito
    document.body.style.overflow = 'scroll';

    //removemos la clase que permite mostrar el modal del carrito
    modalCarrito.classList.remove("showcontenedorCarrito");
});


//CODIGO PARA CREAR EL CARRITO

//obtenemos todos los elementos que posean la clase card esto para obtener los datos del  producto
let tarjeta_producto = document.querySelectorAll(".card");

//obtenemos el contenedor para mostrar la cantidad de productos en el carrito
let cantidadproductos = document.querySelector(".opciones-carrito__unit");

//obtenemos el contenedor el cual mostraremos los productos
let contenedorpadre = document.querySelector(".section__container-compras");

//obtenemos el contenedor el cual mostraremos el mensaje si el carrito esta vacío
let message_cart= document.querySelector(".message-cart");


//variable que servira para separar el caracter $ de la cantidad
let limpiarprecio;

//está variable será para realizar el calculo de los n producto por el valor unitario 
let calculototalunitario;

//variable el cual guardare el nombre del producto
let lblnombre;


//recorremos las tarjetas para identificar cada una
tarjeta_producto.forEach((actual, indice) => {
  //obtenemos el evento click al comprar el producto
  let btncomprar = actual.getElementsByTagName("button")[0];

  btncomprar.addEventListener("click", (e) => {
    //obtenemos el nombre del producto
    let nombreproducto = actual.querySelector(".card__title").textContent;

    //obtenemos el precio del producto
    let precioproducto = actual.querySelector(".card__price").textContent;

    //obtenemos la imagen del producto
    let imagenproducto = actual.querySelector(".renderImage");
    let src = imagenproducto.src;

    //eliminamos el signo de $ del precio
    /*limpiarprecio = precioproducto.length;
    precioproducto = precioproducto.substring(1, limpiarprecio);*/

    //extraemos el precio del producto sin el caracter $
    precioproducto=parseFloat(limpiarcaracter(precioproducto));

    //guardamos los datos de los productos en un dato tipo objeto
    const producto = {
      id: indice,
      nombre: nombreproducto,
      unidades: 1,
      precio: precioproducto,
      src: src,
      preciototal: precioproducto,
    };

    //función que se encarga de procesar los productos al arreglo
    anadirproducto(producto);

  });
});

function anadirproducto(producto) {
  // verificamos si el objeto ya existe en el array
  let productoExistente = ArrayProductos.find((p) => p.id === producto.id);

  if (productoExistente) {
    // si el objeto ya existe, actualizamos sus valores
    productoExistente.nombre = producto.nombre;
    productoExistente.precio = producto.precio;
  } else {
    // si el objeto no existe, lo agregamos al array
    ArrayProductos.push(producto);

    //mostramos la cantidad de productos que existen en el carrito de compra
    cantidadproductos.innerHTML = ArrayProductos.length;

    //limpiamos el contenedor que muestra los productos del carrito esto sera para cada vez que se añada un producto
    //document.querySelector('.section__container-compras').textContent = "";**
    contenedorpadre.textContent="";

    //mostramos los productos
    mostrarCarrito();
    
  }
}

function mostrarCarrito() {
  if(ArrayProductos.length>=1){
    //recorremos el arreglo de producto
    ArrayProductos.forEach((indice) => {
      
      let idtarjetacarrito=indice.id;

      //creamos el contendor padre que tendrá la información del producto
      const containerproducto = document.createElement("div");
      containerproducto.classList.add("container-compras");
      containerproducto.setAttribute("id",idtarjetacarrito);

      //creamos el contenedor principal de la imagen
      const containerimagen = document.createElement("div");
      containerimagen.classList.add("compra-imagen");

      //creamos la etiqueta img
      const imagen = document.createElement("img");
      imagen.classList.add("renderImage-cart");
      imagen.src = indice.src;
      imagen.alt = "producto a comprar";
      imagen.loading = "lazy";

      //creamos el contenedor principal que tendrá el nombre del producto
      const containernombre = document.createElement("div");
      containernombre.classList.add("compra-infoproducto");

      //creamos el contendor que tendrá el nombre del producto
      const nombre = document.createElement("div");
      nombre.classList.add("compra-infoproducto__name");
      nombre.innerHTML = indice.nombre;

      //creamos el contenedor que tendrá el precio del producto
      const precio = document.createElement("div");
      precio.classList.add("compra-infoproducto__prices");
      precio.textContent ="$"+parseFloat(indice.precio).toFixed(2);

      //creamos el contenedor principal que tendrá el quitar o aumentar producto
      const containerpadrecantidadproducto = document.createElement("div");
      containerpadrecantidadproducto.classList.add("quantity-Products");

      //creamos el contenedor principal que tendrá el aumentar producto
      const containerhijocantidadproducto = document.createElement(
        "quantity-Products__container"
      );

      //creamos el boton aumentar producto
      const botonaumentar = document.createElement("button");
      botonaumentar.classList.add(
        "quantity-Products__plus",
        "quantity-Products--btn"
      );

      //creamos la etiqueta que representa el icono del aumentar
      const iconoaumentar = document.createElement("i");
      iconoaumentar.classList.add("fa-solid", "fa-plus");

      //creamos el input text para mostrar la cantidad de productos
      const inputcantidad = document.createElement("input");
      inputcantidad.type = "text";
      inputcantidad.name = "";
      inputcantidad.id = "";
      inputcantidad.value =indice.unidades;
      inputcantidad.classList.add("quantity-Products__input");

      //creamos el boton aumentar producto
      const botonreducir = document.createElement("button");
      botonreducir.classList.add(
        "quantity-Products__minus",
        "quantity-Products--btn"
      );

      //creamos la etiqueta que representa el icono del reducir
      const iconoreducir = document.createElement("i");
      iconoreducir.classList.add("fa-solid", "fa-minus");

      //cremos el contenedor principal del precio total por la cantidad de cada producto
      const containerprecionumeroproducto = document.createElement("div");
      containerprecionumeroproducto.classList.add("compra-totalunitario");

      //creamos la etiqueta span que servira para mostrar el precio de penediendo del número de productos
      const precionumeroproducto = document.createElement("span");
      precionumeroproducto.classList.add("compra-totalunitario__preices");
      precionumeroproducto.innerHTML = "$0.00";

      //creamos el contenedor padre para eliminar el producto
      const containereliminarproducto = document.createElement("div");
      containereliminarproducto.classList.add("eliminar-compra");

      //creamos el boton para eliminar producto
      const botoneliminar = document.createElement("button");
      botoneliminar.classList.add("eliminar-compra__btn");

      //creamos el elemento que representa el icono para eliminar producto
      const iconoeliminar = document.createElement("i");
      iconoeliminar.classList.add("fa-regular", "fa-trash-can");

      //agregamos la etiqueta "imagen" a su contenedor principal "containerimagen"
      containerimagen.appendChild(imagen);

      //agregamos el contenedor "containerhijocantidadproducto" al contenedor padre llamado "containerpadrecantidadproducto"
      containerpadrecantidadproducto.appendChild(containerhijocantidadproducto);

      //agrego el icono aumentar al boton aumentar producto
      botonaumentar.appendChild(iconoaumentar);

      //agrego el icono reducir al boton reducir producto
      botonreducir.appendChild(iconoreducir);

      //agregamos el elemento llamado "precionumeroproducto" a su contenedr principal
      containerprecionumeroproducto.appendChild(precionumeroproducto);

      //agregamos el elemento llamado "botoneliminar" a su contenedr principal llamado "containereliminarproducto"
      containereliminarproducto.appendChild(botoneliminar);

      //agrego el icono al boton eliminar producto
      botoneliminar.appendChild(iconoeliminar);

      //añadimos todos los elementos al contendor padre llamado ""
      containerhijocantidadproducto.append(
        botonaumentar,
        inputcantidad,
        botonreducir
      );

      //agregamos la etiqueta "nombre" a su contenedor principal "containernombre"
      containernombre.append(nombre, precio);

      //agregamos todos los contenedores princiaples al contenedor contenedorpadre
      containerproducto.append(
        containerimagen,
        containernombre,
        containerpadrecantidadproducto,
        containerprecionumeroproducto,
        containereliminarproducto
      );

      //asignamos el containerproducto al contenedor principal llamado contenedorpadre
      contenedorpadre.append(containerproducto);
    
    });

    //invocamos la funcion que permite mostrar los productos del carrito
    seleccionarproducto();
  }
 
}

//función permite hacer el calculo por cada uno de los productos sumar o quitar producto
function seleccionarproducto() {
  //contador servira para sumar o restar productos
  let contador=1;

  //extraemos todos los contenedores que poseen las compras esto para acceder directamente a sus elementos internos
  let container_compras = document.querySelectorAll(".container-compras");

  //recorremos los n elementos
  container_compras.forEach((actual,indice) => {

        //extraemos el elemento con clase quantity-Products__plus al cual leeremos el evento click
        const plus = actual.querySelector(".quantity-Products__plus");

        //extraemos el elemento con clase quantity-Products__minus al cual leeremos el evento click
        const minus = actual.querySelector(".quantity-Products__minus");

        //extraemos el contenido al elemento con clase compra-infoproducto__prices
        let precio = actual.querySelector(".compra-infoproducto__prices").textContent;

        //extraemos el precio del producto sin el caracter $
        precio=limpiarcaracter(precio);

        //extraemos el contenido al elemento con clase compra-totalunitario__preices
        const preciototalproducto = actual.querySelector(".compra-totalunitario__preices");

        //extraemos el contenido al elemento con clase quantity-Products__input y indice(parametro)
        const inputtextunidades = actual.querySelector(".quantity-Products__input");

        //extraemos el identificador para poder eliminar un elemento de array
        let eliminarproducto=actual.querySelector('.eliminar-compra__btn');

        /*creamos una variable para asignar el valor de incremento o decremento al 
        imput text de carrito de cada producto*/
        let nuevacantidad=0;

        //asignamos el precio inicial al elemento o etiqueta preciototalproducto
        preciototalproducto.innerHTML="$"+precio;

        plus.addEventListener("click", e => {

            //obtenemos el nombre del producto esto pàra poder modificar sus propiedades por medio de su nombre
            lblnombre=actual.querySelector('.compra-infoproducto__name').textContent;

            //obtenemos el valor del input
            nuevacantidad =parseInt(inputtextunidades.value)+contador;

            //sumamos el contador de 1 en 1 y lo asignamos al input de texto
            inputtextunidades.value = nuevacantidad;

            //realizamos el cálculo del precio unitario por el número de 
            calculototalunitario=precio*nuevacantidad;

            //asignamos el resultado del cálculo de productos a la etiqueta
            preciototalproducto.textContent="$"+(calculototalunitario).toFixed(2);

            //metodo para actualizar el elemento totalproducto del array  
            actualizarCarrito(lblnombre,nuevacantidad,calculototalunitario);

            //detenemos el evento al realizar el primer click
            e.stopImmediatePropagation();
        });

        minus.addEventListener("click", e => {
            
            //obtenemos el valor del input
            nuevacantidad =parseInt(inputtextunidades.value)-contador;

            if(nuevacantidad>=1){
                //restamos el contador de 1 al valor del input 
                inputtextunidades.value =nuevacantidad;

                //realizamos el cálculo del precio unitario por el número de 
                calculototalunitario=precio*nuevacantidad;

                //asignamos el resultado del cálculo de productos a la etiqueta
                preciototalproducto.textContent="$"+(calculototalunitario).toFixed(2);

                //metodo para actualizar el elemento totalproducto del array  
                actualizarCarrito(lblnombre,nuevacantidad,calculototalunitario);
            }

            //detenemos el evento al realizar el primer click
            e.stopImmediatePropagation();
        });

        eliminarproducto.addEventListener("click",e=>{

            // extraer el valor del campo id del objeto
            let id = container_compras[indice].id;

            //buscamos el indice en el arreglo ArrayCarrito mediante el id del producto esto para poder eliminarlo del carrito  
            let indexArrayCarrito=ArrayProductos.findIndex(objeto => objeto.id === parseInt(id));

            //eliminamos el registro del arreglo
            ArrayProductos.splice(indexArrayCarrito,1);

            //  Eliminamos el elemento o producto del DOM
            contenedorpadre.removeChild(container_compras[indice]);

            //mostramos la cantidad de productos que existen en el carrito de compra
            cantidadproductos.innerHTML = ArrayProductos.length;
          

           //invocamos la funcion que actualizara el valor total
           pagototal();
        });
  });
}

function actualizarCarrito(lblnombre,nuevacantidad,calculototalunitario){
  
    //extraemos el elemento con clase quantity-Products__plus al cual leeremos el evento click
    //const nameproducto = actual.querySelector(".compra-infoproducto__name").textContent;
    const nameproducto=lblnombre;

    // Obtener una referencia al objeto que deseas actualizar
    let dataproducto = ArrayProductos.find(p => p.nombre ===nameproducto);

    // Actualizar las propiedad preciototal del objeto
    dataproducto.preciototal = calculototalunitario;
    dataproducto.unidades  = nuevacantidad;

    //invocamos la funcion que actualizara el valor total
    pagototal();
}

//permite calcular el costo total de todo el carrito de compras
function pagototal(){

    //elemento que servira para mostrar el precio total del carrito
    const detalletotal=document.querySelector('.detalles-compras__cantidad');

    //elemento que servira para mostrar el precio total + el costo de envio
    const totalpagar=document.querySelector('.detalles-compras__cantidad--total');

    //extraemos el contenido al elemento con clase detalles-compras__cantidad sera el costo de envio
    let costoenvio = document.querySelector(".detalles-compras__cantidad--cantidad").textContent;

    //extraemos el precio por envio sin el caracter $
    costoenvio=limpiarcaracter(costoenvio);

    //realizamos una suma del campo preciototal para obtener un solo precio 
    const total=ArrayProductos.reduce((acumulador,item)=>{

        return acumulador+item.preciototal;
    },0);

    //mostramos la suma total de cada uno de los productos en la equeta correspondiente
    detalletotal.textContent="$"+total.toFixed(2);

    //mostramos la suma precio total más el precio de envio
    totalpagar.textContent="$"+(parseInt(costoenvio)+total).toFixed(2);
}

//esta funcion me permite eliminar el caracter "$" que posee cada etiquetas 
function limpiarcaracter(precio){

  //obtenemos el # de caracteres que posee la cadena
  limpiarprecio=precio.length;

  //eliminamos el primer caracter de la cadena que sera el "$"
  precio=precio.substring(1,limpiarprecio);

  return precio;
}