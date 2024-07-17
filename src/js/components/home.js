const user = JSON.parse(localStorage.getItem("user"));

const nombre = user.nombre;
const apellido = user.apellido;

console.log(user);
document.addEventListener("DOMContentLoaded", (event) => {
  const username = nombre + " " + apellido;
  document.getElementById(
    "username"
  ).innerHTML = `${username} <img src="../../data/icon/user_people.svg" alt="" width="30" height="25" class="d-inline-block align-text-top">`;
});
