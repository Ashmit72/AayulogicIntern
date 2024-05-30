const ShowPassword=document.querySelector("#eye-show")
ShowPassword.addEventListener('click',()=>{
    const currentPassword=document.querySelector("#current-password")
    currentPassword.type="text"
    ShowPassword.style.display="none"
    const HidePassword=document.querySelector("#eye-slash")
    HidePassword.style.display="inline"
})
const HidePassword=document.querySelector("#eye-slash")
HidePassword.addEventListener('click',()=>{
    const currentPassword=document.querySelector("#current-password")
    currentPassword.type="password"
    HidePassword.style.display="none"
    ShowPassword.style.display="inline"
})
const ShowNewPassword=document.querySelector("#eye-show-2")
ShowNewPassword.addEventListener('click',()=>{
    const currentNewPassword=document.querySelector("#new-password")
    currentNewPassword.type="text"
    ShowNewPassword.style.display="none"
    const HideNewPassword=document.querySelector("#eye-slash-2");
    HideNewPassword.style.display="inline"
})
const HideNewPassword=document.querySelector("#eye-slash-2")
HideNewPassword.addEventListener('click',()=>{
    const currentNewPassword=document.querySelector("#new-password")
    currentNewPassword.type="password"
    HideNewPassword.style.display="none"
    ShowNewPassword.style.display="inline"
})

// Parse Token
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




async function getUserData(){
    const accessToken = localStorage.getItem('access-token');
  const user = parseJwt(accessToken);
//   console.log(user);
  if (!user) return;
try {
    const response= await fetch(`http://192.168.1.158:8000/userinfo/?format=json&id=${user}`)
    const {data}=await response.json()
    // console.log(data.profile_picture);
    // console.log(data.username[0].toUpperCase());
    if (response.ok) {
        console.log(data);
        const image=document.querySelector("#img") 
        data.profile_picture?image.src=`http://192.168.1.158:8000${data.profile_picture}`:image.alt=`${data.username}`[0].toUpperCase()
        const firstName=document.querySelector("#first-name-input")
        firstName.value=data.first_name
        const lastName=document.querySelector("#last-name-input")
        lastName.value=data.last_name
        const genderType=document.querySelector("#gender-type")
        genderType.innerHTML=`${data.gender}`
    }
    else{
        console.log("Something Went Wrong!");
    }
} catch (error) {
    console.log(error.message);
}
}




//Update gender 
const gender=document.querySelector("#gender").value
async function updateGenderById(user,gender){
    const data={
        user,
        gender
    }
    try {
        const response=await fetch(`http://192.168.1.158:8000/userinfo/?format=json&id=${user}`,{
            method:'PATCH',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
            body:JSON.stringify(data)
        })
        if (response.ok) {
            console.log("updated Gender!");
        }else{
            console.log("Something Went Wrong!");
        }
    } catch (error) {
        console.log(error.message);
    }
}

const genderForm=document.querySelector("#gender-form")
genderForm.addEventListener('submit',async(event)=>{
event.preventDefault()
const gender=document.querySelector("#gender").value
const accessToken=localStorage.getItem('access-token');
const refreshToken=localStorage.getItem('refresh-token');
const user_id=parseJwt(accessToken,refreshToken)
await updateGenderById(user_id,gender)
await getUserData()
})


// Update Firstname
async function updateFirstNameById(user,first_name){
    const data={
        user,
        first_name
    }
    try {
        const response=await fetch(`http://192.168.1.158:8000/userinfo/?format=json&id=${user}`,{
            method:'PATCH',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
            body:JSON.stringify(data)
        })
        if (response.ok) {
            console.log("Updated Firstname!");
        }
        else{
            console.log("Failed to update firstname!");
        }
    } catch (error) {
        console.log(error.message);
    }
}



const firstnameForm=document.querySelector("#firstname-form");
firstnameForm.addEventListener('submit',async(event)=>{
    event.preventDefault()
    const accessToken=localStorage.getItem('access-token');
    const refreshToken=localStorage.getItem('refresh-token');
    const user_id=parseJwt(accessToken,refreshToken)
    const first_name=document.querySelector("#first-name-input").value
    await updateFirstNameById(user_id,first_name)
    await getUserData()
})


//Update LastName
async function updateLastNameById(user,last_name){
    const data={
        user,
        last_name
    }
    try {
        const response=await fetch(`http://192.168.1.158:8000/userinfo/?format=json&id=${user}`,{
            method:'PATCH',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
            body:JSON.stringify(data)
        })
        if (response.ok) {
            console.log("Updated lastname!");
        }
        else{
            console.log("Failed to update lastname!");
        }
    } catch (error) {
        console.log(error.message);
    }
}


const lastnameForm=document.querySelector("#lastname-form")
lastnameForm.addEventListener('submit',async(event)=>{
event.preventDefault();
const accessToken=localStorage.getItem('access-token');
const refreshToken=localStorage.getItem('refresh-token');
const user_id=parseJwt(accessToken,refreshToken)
const last_name=document.querySelector("#last-name-input").value
await updateLastNameById(user_id,last_name)
await getUserData()
})


//Update Photo
async function updatePhotoById(form){
const accessToken=localStorage.getItem('access-token');
const refreshToken=localStorage.getItem('refresh-token');
const user_id=parseJwt(accessToken,refreshToken)

// const data={
//         user:user_id,
//         profile_picture:photo
//     }

form.append("user",user_id)

try {
    const response=await fetch(`http://192.168.1.158:8000/userinfo/?id=${user_id}`,{
    method:'PATCH',
    body:form,
    })
    if(response.ok){console.log("Photo Updated Sucessfully")}else{console.log("Failed to update Photo")}
} catch (error) {
    console.log(error.message);
}
}

const formPhoto=document.querySelector("#image-form")
formPhoto.addEventListener('submit',async(event)=>{
event.preventDefault()
const form =new FormData(event.target)
const photo=document.querySelector("#image-file")
console.log(photo.files[0])
const selectedPhoto=photo.files[0]
form.append("profile_picture",selectedPhoto)
await updatePhotoById(form)
await getUserData()
})



// Password Validation
async function getCurrentPassword(){
    const accessToken = localStorage.getItem('access-token');
  const user = parseJwt(accessToken);
  if (!user) return;
    try {
        const response=await fetch(`http://192.168.1.158:8000/userinfo/?format=json&id=${user}`)
        const {data}=await response.json()
        const {password}=data
        return password;
    } catch (error) {
        console.log(error.message);
    }
}

async function patchPasswordById(id,password,confirmPassword){
    const data={
        user:id,
        password,
        password2:confirmPassword
    }
  try {
    const response=await fetch(`http://192.168.1.158:8000/userinfo/?id=${id}`,{
        method:'PATCH',
        body:JSON.stringify(data),
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
    if (response.ok) {
        console.log("Password updated sucessfully");
    }else{
        console.log("Something Went Wrong")
    }
  } catch (error) {
    console.log(error.message);
  }
}

const newPassword=document.querySelector("#new-password-form")
newPassword.addEventListener('submit',async(event)=>{
event.preventDefault()
const accessToken=localStorage.getItem('access-token');
const refreshToken=localStorage.getItem('refresh-token');
const user_id=parseJwt(accessToken,refreshToken)
const newPasswordText=document.querySelector("#new-password").value
const confirmPasswordText=document.querySelector("#confirm-new-password").value
console.log(newPasswordText);
await patchPasswordById(user_id,newPasswordText,confirmPasswordText)
await getUserData()
})


getUserData()
getCurrentPassword()

