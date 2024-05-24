 function parseJwt(accessToken,refreshToken){ 
   if (!accessToken && !refreshToken) {
    console.log("No tokens!");
    window.location.replace('http://127.0.0.1:5500/pages/login/index.html')
    return
  }
    const base64Url = accessToken.split(".")[1];
    const base64 = base64Url.replace("-", "+").replace("_", "/");
    const user =JSON.parse(window.atob(base64));
    return user.user_id;
  }

// async function getUserName(){
//   const accessToken=localStorage.getItem('access-token')
//   const refreshToken=localStorage.getItem('refresh-token')
//   const user=parseJwt(accessToken)
//   const response=await fetch(`http://192.168.1.158:8000/userinfo/?format=json&id=${user}`)
//   const {data}=await response.json()
//   const title=document.querySelector("#nav-title")
//   title.innerHTML=`Hello ${data.username}`
// }
// Function test
async function LogOut(){
  // const accessToken=localStorage.getItem('access-token')
  // const refreshToken=localStorage.getItem('refresh-token')
  try {
    const response=await fetch(`http://192.168.1.158:8000/logout`,{
      method:'POST',
      headers:{
        "Content-type": "application/json; charset=UTF-8",
        },
    })
    if (response.ok) {
      localStorage.removeItem("access-token")
      localStorage.removeItem("refresh-token")
      window.location.replace('http://127.0.0.1:5500/pages/login/index.html')
    }
    else{
      console.log("Something Went Wrong");
    }
  } catch (error) {
    console.log(error.message);
  }
}

const LogoutButton=document.querySelector("#logout-button")
LogoutButton.addEventListener('submit',async(event)=>{
  event.preventDefault()
  await LogOut()
})





// Function test


async function getData() {
  const accessToken=localStorage.getItem('access-token')
  const refreshToken=localStorage.getItem('refresh-token')
  const user=parseJwt(accessToken)
  // console.log(user);
  try {
    const response = await fetch(`http://192.168.1.158:8000/todo/?format=json&id=${user}`,{
      method:'GET',
      headers:{
        "Authorization":`Bearer ${accessToken}`,
        "Content-type": "application/json; charset=UTF-8",
        },
    });
    const { data, message, status } = await response.json();

    const items = document.querySelector(".items");
    items.innerHTML = "";
    if (!data || data.length === 0) {
      const li = document.createElement("li");
      li.classList.add("empty-item");
      li.innerHTML = `Start Adding to Your Lists Now`;
      items.appendChild(li);
      return;
    }
    data.forEach((todo) => {
      const li = document.createElement("li");
      li.classList.add("item");
      li.innerHTML = `
      <span id="item-icons" >
      <button class="deleteBtn" id="delete-${todo.url_id}">
          <i class="fa-solid fa-trash"></i>
      </button>
      <button class="editBtn" id="edit-${todo.url_id}" >
      <i class="fa-solid fa-pen-to-square"></i>
      </button>
      <input id="check-${todo.url_id}" value="${
todo.url_id
}" type="checkbox" ${todo.is_done ? "checked" : ""}>
  </span>
                <span id="title-${todo.url_id}" class="${
        todo.is_done ? "line-through" : ""
      }">
                  ${todo.title}
                </span>
            <span style="${todo.is_done?"text-decoration:line-through":""}" id="todo-description" >
            ${todo.description}
            <span/>
            `;

      li.querySelector(`#delete-${todo.url_id}`).addEventListener(
        "click",
        () => {
          deleteData(todo.url_id);
        }
      );
      li.querySelector(`#check-${todo.url_id}`).addEventListener(
        "change",
        () => {
          toggleTodoStatus(todo.url_id);
        }
      );

      //   Edit From

      li.querySelector(`#edit-${todo.url_id}`).addEventListener(
        "click",
        async () => {
          await openEditDialogForm(todo.url_id);
        }
      );

      
      items.appendChild(li);
    });
  } catch (e) {
    console.log(e.message);
  }
}


  const closeEditForm = document.querySelector("#cross-todo-patch");
  closeEditForm.addEventListener("click", () => {
    const dialogUpdateBox = document.querySelector("#dialog-box-patch");
    dialogUpdateBox.close();
  });

async function openEditDialogForm(id) {
  const { data, message, status } = await getSingleData(id);
  const { title, url_id, is_done, description } = data;
  const formTitle = document.querySelector("#todo-title-patch");
  const formDesc = document.querySelector("#todo-desc-patch");
  formTitle.value = title;
  formDesc.value = description;
  const dialogUpdateBox = document.querySelector("#dialog-box-patch");
  dialogUpdateBox.setAttribute("form_id",id)
  dialogUpdateBox.showModal();
}

async function editData(){
   event.preventDefault();
    const dialogUpdateBox = document.querySelector("#dialog-box-patch");
    let id = dialogUpdateBox.getAttribute("form_id")
    const title = document.querySelector("#todo-title-patch");
    const description = document.querySelector("#todo-desc-patch");
    const newTitle = title.value;
    const newDescription = description.value;
    console.log(newTitle,newDescription);
    // closeEditDialogForm()
    await editSingleData(id, newTitle, newDescription);
    await getData();
    dialogUpdateBox.close();
}

