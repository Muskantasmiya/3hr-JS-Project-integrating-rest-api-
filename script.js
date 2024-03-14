document.addEventListener("DOMContentLoaded", function () {
  axios
    .get("https://crudcrud.com/api/412286eac03f41529886f1b3eee7a2ee/bookbus")
    .then((response) => {
      response.data.forEach((obj) => {
        displayData(obj);
      });
    })
    .catch((error) => console.log(error));
});

form.addEventListener("submit", function (event) {
  event.preventDefault();
  const usernameInput = document.getElementById("name").value;
  const emailInput = document.getElementById("email").value;
  const phoneInput = document.getElementById("phone").value;
  const busInput = document.getElementById("busid").value;

  const obj = {
    username: usernameInput,
    email: emailInput,
    phone: phoneInput,
    bus: busInput,
  };

  axios
    .post(
      "https://crudcrud.com/api/412286eac03f41529886f1b3eee7a2ee/bookbus",
      obj
    )
    .then((response) => {
      displayData(response.data);
      form.reset();
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});

document.getElementById("filter").addEventListener("change", function () {
  const selectedBus = this.value;
  const users = document.querySelectorAll("#userList li");

  users.forEach((user) => {
    if (selectedBus === "all" || user.textContent.includes(selectedBus)) {
      user.style.display = "block";
    } else {
      user.style.display = "none";
    }
  });
});

function displayData(obj) {
  const li = document.createElement("li");
  li.textContent = `${obj.username} - ${obj.email} - ${obj.phone} - ${obj.bus}`;

  const delbtn = document.createElement("button");
  delbtn.textContent = "Delete";
  delbtn.classList.add("delete");
  delbtn.style.marginLeft = "10px";
  delbtn.addEventListener("click", function () {
    axios
      .delete(
        `https://crudcrud.com/api/412286eac03f41529886f1b3eee7a2ee/bookbus/${obj._id}`
      )
      .then(() => {
        li.remove();
      })
      .catch((error) => console.error("Delete Error:", error));
  });

  const editbtn = document.createElement("button");
  editbtn.textContent = "Edit";
  editbtn.classList.add("edit");
  editbtn.addEventListener("click", function () {
    axios
      .delete(
        `https://crudcrud.com/api/412286eac03f41529886f1b3eee7a2ee/bookbus/${obj._id}`
      )
      .then(() => {
        document.getElementById("name").value = obj.username;
        document.getElementById("email").value = obj.email;
        document.getElementById("phone").value = obj.phone;
        document.getElementById("busid").value = obj.bus;
        li.remove();
      })
      .catch((error) => console.error("Delete Error:", error));
  });

  li.appendChild(delbtn);
  li.appendChild(editbtn);

  const userList = document.querySelector("ul");
  userList.appendChild(li);
}
