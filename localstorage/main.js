let addUserForm = document.querySelector(".add-user");
let editUserForm = document.querySelector(".edit-user");
let usersRow = document.querySelector(".users");
let editUserPopup = document.getElementById("edituser");
let eachId;
let uniqueId;

// Add Users
function addUser(id, firstname, lastname, email) {
  let tabledata = document.createElement("tr");
  tabledata.classList = "user-data";
  tabledata.setAttribute("data-id", id);
  let eachUserData = `
    <td class="sl-no">${id + 1}</td>
    <td class="user--firstname datasets">${firstname}</td>
    <td class="user--lastname datasets">${lastname}</td>
    <td class="user--email datasets">${email}</td>
    <td>
      <button
        class="btn btn-primary edit-btn"
        data-bs-toggle="modal"
        href="#edituser"
        role="button"
      >
        Edit
      </button>
    </td>
    <td><button class="btn btn-danger delete-btn">Delete</button></td>
  `;
  tabledata.innerHTML = eachUserData;
  usersRow.appendChild(tabledata);
}

// Inject edits in table
function editUser(editFirstName, editLastName, editEmail) {
  let editTable =
    document.getElementsByClassName("user-data")[parseInt(eachId)]
  editTable.getElementsByClassName("datasets")[0].innerText = editFirstName;
  editTable.getElementsByClassName("datasets")[1].innerText = editLastName;
  editTable.getElementsByClassName("datasets")[2].innerText = editEmail;

  let users;
  if (localStorage.getItem("Users") === null) {
    users = [];
  } else {
    users = JSON.parse(localStorage.getItem("Users"));
  }

  let modal = document.getElementById("edituser").getAttribute('data-id')
  
  users[modal].firstname=editFirstName
  users[modal].lastname=editLastName
  users[modal].email=editEmail
  
  localStorage.setItem("Users", JSON.stringify(users));
}

// Edit User button
usersRow.addEventListener("click", function (e) {
  if (e.target.classList[2] === "edit-btn") {
    let getUserData =
      e.target.parentElement.parentElement.getElementsByClassName("datasets");
    eachId = e.target.parentElement.parentElement.getAttribute("data-id");
    for (let index = 0; index < getUserData.length; index++) {
      document.getElementsByClassName("data-fieldset")[index].value =
        getUserData[index].innerHTML;
    }
    document.getElementById("edituser").setAttribute("data-id", eachId);
 
  }
  if (e.target.classList[2] === "delete-btn") {
    e.target.parentElement.parentElement.remove();
    countUsers();
    let users;
    if (localStorage.getItem("Users") === null) {
      users = [];
    } else {
      users = JSON.parse(localStorage.getItem("Users"));
    }

    let formattedIndex = e.target.parentElement.parentElement.getAttribute('data-id')
    var removeIndex = users.map(function (use,index) {
       return index; 
      })
      
    users.splice(removeIndex[formattedIndex], 1)
    localStorage.setItem("Users", JSON.stringify(users));
  }
});

editUserForm.addEventListener("submit", function (e) {
  e.preventDefault();
  let editFirstName = editUserPopup.querySelector(".fname").value;
  let editLastName = editUserPopup.querySelector(" .lname").value;
  let editEmail = editUserPopup.querySelector(".email").value;
  editUser(editFirstName, editLastName, editEmail);
  
});

// Add User
addUserForm.addEventListener("submit", function (e) {
  e.preventDefault();
  uniqueId = document.querySelectorAll(".user-data").length;
  let fName = document.querySelector(".add-user .fname").value;
  let lName = document.querySelector(".add-user .lname").value;
  let email = document.querySelector(".add-user .email").value;

  addUser(uniqueId, fName, lName, email);

  let userInfo = {
    id: uniqueId,
    firstname: fName,
    lastname: lName,
    email: email,
  };
  addUsertoLocal(userInfo);
  addUserForm.reset();
});

function countUsers() {
  document.querySelectorAll(".user-data").forEach(function (ele, index) {
    ele.querySelector(".sl-no").innerHTML = index + 1;
    document
      .querySelectorAll(".user-data")
    [index].setAttribute("data-id", index);
  });
}

// Updating to LocalStorage
function addUsertoLocal(user) {
  let users;
  if (localStorage.getItem("Users") === null) {
    users = [];
  } else {
    users = JSON.parse(localStorage.getItem("Users"));
  }

  users.push(user);
 
  localStorage.setItem("Users", JSON.stringify(users));
}

// Showing in DOM
document.addEventListener('DOMContentLoaded', () => {
  let users;
  if (localStorage.getItem("Users") === null) {
    users = [];
  } else {
    users = JSON.parse(localStorage.getItem("Users"));
  }
  localStorage.setItem("Users", JSON.stringify(users));
  users.forEach((eleUser, index) => {
    addUser(index, eleUser.firstname, eleUser.lastname, eleUser.email);
  })
})

// localStorage.clear();
