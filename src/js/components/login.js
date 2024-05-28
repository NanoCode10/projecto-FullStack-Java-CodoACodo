document
  .getElementById("loginForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
   
    const form = event.target
    console.log(form)
    const email = form.email.value;
    const password = event.target.password.value
    let user = {
      email,
      password,
    };
    
    //verificar si el usuer y la password existen en localStorage
    let users = JSON.parse(localStorage.getItem("users"));
    
    for (let i = 0; i < users.length; i++) {
      if (users[i].email === user.email && users[i].password === user.password) {
        

         //redireccionar al home
        window.location.href = "./home.html";

        return;
      }}


   //si el usuario no existe o la password no coincide
    alert("No se encontro usuario registrado o la password no coicide!");
  });

