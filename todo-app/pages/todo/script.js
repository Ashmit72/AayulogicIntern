import { randomHsl } from "./color.js";




const accessToken=localStorage.getItem("access-token");
const refreshToken=localStorage.getItem("refresh-token");

if (!accessToken && !refreshToken) {
  window.location.replace('http://127.0.0.1:5501/pages/login/index.html')
}

const Photo=document.querySelector("#Photo")
Photo.addEventListener('click',()=>{
  const Bar=document.querySelector("#nav-box")
  Bar.style.display="block"
  const closeBar=document.querySelector(".fa-bars-staggered")
  closeBar.addEventListener('click',()=>{
    Bar.style.display="none"
  })
})


async function logOut() {
  try {
    const response = await fetch(`http://192.168.1.180:8000/logout`, {
      method: 'POST',
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });

    if (response.ok) {
      localStorage.removeItem("access-token");
      localStorage.removeItem("refresh-token");
      window.location.replace('http://127.0.0.1:5501/pages/login/index.html');
    } else {
      console.error("Logout failed!");
    }
  } catch (error) {
    console.log(error.message);
  }
}

const Logout=document.querySelector('.userLogout')
Logout.addEventListener('submit',async(event)=>{
event.preventDefault()
await logOut() 
})

function parseJwt(accessToken, refreshToken) {
  if (!accessToken && !refreshToken) {
    console.log("No tokens!");
    window.location.replace('http://127.0.0.1:5501/pages/login/index.html');
    return;
  }
  const base64Url = accessToken.split(".")[1];
  const base64 = base64Url.replace("-", "+").replace("_", "/");
  const user = JSON.parse(window.atob(base64));
  return user.user_id;
}

async function getUserName() {
  const accessToken = localStorage.getItem('access-token');
  const user = parseJwt(accessToken);
  if (!user) return;

  try {
    const response = await fetch(`http://192.168.1.180:8000/userinfo/?format=json&id=${user}`);
    const { data } = await response.json();
    const title = document.querySelector("#nav-title");
    const date = new Date();
    const hours = date.getHours();
    const status = hours < 12 ? "Good Morning" : (hours <= 18 ? "Good Afternoon" : "Good Night");

    title.innerHTML = `${status} ${data.username}`;

    const image = document.querySelector("#profile-img");
    if (data.profile_picture) {
      image.src = `http://192.168.1.180:8000${data.profile_picture}`;
    } else {
      image.alt = data.username[0].toUpperCase();
    }
  } catch (error) {
    console.error("Error fetching user info:", error);
  }
}



