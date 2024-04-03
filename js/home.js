/*interacción de las vistas*/

document.addEventListener("DOMContentLoaded", () => {
    let viewLogin = document.querySelectorAll(".viewLogin");
    let viewServices = document.querySelectorAll(".viewServices");
    let viewHome = document.querySelectorAll(".viewHome");

    viewLogin.forEach((button) => {
        button.addEventListener("click", () => {
            window.location.href = "index.html";
        });
    });

    viewServices.forEach((button) => {
        button.addEventListener("click", () => {
            window.location.href = "servicios.html";
        });
    });

    viewHome.forEach((button) => {
        button.addEventListener("click", () => {
            window.location.href = "home.html";
        });
    });
});

/*lógica para cierre de sesión*/
let logOut = document.getElementById("btnSession");

logOut.addEventListener("click", (e) => {
    e.preventDefault();

    if (logOut) {
        Swal.fire({
            title: "Cerraste sesión!",
            icon: "success",
            confirmButtonColor: "#00b4d8",
            confirmButtonText: "OK",
        });
    }

    /* setTime para redirigir al login */
    setTimeout(() => {
        window.location.href = "index.html";
    }, 1000);
});