async function getSingleData(id) {
  const accessToken=localStorage.getItem('access-token')
  const refreshToken=localStorage.getItem('refresh-token')
  const user=parseJwt(accessToken)
  try {
    const response = await fetch(
      `http://192.168.1.158:8000/todo/?format=json&id=${user}&tid=${id}`,{
        headers:{
          "Authorization":`Bearer ${accessToken}`,
          "Content-type": "application/json; charset=UTF-8",
          },
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error.message);
  }
}

async function editSingleData(id, title, description) {
  const accessToken=localStorage.getItem('access-token')
  const refreshToken=localStorage.getItem('refresh-token')
  const user=parseJwt(accessToken)
  try {
    const response = await fetch(
      `http://192.168.1.158:8000/todo/?format=json&id=${id}`,
      {
        method: "PATCH",
        body: JSON.stringify({
          title,
          description,
        }),
        headers: {
          "Authorization":`Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );
    if (response.ok) {
      document.querySelector("#toast").style.display="flex"
      document.querySelector("#toast").innerHTML=`<i class="fa-solid fa-check"></i> Edited`
      setTimeout(() => {
        document.querySelector("#toast").style.display="none"
      }, "2000");
    }
    else{
      document.querySelector("#toast-error").style.display="flex"
      document.querySelector("#toast-error").innerHTML=`<i class="fa-solid fa-x"></i> Failed To Update`
      setTimeout(() => {
        document.querySelector("#toast-error").style.display="none"
      }, "2000");
    }
  } catch (error) {
    console.log(error.message);
  }
}

async function deleteData(id) {
  const accessToken=localStorage.getItem('access-token')
  const refreshToken=localStorage.getItem('refresh-token')
  const user=parseJwt(accessToken)
  try {
    const response = await fetch(
      `http://192.168.1.158:8000/todo/?format=json&id=${id}`,
      {
        method: "DELETE",
        headers: {
          "Authorization":`Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );
    if (response.ok) {
      document.querySelector("#toast").style.display="flex"
      document.querySelector("#toast").innerHTML=`<i class="fa-solid fa-check"></i> Deleted`
      setTimeout(() => {
        document.querySelector("#toast").style.display="none"
      }, "2000");
    }
    else{
      document.querySelector("#toast-error").style.display="flex"
      document.querySelector("#toast-error").innerHTML=`<i class="fa-solid fa-x"></i> Failed To Delete`
      setTimeout(() => {
        document.querySelector("#toast-error").style.display="none"
      }, "2000");
    }

    await getData();
  } catch (error) {
    console.log(error.message);
  }
}

async function postData(data) {
  const accessToken=localStorage.getItem('access-token')
  const refreshToken=localStorage.getItem('refresh-token')
  const user=parseJwt(accessToken)
  try {
    const response = await fetch(
      `http://192.168.1.158:8000/todo/?format=json`,
      {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Authorization":`Bearer ${accessToken}`,
          "Content-type": "application/json; charset=UTF-8",
        },
      }
    );
    if (response.ok) {
      document.querySelector("#toast").style.display="flex"
      document.querySelector("#toast").innerHTML=`<i class="fa-solid fa-check"></i> Created`
      setTimeout(() => {
        document.querySelector("#toast").style.display="none"
      }, "2000");
    }
    else{
      document.querySelector("#toast-error").style.display="flex"
      setTimeout(() => {
        document.querySelector("#toast-error").style.display="none"
      }, "2000");
    }
  } catch (error) {
    console.log(error.message);
  }
}

async function updateTaskStatus(id, status) {
  const accessToken=localStorage.getItem('access-token')
  const refreshToken=localStorage.getItem('refresh-token')
  const user=parseJwt(accessToken)
  try {
    const response = await fetch(
      `http://192.168.1.158:8000/todo/?format=json&id=${id}`,
      {
        method: "PATCH",
        body: JSON.stringify({
          is_done: status,
        }),
        headers: {
          "Authorization":`Bearer ${accessToken}`,
          "Content-type": "application/json; charset=UTF-8",
        },
      }
    );
    if (response.ok) {
      document.querySelector("#toast").style.display="flex"
      document.querySelector("#toast").innerHTML=`<i class="fa-solid fa-check"></i> Updated Status`
      setTimeout(() => {
        document.querySelector("#toast").style.display="none"
      }, "2000");
    }
  } catch (error) {
    console.log(error.message);
  }
}

const toggleTodoStatus = async (id) => {
  const todoTitle = document.querySelector(`#title-${id}`);
  const checkbox = document.querySelector(`#check-${id}`);
  await updateTaskStatus(id, checkbox.checked);
  if (checkbox.checked) {
    todoTitle.classList.add("line-through");
  } else {
    todoTitle.classList.remove("line-through");
  }
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

const CreateTodoForm = document.querySelector("#todo-form");

async function onFormSubmit(event) {
  const accessToken=localStorage.getItem('access-token')
  const refreshToken=localStorage.getItem('refresh-token')
  const user=parseJwt(accessToken)
  event.preventDefault();
  const data = new FormData(event.target);
  const dataObject = Object.fromEntries(data.entries());
  dataObject.user = user;
  await postData(dataObject);
  
  const title = document.querySelector("#todo-title");
  const description = document.querySelector("#todo-desc");
  title.value = "";
  description.value = "";
  dialogBox.close();
  body.style.opacity = "1";
  await getData();
}
CreateTodoForm.addEventListener("submit", onFormSubmit);

//  getUserName()
 getData();
