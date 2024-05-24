const show=document.querySelector("#show-icon")
const hide=document.querySelector("#hide-icon")

show.addEventListener('click',()=>{
    document.querySelector("#show-icon").style.display="none"
    document.querySelector("#hide-icon").style.display="inline"
    document.querySelector("#password-input").type="text"
})

hide.addEventListener('click',()=>{
    document.querySelector("#hide-icon").style.display="none"
    document.querySelector("#show-icon").style.display="inline"
    document.querySelector("#password-input").type="password"
})


async function postData(data){
    try{
        const response=await fetch(`http://192.168.1.158:8000/register`,{
            method:'POST',
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(data),

        })
        if (response.ok) {
            console.log("posted");
            window.location.replace('http://127.0.0.1:5500/pages/todo/index.html')
        }
        else{
            console.log("Failed to post!");
        }
    } catch (error) {
        console.log(error.message);
    }
}


const form=document.querySelector("#form")
form.addEventListener('submit',async ()=>{
    await handleSubmit(event)
})

async function handleSubmit(event) {
    event.preventDefault();
    const data=new FormData(event.target)
    const dataObject = Object.fromEntries(data.entries());
    console.log(dataObject);
    await postData(dataObject);
}