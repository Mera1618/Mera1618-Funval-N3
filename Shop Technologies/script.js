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
        <h2 class="fw-bold d-flex justify-content-between py-2">${elemento.nombre}<button id="gustos-producto"><img src="https://img.icons8.com/cotton/64/000000/like--v5.png"/></button></h2>
        <div>${elemento.descripcion}</div>
        <div class ="fw-bold d-flex justify-content-between py-2">$${elemento.precio}<button class="cardbutton" id="agregar-producto" href="#"><img src="https://img.icons8.com/ios-glyphs/30/000000/filled-plus-2-math.png"/></button></div>
    </div>
    `
}

const nuevaCompra = (nuevoselemento) =>{
    return`
    <div class = "d-flex contenedor w-100">
        <div class="p-1 h-50" style ="background: ${nuevoselemento.background}">
            <img src="${nuevoselemento.imagen}">
        </div>
        <div class="d-flex flex-column p-2">
            <h2 class="fw-bold d-flex justify-content-between py-2">${nuevoselemento.nombre}</h2>
            <div>${nuevoselemento.descripcion}</div>
        </div>
        <div class="d-flex w-25">
            <button class="button-more" id="agregar-producto" href="#"><img src="https://img.icons8.com/ios-glyphs/30/000000/filled-plus-2-math.png"/></button>
            <p class="contadores">1</p>
            <button class="button-minor" id="agregar-producto" href="#"><img src="https://img.icons8.com/ios-glyphs/30/000000/filled-minus-2-math.png"/></button>
            <button class="fw-bold d-flex justify-content-between h-25 boton-basura"><img src="https://img.icons8.com/sf-black-filled/64/000000/trash.png"/></button>
        </div>
        <h1 class ="fw-bold d-flex justify-content-between py-2 precio-pagar">$${nuevoselemento.precio}</h1>
    </div>
    `
}


const pagarproducto = (pagodeproductos) =>{
    return `
    <div>
        <ul>
            <li>${pagodeproductos.nombre}</li>
        </ul>
        <ul>
            <li>${pagodeproductos.totalpagar}</li>
        </ul>
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
                console.log(carrito);
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
                <li>
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
                    <li>
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
                })
            })

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
                <li>
                    ${subtotal}
                </li>
                `;
        })
    })
}
//Perdón por lo inconvenientes la verdad ha sid uno de los mosulo más dificiles para mi
//y todo el entorno por el que pase estas semanas noa yudo, una disculpa
//seguire trabjando y de mejor forma para que no ocurra de nuevo
// let main = document.getElementById("root");

// const card = (nombre, descripcion, precio, img, background)=>`
//     <div class = "d-flex flex-column contenedor">
//         <div class="p-1" style ="background: ${background}">
//             <img src="${img}">
//         </div>
//         <h2 class="fw-bold d-flex justify-content-between py-2">${nombre}<a href="#"><img src="https://img.icons8.com/cotton/64/000000/like--v5.png"/></a></h2>
//         <div>${descripcion}</div>
//         <div class ="fw-bold d-flex justify-content-between py-2">$${precio}<a id="agregar" href="#"><img src="https://img.icons8.com/ios-glyphs/30/000000/filled-plus-2-math.png"/></a></div>
//     </div>
// `
//     main.innerHTML+=card("VR Glasses CR-103","The new vr glasses are amazing if you want...",128,"./images/VR.png", "#39C7A5");
//     main.innerHTML+=card("VR Glasses CR-103","The new vr glasses are amazing if you want...",128,"./images/MN643.png","#FDE1E6");
//     main.innerHTML+=card("VR Glasses CR-103","The new vr glasses are amazing if you want...",128,"./images/PS4.png","#D5D5E0");
//     main.innerHTML+=card("VR Glasses CR-103","The new vr glasses are amazing if you want...",128,"./images/VR.png", "#39C7A5");
//     main.innerHTML+=card("VR Glasses CR-103","The new vr glasses are amazing if you want...",128,"./images/MN643.png","#FDE1E6");
//     main.innerHTML+=card("VR Glasses CR-103","The new vr glasses are amazing if you want...",128,"./images/PS4.png","#D5D5E0");

    // let section = document.querySelector("#story");

    // const tabla = (name, description, price, imge, color) =>`
    //     <div>
    //         <div>
    //             <img src="${imge}">            
    //         </div>
    //         <h2>${name}</h2>
    //     </div>
    // `
    // story.innerHTML+=tabla("VR Glasses CR-103","./images/VR.png");
