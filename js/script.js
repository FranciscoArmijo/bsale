const divProductos = document.getElementById('divProductos');
const buscador = document.getElementById('buscador');
const divCategorias = document.getElementById('categorias');

eventlisteners();

function eventlisteners(){
    document.addEventListener('DOMContentLoaded', ()=>{
        borrarProductos();
        cargarTodos();
        cargarCategorias()
    });
    //document.addEventListener('DOMContentLoaded', cargarTodos);
    buscador.addEventListener('input',(e)=>{
        //limpiar el div de los productos antes de volver a llenarlos
        if(e.target.value.length == 0){
            borrarProductos();
            cargarTodos();
        }else{
            borrarProductos();
            buscarNombre(e.target.value)
            //buscarNombre(e.target.value);
        }
        
    });
}

//funciones
const cargarTodos = async()=>{
    const url =`http://localhost/TIENDABSALE/api/?consulta&nombreProducto=`;
    const respuesta = await fetch(url);
    const resultado = await respuesta.json();
    borrarProductos();
    llenarCards(resultado.productos);
    
}



//busca segun el contenido del div en tiempo real
const buscarNombre = async(nombre)=>{
    const url =`http://localhost/TIENDABSALE/api/?consulta=buscar&nombreProducto=${nombre}`;
    const respuesta = await fetch(url);
    const resultado = await respuesta.json();
    borrarProductos();
    llenarCards(resultado.producto);
    
}

//borrar los childs que estan dentro del dive de productos

function borrarProductos(){
    while (divProductos.firstChild) {
        divProductos.removeChild(divProductos.lastChild);
      }
}

//se crea cada tarjeta
function llenarCards(resultado){
    for (let index = 0; index < resultado.length; index++) {
        const element = resultado[index];
        //crear el div principal de la tarjeta
        const tarjeta = document.createElement('div');
        tarjeta.classList.add('card','m-3');
        tarjeta.style.width = '18rem';
        //crear el div de la imagen dentro de la tarjeta
        const divImagen = document.createElement('div');
        divImagen.classList.add('d-flex','justify-content-center');
        divImagen.style.width = 'auto';
        divImagen.style.height = '300px';
        //crear la imagen
        const imagenTarjeta = document.createElement('img');
        imagenTarjeta.classList.add('mt-2');
        imagenTarjeta.style.width = 'auto';
        imagenTarjeta.style.height = '80%';
        imagenTarjeta.src = element.url_image;
        //cerar cuerpo tarjeta
        const cuerpoTarjeta = document.createElement('div');
        cuerpoTarjeta.classList.add('card-body');
        //titulo
        const tituloTarjeta = document.createElement('h5');
        tituloTarjeta.classList.add('card-title');
        tituloTarjeta.innerHTML = element.name;
        //texto tarjeta
        const textoTarjeta = document.createElement('p');
        textoTarjeta.classList.add('card-text');
        textoTarjeta.innerHTML = element.price;
        //boton tarjeta
        const botonTarjeta = document.createElement('a')
        botonTarjeta.classList.add('btn','btn-primary');
        botonTarjeta.innerHTML = 'Agregar';
        //aagregar elementos al cuerpo
        cuerpoTarjeta.appendChild(tituloTarjeta);
        cuerpoTarjeta.appendChild(textoTarjeta);
        cuerpoTarjeta.appendChild(botonTarjeta);
        //agregar elementos a la tarjeta
        divImagen.appendChild(imagenTarjeta);
        tarjeta.appendChild(divImagen);
        tarjeta.appendChild(cuerpoTarjeta);
        //agregar tarjetas al div principal
        divProductos.appendChild(tarjeta);
    }
}
//las categoarias se obtienen de los registros de la tabla sql y se cargan los registros unicos
const cargarCategorias = async()=>{
    const url =`http://localhost/TIENDABSALE/api/?consulta=categorias&nombreProducto=`;
    const respuesta = await fetch(url);
    const resultado = await respuesta.json();
    console.log(resultado);
    botonesCategorias(resultado);
}

function botonesCategorias(categorias){
    for (let i = 0; i < categorias.categorias.length; i++) {
        const divBotonCategoria = document.createElement('div');
        const botonCategoria = document.createElement('a');
        botonCategoria.classList.add('btn','btn-primary');
        botonCategoria.innerHTML = categorias.categorias[i].category
        divBotonCategoria.classList.add('col');
        divBotonCategoria.appendChild(botonCategoria);

        divCategorias.appendChild(divBotonCategoria);

        console.log(categorias.categorias[i]);
    }
}