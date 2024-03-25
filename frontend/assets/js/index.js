//DECLARACION DE VARIABLES
//LEGACY - OLD
//var pageTitle = "Example Page";
let pageTitle = "Example Page - Hello World";
//Mostrar (Imprimir) en consola del navegador
console.log(pageTitle);
//concatenar texto
//pageTitle = pageTitle + " - " + " By Ivan";
pageTitle = `${pageTitle} - By Ivan`;

document.getElementById("pageTitle").innerText = pageTitle;

//Variables constantes
const copyright = 2024;
document.getElementById("copyright").innerText = copyright;

//OPERACIONES MATEMATICAS
let number1 = 10;
let number2 = 4.5;
let total = number1 + number2;
console.log(`La suma total de ${number1} mas ${number2} es igual a: ${total}`);
let totalMult = number1 * number2;
console.log(`la multiplicación es: ${totalMult.toFixed(2)}`);
let totalDivided = number1 / number2;
console.log(`la division es: ${totalDivided.toFixed(2)}`);

//RECOGIDA DE INFORMACION DESDE FORMULARIOS
//FUNCIONES
//GUARDAR REGISTER FORM

//CREACION DE ARRAYS
let users = [];
const url_api = "https://localhost:7190/api/User";
let isSearch = false;
let textSearch = "";

function initial() {
  let url = "";
  if (isSearch) {
    users = [];
    document.getElementById("users-table").innerHTML = "";
    url = `${url_api}/Search?textSearch=${textSearch}`;
  } else {
    url = url_api;
  }
  fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      users = data.payload;
      if (data.code == "1") {
        //encabezado de la tabla html
        let table = `<table class="table table-bordered">
                      <thead>
                        <tr>
                          <th>Id</th>
                          <th>First Name</th>
                          <th>Last Name</th>
                          <th>Email</th>
                          <th>Telephone</th>
                          <th>Address</th>
                          <th>Opciones</th>
                        </tr>
                      </thead>`;
        //cuerpo de la table
        table += `<tbody>`;
        //Recorremos la lista de usuarios
        let i = 0;
        for (const item of users) {
          table += `<tr>
                      <td>${item.id}</td>
                      <td>${item.firstName}</td>
                      <td>${item.lastName}</td>
                      <td>${item.email}</td>
                      <td>${item.telephone}</td>
                      <td>${item.address}</td>
                      <td>
                        <button type="button" class="btn btn-outline-warning btn-sm" title="Editar" onclick="edit(${i})">
                          <i class="fa-solid fa-pencil"></i>
                        </button>
                        <button type="button" class="btn btn-outline-danger btn-sm" title="Eliminar" onclick="askToDelete(${i})">
                          <i class="fa-solid fa-trash"></i>
                        </button>
                      </td>
                    </tr>`;
          //incrementar el conteo
          i++;
        }
        table += `</tbody></table>`;
        //dibujamos la tabla html en nuestra pgina
        document.getElementById("users-table").innerHTML = table;
      }
    });
}
//ejecutamos la funcion al iniciar la pagina
initial();

//IDENTIFICAR OPERACIONAS: 1 -> Insertar, 2 -> Editar
let tipo = 1;
let userId = 0;

function edit(index) {
  let user = users[index];
  userId = user.id;
  //OBTENER UN USUARIO POR EL ID
  fetch(`${url_api}/${user.id}`)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      if (data.code == "1") {
        let payload = data.payload;
        document.getElementById("firstName").value = payload.firstName;
        document.getElementById("lastName").value = payload.lastName;
        document.getElementById("email").value = payload.email;
        document.getElementById("telephone").value = payload.telephone;
        document.getElementById("address").value = payload.address;
        document.getElementById("div_pwd").style.display = "none";
      }
    });

  tipo = 2;
}

function save() {
  console.log(tipo);
  let firstName = document.getElementById("firstName").value;
  //FORMA CONDICIONAL SI ENTONCES
  if (firstName.length < 3) {
    alert("Debe de ingresar el primer nombre con al menos tres carácteres");
    return;
  }
  let lastName = document.getElementById("lastName").value;
  let email = document.getElementById("email").value;
  let password = tipo == 1 ? document.getElementById("password").value : "";
  let telephone = document.getElementById("telephone").value;
  if (telephone.length < 10) {
    alert("Debe de ingresar un número de teléfono valido!");
    return;
  }
  let address = document.getElementById("address").value;

  //CREAR UN OBJETO USUARIO
  //let user = {};
  let user = {
    id: userId,
    firstName,
    lastName,
    email,
    password,
    telephone,
    address,
  };

  let url = "",
    method = "";

  switch (tipo) {
    case 2:
      url = `${url_api}/${userId}`;
      method = "PUT";
      break;
    default:
      url = url_api;
      method = "POST";
      break;
  }

  fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(
          "Network response was not ok. Status code: " + response.status
        );
      }
      return response.json();
    })
    .then((data) => {
      if (data.code == "1") {
        initial();
        toastr.success(data.message);
        document.getElementById("div_pwd").style.display = "";
      }
    })
    .catch((error) => {
      console.log(error);
    });

  //AÑADIMOS EL OBJECTO AL ARRAY
  //users.push(user);
  // console.log(users);
  //Mostrar el primer usuario de la lista
  //console.log(users[0]);
  //Reseteamos el objeto
  user = {};

  //funcion para limpiar los campos del formulario
  clearForm();
}

function clearForm() {
  //llenamos los inputs con valores vacios
  document.getElementById("firstName").value = "";
  document.getElementById("lastName").value = "";
  document.getElementById("email").value = "";
  document.getElementById("password").value = "";
  document.getElementById("telephone").value = "";
  document.getElementById("address").value = "";
}

async function askToDelete(index) {
  let user = users[index];
  let { isConfirmed } = await swal.fire({
    title: "Advertencia",
    icon: "warning",
    text: `Esta seguro de eliminar este registro del usuario ${user.firstName}?`,
    confirmButtonText: "Si",
    showCancelButton: true,
    cancelButtonText: "No",
  });
  if (isConfirmed) {
    fetch(`${url_api}/${user.id}`, {
      method: "DELETE",
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.code == "1") {
          initial();
          //users.splice(index, 1);
          toastr.success(data.message);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
}

function search() {
  textSearch = document.getElementById("textSearch").value;
  if (!textSearch) {
    toastr.warning("Caracteres no permitidos");
    return;
  }
  if (textSearch.length < 3) {
    toastr.warning("Debe ingresar al menos tres caracteres de busqueda");
    return;
  }
  isSearch = true;
  initial();
}
function clearSearch() {
  isSearch = false;
  document.getElementById("textSearch").value = "";
  initial();
}
