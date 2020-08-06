/*********************  Se ejecurá al abrir el HTML  ***************************/
function loadProduct(){
//Se configura la conexión a la DB    
var firebaseConfig = {

                        apiKey: "AIzaSyDAJvvDPv_onNMyc_VAlky6a-4skB44mok",
                        authDomain: "eraseunavez-pasteleria.firebaseapp.com",
                        databaseURL: "https://eraseunavez-pasteleria.firebaseio.com",
                        projectId: "eraseunavez-pasteleria",
                        storageBucket: "eraseunavez-pasteleria.appspot.com",
                        messagingSenderId: "802282295386",
                        appId: "1:802282295386:web:13495939bb57a9e12e8863",
                        measurementId: "G-CPVGN5971Q"
                     }

/*********************  Se recorre la DB  ***************************/
var app =firebase.initializeApp(firebaseConfig);
var db = firebase.firestore();

//Se determina el tamaño de la colección
db.collection("productos").get().then(snap => {
    size = snap.size // will return the collection size
    console.log(size);
/*****************************************************************/

    let $items = document.querySelector('#items');
    let carrito = [];
    let total = 0;
    let total1 = 0;
    let stotal = 0;   
    let domicilio = 0; 
    let $carrito = document.querySelector('#carrito');
    let $total = document.querySelector('#total');
    let $total1 = document.querySelector('#total1');
    let $stotal = document.querySelector('#stotal');
    let $domicilio = document.querySelector('#domicilio');
    let $botonVaciar = document.querySelector('#boton-vaciar');
    let $totalpago = document.querySelector('#totalpago');

/**********************************************************************/
/*****************************  FUNCIONES ****************************/
/*********************************************************************/
/*********************  Se renderiza el HTML ***************************/
    function renderItems() {
        db.collection("producto")
        .get()
        .then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                // doc.data() is never undefined for query doc snapshots
                 // Estructura
                 let miNodo = document.createElement('div');
                 miNodo.classList.add('card');
                 miNodo.style.width ='18rem';
                 // Imagen
                 let miNodoImagen = document.createElement('img');
                 miNodoImagen.classList.add('card-img-top');
                 miNodoImagen.setAttribute('src', doc.data().imagen);
                 // Body
                 let miNodoCardBody = document.createElement('div');
                 miNodoCardBody.classList.add('card-body');
                 miNodoCardBody.style.padding='0px' ;

                 // Titulo
                 let miNodoTitle = document.createElement('h3');
                 miNodoTitle.classList.add('card-title', 'producto');
                 miNodoTitle.textContent = doc.data().Nombre;
                 miNodoTitle.style.padding='0.5vw' ;
                 miNodoTitle.style.margin='0' ;
                // Descripcion
                 let miNodoDesc = document.createElement('p');
                 miNodoDesc.classList.add('card-text','descripcion');
                 miNodoDesc.textContent = doc.data().Descripcion;
                 miNodoDesc.style.height ='3.2rem'
                 miNodoDesc.style.padding='0.7vw'
                                     
                 // Body
                 let miNodoCardBody2 = document.createElement('div');
                 miNodoCardBody2.classList.add('card-body','pricebox');
                 miNodoCardBody2.style.padding='0vw'
                 miNodoCardBody2.style.margin='0vw'
                 
                 // Tamano
                 let miNodoSize = document.createElement('h5');
                 miNodoSize.classList.add('tamano');
                 miNodoSize.textContent = (doc.data().Tamano_1);

                 // Precio
                 let miNodoPrecio = document.createElement('p');
                 miNodoPrecio.classList.add('card-text','precio');
                 miNodoPrecio.textContent = (doc.data().Precio_1) + ' COP';
                 miNodoPrecio.style.margin='0vw'
                 miNodoPrecio.style.padding='0.3vw'
                 miNodoPrecio.style.paddingBottom='0'
      
                 // Boton 
                 let miNodoBoton = document.createElement('button');
                 miNodoBoton.classList.add('btn', 'btn-primary');
                 miNodoBoton.textContent = 'Agregar';
                 let marc = doc.data().id
                 miNodoBoton.setAttribute('marcador', marc);
                 miNodoBoton.addEventListener('click', anyadirCarrito);
                 miNodoBoton.style.margin='.2vw'

                 // Insertamos
                 miNodoCardBody.appendChild(miNodoImagen);
                 miNodoCardBody.appendChild(miNodoTitle);
                 miNodoCardBody.appendChild(miNodoDesc);
                 miNodoCardBody2.appendChild(miNodoPrecio);
                 miNodoCardBody2.appendChild(miNodoSize);
                 miNodoCardBody2.appendChild(miNodoBoton);
                 miNodo.appendChild(miNodoCardBody);
                 miNodo.appendChild(miNodoCardBody2);
                 $items.appendChild(miNodo);
                 });
        })
        .catch(function(error) {
            console.log("Error getting documents: ", error);
        });
}
/*********************  Se añaden productos al carro ***************************/
    function anyadirCarrito () {
        // Anyadimos el Nodo a nuestro carrito
        carrito.push(this.getAttribute('marcador'))
        // Calculo el total
        calcularTotal();
        // Renderizamos el carrito 
        renderizarCarrito();
        //cobrar();
    }
 /*********************  Calcular total del carro ***************************/
    function calcularTotal() {
        // Limpiamos precio anterior
        total = 0;
        totalpago=0;
        total1=0;
        stotal = 0;
        domicilio = 0;
        $stotal.textContent = 0;
        $total.textContent = 0;
        $domicilio.textContent = 0;
                // Recorremos el array del carrito

        for (let item of carrito) {
        //Se carga el dato de producto correspodiente al botón en la variable miItem 

            let DB = db.collection("producto").doc(item);
            DB.get().then(function (doc) {
                miItem=doc.data()    
                // Renderizamos subtotal    
                stotal = stotal + miItem.Precio_1                     
                 $stotal.textContent = stotal;
                // Renderizamos el precio en el HTML     
                domicilio = 5000;                   
                $domicilio.textContent = domicilio;
                // Renderizamos el precio en el HTML     
                total = stotal + domicilio                    
                $total.textContent =  total;
                total1=total;
                $total1.setAttribute('value',total1) ;
        
            //Cargar total para el pago
            totalpago=total*100;
             $totalpago.setAttribute('value',totalpago) ;
             


    })
    }
    }
