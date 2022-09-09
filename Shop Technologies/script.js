const URL = "./main.json";
let root = document.getElementById("root");
let carrito = [];
console.log(URL);

fetch(URL)
    .then(response => response.json())
    .then(json =>{
        
        json.forEach(elemento => {
            root.innerHTML += createElement(elemento);
        });

        eventos(json); 
    })

const createElement =(elemento) =>{
    return `
    <div class = "d-flex flex-column contenedor">
        <div class="p-1" style ="background: ${elemento.background}">
            <img src="${elemento.imagen}">
        </div>
        <h2 class="fw-bold d-flex justify-content-between py-2">${elemento.nombre}<button id="gustos-producto"><i class="fa-solid fa-heart"></i></button></h2>
        <div>${elemento.descripcion}</div>
        <div class ="fw-bold d-flex justify-content-between py-2">$${elemento.precio}<button class="cardbutton" id="agregar-producto" href="#"><img src="https://img.icons8.com/ios-glyphs/30/000000/filled-plus-2-math.png"/></button></div>
    </div>
    `
}

const nuevaCompra = (nuevoselemento) =>{
    return`
    <div class = "contenedor-pag p-5">
        <div class="contenedor-img p-1" style ="background: ${nuevoselemento.background}">
            <img class="imagen-prod" src="${nuevoselemento.imagen}">
        </div>
        <div class="d-flex flex-column p-2">
            <h2 class="fw-bold d-flex justify-content-between py-2">${nuevoselemento.nombre}</h2>
            <div>${nuevoselemento.descripcion}</div>
        </div>
        <div class="d-flex w-25 contenedor-botones">
            <button class="button-more w-80" id="agregar-producto" href="#"><img src="https://img.icons8.com/ios-glyphs/30/000000/filled-plus-2-math.png"/></button>
            <p class="contadores"0>${nuevoselemento.cantidad}</p>
            <button class="button-minor" id="eliminar-producto" href="#"><img src="https://img.icons8.com/ios-glyphs/30/000000/filled-minus-2-math.png"/></button>
        </div>
        <div class="d-flex flex-column">
            <h1 class ="fw-bold d-flex justify-content-between py-2 precio-pagar">$${nuevoselemento.precio}</h1>
            <button class="fw-bold d-flex justify-content-between h-25 boton-basura"><i class="fa-solid fa-trash"></i></button>
        </div>
    </div>
    `
}

const pagarproducto = (pagodeproductos) =>{
    return `
    <div>
        <table class="table">
            <tr>
                <td>${pagodeproductos.nombre}</td>
                <td>${pagodeproductos.totalpagar}</td>
            </tr>
        </table>
    </div>
    `
}

