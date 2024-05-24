
const errorMessage = document.querySelector("#error-message")

document
  .getElementById("signupForm")
  .addEventListener("submit", (event) => {
    event.preventDefault();


    const form = event.target
    const nombre = form.name.value
    const apellido = form.apellido.value
    const email = form.email.value
    const password = form.password.value

    if (nombre.length === "" || apellido === "" || email === "" || password.length < 8) {
      errorMessage("Todos los campos son obligatorios y la password de 8 carcteres minimo");
      return;
    
      return;
    }


    
    console.log(nombre, apellido, email, password);




    alert("Exitos!");
  });
 