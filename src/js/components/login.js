document
  .getElementById("loginForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    const form = event.target;
    const email = form.email.value;
    const password = event.target.password.value;
    let user = {
      email,
      password,
    };

    const url = "http://localhost:8080/apiproyectofinal/usuarios";

    // Construir la URL con parámetros
    const params = new URLSearchParams(user).toString();
    const fullUrl = `${url}?${params}`;

    const response = await fetch(fullUrl, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      console.log("USUARIO LOGIADO CON EXITO");

      response.json().then((data) => {
        user = data;
        console.log(user);
        localStorage.setItem("user", JSON.stringify(user));
        alert("EXITOS AL LOGIARSE");

        //redireccionar al home
        window.location.href = "./home.html";
      });
      return;
    } else {
      console.error("Error al logearse usuario ...");
    }


    //si el usuario no existe o la password no coincide
    alert("No se encontro usuario registrado o la password no coicide!");
  });