async function getData() {
  const accessToken = localStorage.getItem('access-token');
  const user = parseJwt(accessToken);
  if (!user) return;

  try {
    const response = await fetch(`http://192.168.1.180:8000/todo/?format=json&id=${user}`, {
      method: 'GET',
      headers: {
        "Authorization": `Bearer ${accessToken}`,
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    const { data } = await response.json();

    const items = document.querySelector(".items");
    items.innerHTML = "";
    if (!data || data.length === 0) {
      const li = document.createElement("li");
      li.classList.add("empty-item");
      li.innerHTML = "Start Adding to Your Lists Now";
      items.appendChild(li);
      return;
    }
    data.forEach((todo) => {
      const li = document.createElement("li");
      li.classList.add("item");
      li.style.backgroundColor=randomHsl()
      li.innerHTML = `
        <span id="item-icons">
          <button class="deleteBtn" id="delete-${todo.url_id}">
              <i class="fa-solid fa-trash"></i>
          </button>
          <button class="editBtn" id="edit-${todo.url_id}">
            <i class="fa-solid fa-pen-to-square"></i>
          </button>
          <input id="check-${todo.url_id}" value="${todo.url_id}" type="checkbox" ${todo.is_done ? "checked" : ""}>
        </span>
        <span id="title-${todo.url_id}" class="${todo.is_done ? "line-through" : ""}">
          ${todo.title}
        </span>
        <span style="${todo.is_done ? "text-decoration:line-through" : ""}" id="todo-description">
          ${todo.description}
        </span>
      `;

      li.querySelector(`#delete-${todo.url_id}`).addEventListener("click", () => deleteData(todo.url_id));
      li.querySelector(`#check-${todo.url_id}`).addEventListener("change", () => toggleTodoStatus(todo.url_id));
      li.querySelector(`#edit-${todo.url_id}`).addEventListener("click", () => openEditDialogForm(todo.url_id));

      items.appendChild(li);
    });
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

document.querySelector("#cross-todo-patch").addEventListener("click", () => {
  document.querySelector("#dialog-box-patch").close();
});

async function openEditDialogForm(id) {
  const { data } = await getSingleData(id);
  const { title, description } = data;
  document.querySelector("#todo-title-patch").value = title;
  document.querySelector("#todo-desc-patch").value = description;
  const dialogUpdateBox = document.querySelector("#dialog-box-patch");
  dialogUpdateBox.setAttribute("form_id", id);
  dialogUpdateBox.showModal();
}


const EditForm=document.querySelector("#todo-form-patch")
EditForm.addEventListener('submit',async(event)=>{
event.preventDefault()
await editData()
})

async function editData() {
  event.preventDefault();
  const dialogUpdateBox = document.querySelector("#dialog-box-patch");
  const id = dialogUpdateBox.getAttribute("form_id");
  const title = document.querySelector("#todo-title-patch").value;
  const description = document.querySelector("#todo-desc-patch").value;

  await editSingleData(id, title, description);
  await getData();
  dialogUpdateBox.close();
}

async function getSingleData(id) {
  const accessToken = localStorage.getItem('access-token');
  const user = parseJwt(accessToken);
  if (!user) return;

  try {
    const response = await fetch(`http://192.168.1.180:8000/todo/?format=json&id=${user}&tid=${id}`, {
      headers: {
        "Authorization": `Bearer ${accessToken}`,
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    return await response.json();
  } catch (error) {
    console.error("Error fetching single data:", error);
  }
}

async function editSingleData(id, title, description) {
  const accessToken = localStorage.getItem('access-token');
  const user = parseJwt(accessToken);
  if (!user) return;

  try {
    const response = await fetch(`http://192.168.1.180:8000/todo/?format=json&id=${id}`, {
      method: "PATCH",
      body: JSON.stringify({ title, description }),
      headers: {
        "Authorization": `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });
    const button = document.querySelectorAll(".submit-btn");
    button.disabled = true;
    if (response.ok) {
      showToast("Edited", "success");
      button.disabled = false;
    } else {
      showToast("Failed To Update", "error");
      button.disabled = false;
    }
  } catch (error) {
    console.error("Error editing single data:", error);
  }
}

async function deleteData(id) {
  const accessToken = localStorage.getItem('access-token');
  const user = parseJwt(accessToken);
  if (!user) return;

  try {
    const response = await fetch(`http://192.168.1.180:8000/todo/?format=json&id=${id}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      showToast("Deleted", "success");
    } else {
      showToast("Failed To Delete", "error");
    }

    await getData();
  } catch (error) {
    console.error("Error deleting data:", error);
  }
}

async function postData(data) {
  const accessToken = localStorage.getItem('access-token');
  const user = parseJwt(accessToken);
  if (!user) return;

  try {
    const response = await fetch(`http://192.168.1.180:8000/todo/?format=json`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Authorization": `Bearer ${accessToken}`,
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    const button = document.querySelectorAll(".submit-btn");
    button.disabled = true;
    if (response.ok) {
      showToast("Created", "success");
      button.disabled = false;
    } else {
      showToast("Failed To Create", "error");
      button.disabled = false;
    }
  } catch (error) {
    console.error("Error posting data:", error);
  }
}

async function updateTaskStatus(id, status) {
  const accessToken = localStorage.getItem('access-token');
  const user = parseJwt(accessToken);
  if (!user) return;

  try {
    const response = await fetch(`http://192.168.1.180:8000/todo/?format=json&id=${id}`, {
      method: "PATCH",
      body: JSON.stringify({ is_done: status }),
      headers: {
        "Authorization": `Bearer ${accessToken}`,
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    if (response.ok) {
      showToast("Updated Status", "success");
    }
  } catch (error) {
    console.error("Error updating task status:", error);
  }
}

const toggleTodoStatus = async (id) => {
  const todoTitle = document.querySelector(`#title-${id}`);
  const checkbox = document.querySelector(`#check-${id}`);
  await updateTaskStatus(id, checkbox.checked);
  todoTitle.classList.toggle("line-through", checkbox.checked);
  await getData();
};

const dialogBox = document.querySelector("#dialog-box");
const createBtn = document.querySelector("#createTodo-btn");
const closeTodo = document.querySelector("#cross-todo");
const body = document.querySelector("body");

createBtn.addEventListener("click", () => {
  dialogBox.showModal();
  body.style.transition = "0.5s ease-in";
  body.style.opacity = "0.15";
});

closeTodo.addEventListener("click", () => {
  dialogBox.close();
  body.style.transition = "0.5s ease-out";
  body.style.opacity = "1";
});

const createTodoForm = document.querySelector("#todo-form");

async function onFormSubmit(event) {
  event.preventDefault();
  const formData = new FormData(event.target);
  const data = Object.fromEntries(formData.entries());
  data.user = parseJwt(localStorage.getItem('access-token'));
console.log(data);
  await postData(data);
  document.querySelector("#todo-title").value = "";
  document.querySelector("#todo-desc").value = "";
  dialogBox.close();
  body.style.opacity = "1";
  await getData();
}

createTodoForm.addEventListener("submit", onFormSubmit);

function showToast(message, type) {
  const toast = document.querySelector(type === "success" ? "#toast" : "#toast-error");
  toast.style.display = "flex";
  toast.innerHTML = `<i class="fa-solid fa-${type === "success" ? "check" : "x"}"></i> ${message}`;
  setTimeout(() => {
    toast.style.display = "none";
  }, 2000);
}

getUserName();
getData();
