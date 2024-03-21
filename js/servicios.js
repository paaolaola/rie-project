/*interacción de las vistas*/
document.addEventListener("DOMContentLoaded", function () {
    let viewLogin = document.querySelectorAll(".viewLogin");
    let viewServices = document.querySelectorAll(".viewServices");
    let viewHome = document.querySelectorAll(".viewHome");

    viewLogin.forEach(function (button) {
        button.addEventListener("click", function () {
            window.location.href = "index.html";
        });
    });

    viewServices.forEach(function (button) {
        button.addEventListener("click", function () {
            window.location.href = "servicios.html";
        });
    });

    viewHome.forEach(function (button) {
        button.addEventListener("click", function () {
            window.location.href = "home.html";
        });
    });
});

// /*array de servicios comentado por uso del json*/
// const arrServices = [
//     {
//         id: 1,
//         name: "Endodoncia",
//         price: 90990,
//         img: "https://images.pexels.com/photos/13207299/pexels-photo-13207299.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
//         detail: "Protege tus piezas dentales dañadas y prevenir la pérdida. El procedimiento consiste en extraer la pulpa dental y la cavidad resultante, con lo que se rellena y sella con material inerte y biocompatible.",
//     },
//     {
//         id: 2,
//         name: "Ortodoncia",
//         price: 60990,
//         img: "https://images.pexels.com/photos/6528866/pexels-photo-6528866.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
//         detail: "Corrige desviaciones, apiñamiento, diastemas (espacios entre los dientes), forma de arcadas dentales o problemas de mordida.",
//     },
//     {
//         id: 3,
//         name: "Implantología",
//         price: 140990,
//         img: "https://images.pexels.com/photos/6627281/pexels-photo-6627281.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
//         detail: "Si quieres recuperar una bonita sonrisa, tener unos dientes cuidados y sentirte mejor contigo mismo, el implante es una excelente opción y muy frecuente en la estética dental.",
//     },
//     {
//         id: 4,
//         name: "Periodoncia",
//         price: 40990,
//         img: "https://images.pexels.com/photos/4270094/pexels-photo-4270094.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
//         detail: "Prevención, diagnóstico y tratamiento de las inflamaciones de la encía y del ligamento periodontal.",
//     },
//     {
//         id: 5,
//         name: "Prótesis",
//         price: 220990,
//         img: "https://media.istockphoto.com/id/611901096/es/foto/pr%C3%B3tesis-dentales-pr%C3%B3tesis-pr%C3%B3tesis-de-trabajo.jpg?s=612x612&w=0&k=20&c=_601MvqWuShU9mfYW6Mp6kiWqzbIBr7Axsi_5I3eUqA=",
//         detail: "Estructura fija que se atornilla sobre los implantes dentales previamente establecidos. El paciente vuelve a disfrutar de los dientes, así como de las encías perdidas.",
//     },

//     {
//         id: 6,
//         name: "Cirugía Maxilofacial",
//         price: 240990,
//         img: "https://images.pexels.com/photos/4421494/pexels-photo-4421494.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
//         detail: "Trata procesos patológicos que afectan la estructura facial, como las extracciones de muelas del juicio o extirpación de quistes o tumores.",
//     },
//     {
//         id: 7,
//         name: "Rehabilitación Oral",
//         price: 199990,
//         img: "https://images.pexels.com/photos/12148417/pexels-photo-12148417.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
//         detail: "Tratamiento de restauración dental que se realiza cuando se han perdido piezas dentarias por caries, traumatismos, fracturas o por enfermedades periodontales.",
//     },
//     {
//         id: 8,
//         name: "Blanqueamiento Dental",
//         price: 70990,
//         img: "https://media.istockphoto.com/id/1321760897/es/foto/una-mujer-en-la-cita-para-blanquear-los-dientes-de-un-dentista.jpg?s=612x612&w=0&k=20&c=GVaTlURWoRIYXNI4BYHRGB9Ujux0lJCvFUn3fXkpNbQ=",
//         detail: "Procedimiento para aclarar el color de los dientes mediante el uso de agentes químicos que actúan sobre la superficie de éstos. Otorga un aspecto más limpio y claro a la sonrisa.",
//     },
//     {
//         id: 9,
//         name: "Exodoncia",
//         price: 60990,
//         img: "https://dracarolinaflorez.com/wp-content/uploads/2019/09/Exodoncia-Tratamientos-dentales-Colombia.jpg",
//         detail: "Extracción de un diente dañado o que presenta problemas para la salud bucodental.",
//     },
// ];

/*peticion json con async y await*/
let arrServices = [];
const API_URL = "./json/servicios.json";

const getData = async (url) => {
    const res = await fetch(url);
    const data = await res.json();
    arrServices = data;
    showServices(arrServices);
    AddToCartEvent();
};
getData(API_URL);

/*mapeo de la card y destructuring */
function showServices(services) {
    const servicesDom = services
        .map(
            ({ name, price, img, detail }) => `
            <div class="card">
                <img src="${img}" alt="${name}" />
                <h5 class="name-service">${name}</h5>
                <p>Desde: $${price}</p>
                <p class="detail-service">${detail}</p>
                <button id="add-btn" class="btn-services">Agregar</button>
            </div>
        `
        )
        .join("");

    document.querySelector(".container-card").innerHTML = servicesDom;
}