const eventos = (arr) => {
    let buttons = document.querySelectorAll(".cardbutton");
    buttons.forEach((button, index) =>{
        button.addEventListener("click", () =>{
            let pagarprint = document.getElementById("pay");
            pagarprint.innerHTML = "";
            arr[index].totalpagar = arr[index].precio;
            carrito.push(arr[index]);
            arr[index].cantidad = 1;
            let newElement = document.getElementById("story");
            newElement.innerHTML = "";
            carrito.forEach(nuevoselemento => {
                newElement.innerHTML += nuevaCompra(nuevoselemento);
            })
            funcioncarrito();
            carritofinal();
            function funcioncarrito() {
            let masproducto = document.querySelectorAll(".button-more");
            let menosproduco = document.querySelectorAll(".button-minor");
            let guardacontador = document.querySelectorAll(".contadores");
            let vamospagar = document.querySelectorAll(".precio-pagar");

            masproducto.forEach((button, index) =>{
            button.addEventListener("click", () => {
                pagarprint.innerHTML = "";
                let compras = carrito[index].cantidad;
                compras ++;
                carrito[index].cantidad= compras;
                guardacontador[index].textContent = carrito[index].cantidad;
                let totales = carrito[index].cantidad * carrito[index].precio;
                carrito[index].totalpagar = totales;
                vamospagar[index].textContent = totales;
                carrito.forEach(pagodeproductos =>{
                pagarproducto(pagodeproductos);
                pagarprint.innerHTML += pagarproducto(pagodeproductos);
                })
                let subtotal = 0;
                carrito.forEach(subtotalpr=>{
                    subtotal+=subtotalpr.totalpagar;
                })
                pagarprint.innerHTML+=`
                <li class="precio-final">
                    ${subtotal}
                </li>
                `;
                if (compras == carrito[index].stock) {
                    button.disabled = true;
                    carrito[index].cantidad= compras;
                    guardacontador[index].textContent = carrito[index].cantidad;
                }else if( compras > 1){
                    menosproduco[index].disabled = false;
                }
             })
            })
            menosproduco.forEach((button, index) =>{
                button.addEventListener("click", () => {
                    pagarprint.innerHTML = "";
                    let compras = carrito[index].cantidad;
                    compras --;
                    carrito[index].cantidad= compras;
                    guardacontador[index].textContent = carrito[index].cantidad;
                    let totales = carrito[index].cantidad * carrito[index].precio;
                    carrito[index].totalpagar = totales;
                    vamospagar[index].textContent = totales;
                    //datos de la tercer sección
                    carrito.forEach(pagodeproductos =>{
                    pagarproducto(pagodeproductos);
                    pagarprint.innerHTML += pagarproducto(pagodeproductos);
                    })
                    let subtotal = 0;
                    carrito.forEach(subtotalpr=>{
                        subtotal+=subtotalpr.totalpagar;
                    })
                    pagarprint.innerHTML+=`
                    <li class="precio-final">
                        ${subtotal}
                    </li>
                    `;
                    if (compras == 1) {
                        button.disabled = true;
                    }
                    else if( compras <= carrito[index].stock){
                        masproducto[index].disabled = false;
                    }
                 })
            })
            borrcard();  
            }

            function borrcard() {
                let borrarcard = document.querySelectorAll(".boton-basura");
            borrarcard.forEach((button, index) =>{
                button.addEventListener("click", () =>{
                    console.log("aqui");
                    carrito.splice(carrito[index],1);
                    console.log(carrito);
                    // newsElement.textContent ="";
                    let newElement = document.getElementById("story");
                    newElement.innerHTML = "";
                    carrito.forEach(nuevoselemento => {
                    newElement.innerHTML += nuevaCompra(nuevoselemento);
            })
            funcioncarrito();
            pagarprint.textContent="";
            carritofinal();
                })
            })
        }
            function carritofinal() {
            carrito.forEach(pagodeproductos =>{
                pagarproducto(pagodeproductos);
                pagarprint.innerHTML += pagarproducto(pagodeproductos);
                })
                let subtotal = 0;
                carrito.forEach(subtotalpr=>{
                    subtotal+=subtotalpr.totalpagar;
                })
                pagarprint.innerHTML+=`
                <li class="precio-final">
                    ${subtotal}
                </li>
                `;
                descuentazo();
                function descuentazo() {
                let descuento = document.getElementById("descount");
                descuento.addEventListener( "input", () =>{
                    if (descuento.value == "descount") {
                        let condescuento = (subtotal - (subtotal*.10));
                        let finalpagar = document.querySelector(".precio-final");
                        finalpagar.textContent = condescuento;
                    }else{
                        let finalpagar = document.querySelector(".precio-final");
                        finalpagar.textContent = subtotal;
                    }
                })
            }
            }
        })
    })
}
//Perdón por lo inconvenientes la verdad ha sid uno de los mosulo más dificiles para mi
//y todo el entorno por el que pase estas semanas noa yudo, una disculpa
//seguire trabjando y de mejor forma para que no ocurra de nuevo
// let main = document.getElementById("root");