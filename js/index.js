/*método random para imágenes background*/
const backgrounds = ["02.jpg", "03.jpg", "04.jpg", "05.jpg"];

function changeBackground() {
    let random = Math.floor(Math.random() * backgrounds.length);
    document.body.style.backgroundImage = `url('./public/img/${backgrounds[random]}')`;
}
/*para manipular cambio de fondo cada 5 segundos*/
window.onload = () => {
    changeBackground();
    setInterval(changeBackground, 5000);
};

/*FORM*/

/*evento del boton y preventdefault*/
document.getElementById("loginForm").addEventListener("submit", (e) => {
    e.preventDefault(); /*impido la recarga del form*/

    const user = document.getElementById("username").value;
    const pass = document.getElementById("password").value;

    function checkLogin(username, password) {
        /*para obtener la pass almacenada*/
        let storedPass = localStorage.getItem(username);

        /*compruebo la pass*/
        if (password === storedPass) {
            return true; //
        } else {
            return false;
        }
    }

    /*validación de los inputs*/
    if (user === "" && pass === "") {
        document.getElementById("message-error").innerHTML = "Por favor, introduce tu usuario y contraseña.";
    } else if (user === "" || pass === "") {
        document.getElementById("message-error").innerHTML = "Por favor, completa los campos.";
    } else {
        /*verifico si se puede iniciar sesión con el sweetAlert*/
        if (checkLogin(user, pass)) {
            Swal.fire({
                title: "¡Inicio de sesión exitoso!",
                icon: "success",
                confirmButtonColor: "#00b4d8",
                confirmButtonText: "OK",
            });

            /* setTime para redirigir al home */
            setTimeout(() => {
                window.location.href = "home.html";
            }, 1000);

            /*para traerse los datos segun el checkbox*/
            if (check.checked) {
                localStorage.setItem("check", "true");
                localStorage.setItem("username", user);
                localStorage.setItem("password", pass);
            } else {
                /*o elimina los datos*/
                localStorage.removeItem("check");
                localStorage.removeItem("username");
                localStorage.removeItem("password");
            }
        } else {
            document.getElementById("message-error").innerHTML = "Nombre de usuario o contraseña incorrectos.";
        }
    }
});

/*validación del input checkbox*/
document.addEventListener("DOMContentLoaded", () => {
    const savedUser = localStorage.getItem("username");
    const savedPass = localStorage.getItem("password");
    const isChecked = localStorage.getItem("check") === "true";

    if (savedUser && savedPass) {
        document.getElementById("username").value = savedUser;
        document.getElementById("password").value = savedPass;

        const check = document.getElementById("check");
        check.checked = isChecked;
    }
});