/*función de los botones agregar*/

function AddToCartEvent() {
    const addToCartBtn = document.querySelectorAll(".btn-services");
    addToCartBtn.forEach((btn) => {
        btn.addEventListener("click", handleAddToCart);
    });
}

/*función para ignorar acentos en la busqueda*/
function removeAccents(text) {
    return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

/*función y método de la barra de búsqueda */
function handleSearch(e) {
    e.preventDefault();

    const searchTerm = removeAccents(document.getElementById("searchInput").value.toLowerCase());

    const servicesFilter = arrServices.filter((service) => {
        const serviceName = removeAccents(service.name.toLowerCase());
        return serviceName.includes(searchTerm);
    });

    showServices(servicesFilter);
    AddToCartEvent();
}

/*función para el input de la barra de búsqueda*/
function handleInput(e) {
    const searchTerm = e.target.value.trim().toLowerCase();

    /*operador para la condicion del input*/
    searchTerm ? "" : showServices(arrServices);
}

document.getElementById("searchForm").addEventListener("submit", handleSearch);
document.getElementById("searchInput").addEventListener("input", handleInput);

showServices(arrServices);
AddToCartEvent();

/*CARRITO DE COMPRAS*/

/*array para el carrito vacío*/
const cart = [];

/*función para agregar los servicios */
function addToCart(service) {
    /*condicion para la cantidad del servicio*/
    const quantityService = cart.findIndex((item) => item.id === service.id);

    if (quantityService !== -1) {
        /*actualiza la cantidad */
        cart[quantityService].quantity++;
    } else {
        /*o lo agrega*/
        cart.push({ ...service, quantity: 1 });
    }
    /*toastify para el boton agregar*/
    Toastify({
        text: "Agregado al carro!",
        duration: 3000,
        gravity: "top",

        style: {
            background: "linear-gradient(to right, #eaeaea, #00b4d8)",
            color: "#03045e",
            borderRadius: "10px",
            border: "1px solid #03045e",
        },
    }).showToast();
    updateCart();
}

/*evento del botón "finalizar compra"*/
const finishBtn = document.getElementById("checkoutButton");
finishBtn.addEventListener("click", () => {
    if (cart.length === 0) {
        /*sweetalert para aviso de carro vacío o compra finalizada*/
        Swal.fire({
            title: "¡Tu carro de compras está vacío!",
            icon: "warning",
            confirmButtonColor: "#00b4d8",
            confirmButtonText: "OK",
        });
    } else {
        Swal.fire({
            title: "¡Compra finalizada!",
            icon: "success",
            confirmButtonColor: "#00b4d8",
            confirmButtonText: "OK",
        });
    }

    cart.length = 0;
    updateCart();
});

/*evento del botón "borrar carrito"*/
const removeBtn = document.getElementById("btnRemove");
removeBtn.addEventListener("click", () => {
    if (cart.length >= 1) {
        /*sweetalert para aviso de carro vacío o servicios eliminados*/
        Swal.fire({
            title: "¡Tu carro de compras ha sido eliminado!",
            icon: "success",
            confirmButtonColor: "#00b4d8",
            confirmButtonText: "OK",
        });
    } else {
        Swal.fire({
            title: "¡Tu carro de compras está vacío!",
            icon: "warning",
            confirmButtonColor: "#00b4d8",
            confirmButtonText: "OK",
        });
    }

    cart.length = 0;
    updateCart();
});

/*función para actualizar el carrito*/
function updateCart() {
    /*se trae los elementos del DOM para usarlos*/
    const serviceList = document.getElementById("serviceList");
    const quantityList = document.getElementById("quantityList");
    const priceList = document.getElementById("priceList");
    const totalPriceService = document.getElementById("totalPrice");

    /*me aseguro que no se duplique lo que voy agregando*/
    serviceList.innerHTML = "";
    quantityList.innerHTML = "";
    priceList.innerHTML = "";

    let totalPrice = 0;

    /*itero los servicios en el carrito*/
    cart.forEach((service) => {
        /*se agregan los elementos al DOM*/
        const serviceItem = `<li class="list-group-item list-group-service">${service.name}</li>`;
        serviceList.innerHTML += serviceItem;

        const quantityItem = `<li class="list-group-item">${service.quantity}</li>`;
        quantityList.innerHTML += quantityItem;

        const priceItem = `<li class="list-group-item">${service.price}</li>`;
        priceList.innerHTML += priceItem;

        totalPrice += parseInt(service.price) * service.quantity;
    });

    /*actualizo el precio total*/
    totalPriceService.innerHTML = totalPrice;
}

/*evento del boton "agregar" a la card*/

const addToCartBtn = document.querySelectorAll(".btn-services");
addToCartBtn.forEach((btn) => {
    btn.addEventListener("click", () => {
        /*agregar toast*/
        Toastify({
            text: "Producto agregado al carrito",
            duration: 3000,
        }).showToast();
    });
});

/*función para el clic del botón de la card "agregar" */
function handleAddToCart(e) {
    const card = e.target.closest(".card");
    const serviceName = card.querySelector(".name-service").innerHTML;
    const service = arrServices.find((service) => service.name === serviceName);

    addToCart(service);
}