/*********************  Se renderiza el HTML del carrito ***************************/
    function renderizarCarrito() {
            // Vaciamos todo el html
            $carrito.textContent = '';
            // Quitamos los duplicados
            let carritoSinDuplicados = [...new Set(carrito)];
            // Generamos los Nodos a partir de carrito
            carritoSinDuplicados.forEach(function (item, indice) {
            //Se carga el dato de producto correspodiente al botón en la variable miItem 
            let DB = db.collection("producto").doc(item);
            DB.get().then(function (doc) {     let    miItem=doc.data()         
            // Cuenta el número de veces que se repite el producto
            let numeroUnidadesItem = carrito.reduce(function (total, itemId) {
                return itemId === item ? total += 1 : total;
            }, 0);
            // Creamos el nodo del item del carrito
            let miNodo = document.createElement('li');
            miNodo.classList.add('list-group-item', 'text-right', 'mx-2');          
            miNodo.textContent = miItem.Precio_1
            miNodo.textContent = `${numeroUnidadesItem} x ${miItem.Nombre} - ${miItem.Precio_1}COP`;
            // Boton de borrar
            let miBoton = document.createElement('button');
            miBoton.classList.add('btn', 'btn-danger', 'mx-5');
            miBoton.textContent = 'X';
            miBoton.style.marginLeft = '1rem';
            miBoton.setAttribute('item', item);
            miBoton.addEventListener('click', borrarItemCarrito);
            // Mezclamos nodos
            miNodo.appendChild(miBoton);
            $carrito.appendChild(miNodo);
        })
       
        })
    }
/*********************  Borrrar items delcarrito ***************************/   
    function borrarItemCarrito() {
        console.log()
        // Obtenemos el producto ID que hay en el boton pulsado
        let id = this.getAttribute('item');
        // Borramos todos los productos
        carrito = carrito.filter(function (carritoId) {
            return carritoId !== id;
        });
        // volvemos a renderizar
        renderizarCarrito();
        // Calculamos de nuevo el precio
        calcularTotal();
    }
    /*********************  Quitar items delcarrito ***************************/   
        function vaciarCarrito() {
            // Limpiamos los productos guardados
            carrito = [];
            // Renderizamos los cambios
            renderizarCarrito();        
            calcularTotal();
            $total.textContent = 0;
        }
    
        // Eventos
        $botonVaciar.addEventListener('click', vaciarCarrito);
    
        // Inicio
        renderItems();
    
    })
    };
    