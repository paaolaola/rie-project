/*método random para imágenes*/
const backgrounds = ["02.jpg", "03.jpg", "04.jpg", "05.jpg"];

function changeBackground() {
    let random = Math.floor(Math.random() * backgrounds.length);
    document.body.style.backgroundImage = `url('./public/img/${backgrounds[random]}')`;
}
/*para manipular cambio de fondo cada 5 segundos*/
window.onload = function () {
    changeBackground();
    setInterval(changeBackground, 5000);
};

/*evento del boton y preventdefault*/
document.getElementById("loginForm").addEventListener("submit", function (e) {
    e.preventDefault(); /*impide recarga del form*/

    const user = document.getElementById("username").value;
    const pass = document.getElementById("password").value;

    /*validación de los inputs*/
    if (user === "" && pass === "") {
        document.getElementById("message-error").innerHTML = "Por favor, introduce tu usuario y contraseña.";
    } else if (user === "" || pass === "") {
        document.getElementById("message-error").innerHTML = "Por favor, completa los campos.";
    } else {
        /*verifico si se puede iniciar sesión*/
        if (checkLogin(user, pass)) {
            Swal.fire({
                title: "¡Inicio de sesión exitoso!",
                icon: "success",
                confirmButtonColor: "#00b4d8",
                confirmButtonText: "OK",
            });

            /* settime para redirir al home */
            setTimeout(function () {
                window.location.href = "home.html";
            }, 1000);

            /*para recordar la contraseña*/
            if (check.checked) {
                localStorage.setItem("check", "true");
                localStorage.setItem("username", user);
                localStorage.setItem("password", pass);
            } else {
                localStorage.removeItem("check");
                localStorage.removeItem("username");
                localStorage.removeItem("password");
            }
        } else {
            document.getElementById("message-error").innerHTML = "Nombre de usuario o contraseña incorrectos.";
        }
    }
});

function checkLogin(username, password) {
    /*obtengo pass almacenadas*/
    var storedPassword = localStorage.getItem(username);

    /*compruebo las pass*/
    if (password === storedPassword) {
        return true; //
    } else {
        return false;
    }
}
