<template>
  <div class="login-container">
    <!-- <h1>This is Login Page</h1>
    <button @click="openDialogue = !openDialogue">Toggle</button> -->

    <!-- <Teleport to="body" >
      <template v-if="openDialogue">
        <dialog class="dialogBox" open>I am dialog</dialog>
      </template>
    </Teleport> -->
    <form class="form-container" >
      <h2>Register</h2>
      <label for="username">Fullname</label>
      <input type="text" id="username" name="username" required>
      
      <label for="email">Email</label>
      <input type="text" id="email" name="email" required>
      
      <div class="image-container" >
        <label for="password">Password</label>
        <input :type="showPassword?'text':'password'" id="password" name="password" required>
        <img v-if="showPassword" @click="showPassword=!showPassword" class="image-eye" src="../assets/images/eye.svg" alt="eye">
        <img v-else @click="showPassword=!showPassword" class="image-eye" src="../assets/images/cross-eye.svg" alt="eye">
      </div>
      
      <div class="image-container">
        <label for="password">Confirm Password</label>
        <input :type="showPassword?'text':'password'" id="password" name="password" required>
        <img v-if="showPassword" @click="showPassword=!showPassword" class="image-eye" src="../assets/images/eye.svg" alt="eye">
        <img v-else @click="showPassword=!showPassword" class="image-eye" src="../assets/images/cross-eye.svg" alt="eye">
      </div>
      
      <button type="submit" >Register</button>
      <p>Already Registered? Click to <RouterLink to="/signin" >Login</RouterLink></p>
    </form>
  </div>
</template>

<script>
import {RouterLink} from "vue-router"
export default {
  data() {
    return {
      showPassword:false
    };
  },
};
</script>

<style lang="scss" scoped>
.login-container {
  padding: 1rem;
 
  .form-container{
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:space-evenly;
    // background:magenta;
    max-width:500px;
    height:700px;
    margin:0 auto;
    padding:1rem;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;

    input{
      width:100%;
      border:1px solid #d7dbe1;
      height:50px;
      padding:1rem;
      border-radius:8px;

      &:focus{
        outline:none;
      }
    }
    button{
      cursor:pointer;
      height:40px;
      width:100px;
      background:blue;
      color:white;
      font-weight:bold;
      border:none;
      border-radius:4px;

      &:hover{
        opacity:0.7;
      }
    }
    p {
      a{
        text-decoration:none;
      }
    }

    .image-container{
      width: 100%;
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
         
      .image-eye{
        position: absolute;
        transform: scale(0.3);
        z-index: 1;
        right: 0;
        top: 1rem;
        cursor: pointer;
      }
    }
  }
 
}
</style>
