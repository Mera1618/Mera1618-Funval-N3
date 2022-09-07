const URL = "./main.json";

fetch(URL)
    .then(response => response.json())
    .then(json =>{
        
        json.forEach(element => {
            story.innerHTML += createElement(elemento);
        });
    })

const createElement =(elemento) =>{
    return `
    <div class="carta">
    <p>${elemento.nombre}</p>
    </div>
    `
}

let main = document.getElementById("root");

const card = (nombre, descripcion, precio, img, background)=>`
    <div class = "d-flex flex-column contenedor">
        <div class="p-1" style ="background: ${background}">
            <img src="${img}">
        </div>
        <h2 class="fw-bold d-flex justify-content-between py-2">${nombre}<a href="#"><img src="https://img.icons8.com/cotton/64/000000/like--v5.png"/></a></h2>
        <div>${descripcion}</div>
        <div class ="fw-bold d-flex justify-content-between py-2">$${precio}<a id="agregar" href="#"><img src="https://img.icons8.com/ios-glyphs/30/000000/filled-plus-2-math.png"/></a></div>
    </div>
`
    main.innerHTML+=card("VR Glasses CR-103","The new vr glasses are amazing if you want...",128,"./images/VR.png", "#39C7A5");
    main.innerHTML+=card("VR Glasses CR-103","The new vr glasses are amazing if you want...",128,"./images/MN643.png","#FDE1E6");
    main.innerHTML+=card("VR Glasses CR-103","The new vr glasses are amazing if you want...",128,"./images/PS4.png","#D5D5E0");
    main.innerHTML+=card("VR Glasses CR-103","The new vr glasses are amazing if you want...",128,"./images/VR.png", "#39C7A5");
    main.innerHTML+=card("VR Glasses CR-103","The new vr glasses are amazing if you want...",128,"./images/MN643.png","#FDE1E6");
    main.innerHTML+=card("VR Glasses CR-103","The new vr glasses are amazing if you want...",128,"./images/PS4.png","#D5D5E0");

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
