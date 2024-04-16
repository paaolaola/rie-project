/*interacción de las vistas*/
document.addEventListener("DOMContentLoaded", () => {
    let viewLogin = document.querySelectorAll(".viewLogin");
    let viewServices = document.querySelectorAll(".viewServices");
    let viewHome = document.querySelectorAll(".viewHome");

    viewLogin.forEach((btn) => {
        btn.addEventListener("click", () => {
            window.location.href = "/index.html";
        });
    });

    viewServices.forEach((btn) => {
        btn.addEventListener("click", () => {
            window.location.href = "/pages/servicios.html";
        });
    });

    viewHome.forEach((btn) => {
        btn.addEventListener("click", () => {
            window.location.href = "/pages/home.html";
        });
    });
});

/*método random para imágenes*/
const backgrounds = ["02.jpg", "03.jpg", "04.jpg", "05.jpg"];

function changeBackground() {
    let random = Math.floor(Math.random() * backgrounds.length);
    document.body.style.backgroundImage = `url('/public/img/${backgrounds[random]}')`;
}
/*para manipular cambio de fondo cada 5 segundos*/
window.onload = () => {
    changeBackground();
    setInterval(changeBackground, 5000);
};

/*evento del boton y preventdefault*/
document.getElementById("registForm").addEventListener("submit", (e) => {
    e.preventDefault(); /*impide recarga del form*/

    const user = document.getElementById("username").value;
    const pass = document.getElementById("password").value;
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;

    /*validación de los inputs*/
    if (user === "" || pass === "" || name === "" || email === "") {
        document.getElementById("message-error").innerHTML = "Por favor, completa todos los campos.";
    } else {
        /*validación caracteres pass*/
        let isUpperCase = false;
        let isNumber = false;

        pass.split("").forEach((character) => {
            if (character >= "A" && character <= "Z") {
                isUpperCase = true;
            } else if (!isNaN(parseInt(character))) {
                isNumber = true;
            }

            if (isUpperCase && isNumber) {
                return;
            }
        });

        if (pass.length <= 6 || !isUpperCase || !isNumber) {
            document.getElementById("message-error").innerHTML = "La contraseña debe tener 6 o más caracteres, al menos una mayúscula y un número.";
        } else {
            /*ver si el usuario ya está registrado*/
            if (localStorage.getItem(user) !== null) {
                document.getElementById("message-error").innerHTML = "El nombre de usuario ya está en uso.";
            } else {
                Swal.fire({
                    title: "¡Registro exitoso!",
                    icon: "success",
                    confirmButtonColor: "#00b4d8",
                    confirmButtonText: "OK",
                });

                /*setTime para redirir al index*/
                setTimeout(() => {
                    window.location.href = "/index.html";
                }, 1000);

                /*guardo datos en localStorage*/
                localStorage.setItem(user, pass);
                localStorage.setItem("name", name);
                localStorage.setItem("email", email);
            }
        }
    }
});
