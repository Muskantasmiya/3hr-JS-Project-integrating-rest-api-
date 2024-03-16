document.addEventListener("DOMContentLoaded", function () {
  axios
    .get("https://crudcrud.com/api/dd68976479d4491fb879107cd956a417/candyshop")
    .then((response) => {
      response.data.forEach((obj) => {
        displayData(obj);
      });
    })
    .catch((error) => console.log(error));
});

const form = document.getElementById("form");
form.addEventListener("submit", function (event) {
  event.preventDefault();
  const candyname = document.getElementById("candyname").value;
  const desc = document.getElementById("candydesc").value;
  const price = document.getElementById("candyprice").value;
  const quantity = document.getElementById("quantity").value;

  const obj = {
    candyname: candyname,
    desc: desc,
    price: price,
    quantity: quantity,
  };

  axios
    .post(
      "https://crudcrud.com/api/dd68976479d4491fb879107cd956a417/candyshop",
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

function displayData(obj) {
  const li = document.createElement("li");
  li.setAttribute("data-id", obj._id);
  li.textContent = `${obj.candyname} - ${obj.desc} - ${obj.price} - ${obj.quantity}`;

  const buy1btn = document.createElement("button");
  buy1btn.textContent = "Buy 1";
  buy1btn.classList.add("buy-btn");

  const buy2btn = document.createElement("button");
  buy2btn.textContent = "Buy 2";
  buy2btn.classList.add("buy-btn");

  const buy3btn = document.createElement("button");
  buy3btn.textContent = "Buy 3";
  buy3btn.classList.add("buy-btn");

  const editbtn = document.createElement("button");
  editbtn.textContent = "Edit";
  editbtn.classList.add("edit-btn");

  const deletebtn = document.createElement("button");
  deletebtn.textContent = "Delete";
  deletebtn.classList.add("delete-btn");

  const userList = document.querySelector("#userList");
  userList.appendChild(li);

  // Event listeners for buy buttons
  function updatedQuantity(item_id, quantity) {
    axios
      .get(
        `https://crudcrud.com/api/dd68976479d4491fb879107cd956a417/candyshop/${obj._id}`
      )
      .then((response) => {
        const updatedQuantity = response.data.quantity - quantity;

        if (updatedQuantity >= 0) {
          axios
            .put(
              `https://crudcrud.com/api/dd68976479d4491fb879107cd956a417/candyshop/${obj._id}`,
              {
                candyname: obj.candyname,
                desc: obj.desc,
                price: obj.price,
                quantity: updatedQuantity,
              }
            )
            .then(() => {
              // Update the quantity in the UI
              li.textContent = `${obj.candyname} - ${obj.desc} - ${obj.price} - ${updatedQuantity}`;
              li.appendChild(buy1btn);
              li.appendChild(buy2btn);
              li.appendChild(buy3btn);
              li.appendChild(editbtn);
              li.appendChild(deletebtn);
            })
            .catch((error) => console.error("Update Error:", error));
        } else {
          alert("Insufficient quantity");
        }
      })
      .catch((error) => console.error("Fetch Error:", error));
  }
  buy1btn.addEventListener("click", function () {
    updatedQuantity(obj._id, 1);
  });

  buy2btn.addEventListener("click", function () {
    updatedQuantity(obj._id, 2);
  });

  buy3btn.addEventListener("click", function () {
    updatedQuantity(obj._id, 3);
  });

  // Event listener for edit button
  editbtn.addEventListener("click", function () {
    axios
      .delete(
        `https://crudcrud.com/api/dd68976479d4491fb879107cd956a417/candyshop/${obj._id}`
      )
      .then(() => {
        document.getElementById("candyname").value = obj.candyname;
        document.getElementById("candydesc").value = obj.desc;
        document.getElementById("candyprice").value = obj.price;
        document.getElementById("quantity").value = obj.quantity;
        li.remove();
      })
      .catch((error) => console.error("Delete Error:", error));
  });
  li.appendChild(buy1btn);
  li.appendChild(buy2btn);
  li.appendChild(buy3btn);
  li.appendChild(editbtn);
  li.appendChild(deletebtn);

  // Event listener for delete button
  deletebtn.addEventListener("click", function () {
    axios
      .delete(
        `https://crudcrud.com/api/dd68976479d4491fb879107cd956a417/candyshop/${obj._id}`
      )
      .then(() => {
        li.remove();
      })
      .catch((error) => console.error("Delete Error:", error));
  });
}
