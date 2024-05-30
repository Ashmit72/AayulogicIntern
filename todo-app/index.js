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
                // "Content-Type":"application/json"
            },
            body:data,

        })
        if (response.ok) {
            console.log(response);
            console.log("posted");
            window.location.replace('http://127.0.0.1:5501/pages/login/index.html')
        }
        else if(response.status===400){
            console.log("Passwords donot Match!");
        }
    } catch (error) {
        console.log(error.message);
    }
}


const form=document.querySelector("#form")
form.addEventListener('submit',async ()=>{
    await handleSubmit(event)
})

// const photo=document.querySelector("#photo")
//     const selectedPhoto=photo.files
//     console.log(selectedPhoto);


async function handleSubmit(event) {
    event.preventDefault();
    console.log(event.target,"event")
    const form=new FormData(event.target)
    // const photo=document.querySelector("#photo")
    // const selectedPhoto=photo.files[0]
    // console.log(selectedPhoto)
    // form.append("profile_picture",selectedPhoto)
    console.log(form);
    // const dataObject = Object.fromEntries(data.entries());
    // console.log(dataObject);
    await postData(form);
}