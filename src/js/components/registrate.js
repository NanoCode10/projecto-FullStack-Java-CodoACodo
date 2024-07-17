const errorMessage = document.querySelector("#error-message");

document
  .getElementById("signupForm")
  .addEventListener("submit", async (event) => {
    event.preventDefault();

    const form = event.target;
    const nombre = form.name.value;
    const apellido = form.apellido.value;
    const email = form.email.value;
    const password = form.password.value;

    if (
      nombre.length === "" ||
      apellido === "" ||
      email === "" ||
      password.length < 8
    ) {
      errorMessage.textContent =
        "Todos los campos son obligatorios y la password de 8 carcteres minimo";
      return;
    }

    //guardar el usuario en la base de datos (LocalStorage)
    const user = {
      nombre,
      apellido,
      email,
      password,
    };

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const userExists = users.find((u) => u.email === email);

    if (userExists) {
      errorMessage.textContent = "El email ya esta registrado";
      return;
    }

    const url = "http://localhost:8080/apiproyectofinal/usuarios";

    const response = await fetch(url, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });

    if (response.ok) {
      console.log("USUARIO CREADO ...");

      //guardar el usuario en la base de datos (LocalStorage)
      users.push(user);
      localStorage.setItem("users", JSON.stringify(users));
      console.log(nombre, apellido, email, password);

      //redireccionar al home
      window.location.href = "./home.html";
    } else {
      console.error("Error al crear el usuario ...");
    }

    alert("Exitos!");
  });
