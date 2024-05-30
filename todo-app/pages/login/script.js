const eyeShow=document.querySelector("#eyeShow")
const eyeSlash=document.querySelector("#eyeSlash")
eyeShow.addEventListener('click',()=>{
    const password=document.querySelector('#password')
    password.type="text"
    eyeShow.style.display="none"
    eyeSlash.style.display="inline"
})

eyeSlash.addEventListener('click',()=>{
    const password=document.querySelector('#password')
    password.type="password"
    eyeSlash.style.display="none"
    eyeShow.style.display="inline"
})


async function postLoginData(data){
    try {
    const response=await fetch(`http://192.168.1.158:8000/login/`,{
        method:'POST',
        headers:{
        "Content-type": "application/json; charset=UTF-8",
        },
        body:JSON.stringify(data)
    })
    if (response.ok) {
        const result= await response.json()
        const {data,message,token}=result
        const {access,refresh}=token
        localStorage.setItem("access-token",access)
        localStorage.setItem("refresh-token",access)
        window.location.replace('http://127.0.0.1:5501/pages/todo/index.html')
    }
    else{
        const data=await response.json()
        if (data?.email) {
            const message=data?.email[0]
            document.querySelector("#email-message").innerHTML=`${message}`
            document.querySelector("#email-message").style.display="block"
            
        }
        if (data?.password) {
            const message=data?.password[0]
            document.querySelector("#password-message").innerHTML=`${message}`
            document.querySelector("#password-message").style.display="block"
        }
    }
    } catch (error) {
       console.log(error);    
    }
    
}


const loginForm=document.querySelector("#login-form")
loginForm.addEventListener('submit',async(event)=>{
event.preventDefault()
const data=new FormData(event.target)
const dataObject=Object.fromEntries(data.entries())
await postLoginData(dataObject);
})