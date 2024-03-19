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
