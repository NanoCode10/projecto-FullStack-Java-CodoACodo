document
  .getElementById("loginForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    // Aquí puedes agregar tu lógica para verificar las credenciales de inicio de sesión
    // y realizar las acciones necesarias
    console.log("Iniciar Sesión");
    alert("Exitos!");
  });

document
  .getElementById("signupForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    // Aquí puedes agregar tu lógica para registrar un nuevo usuario
    // y realizar las acciones necesarias
    console.log("Registrarse");
    alert("Exitos!");
  });
