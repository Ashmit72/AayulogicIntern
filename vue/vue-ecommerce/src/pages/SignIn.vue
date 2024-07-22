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
      <h2>Login</h2>
      <label for="username">Username</label>
      <input type="text" id="username" name="username" required>
      
      <div class="password-container">
        <label for="password">Password</label>
        <img v-if="showPassword" @click="showPassword=!showPassword" class="img-eye" src="../assets/images/eye.svg" alt="eye">
        <img v-else @click="showPassword=!showPassword" class="img-eye" src="../assets/images/cross-eye.svg" alt="eye">
        <input :type="showPassword?'text':'password'" id="password" name="password" required>
      </div>
      
      <button type="submit" >Submit</button>
      <p>Not Registered yet? <RouterLink to="/register" >Register</RouterLink></p>
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
    max-width:500px;
    height:500px;
    margin:0 auto;
    padding:1rem;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;

    .password-container{
      width: 100%;
      text-align: center;
       position: relative;
      label{
        margin-bottom: 1rem;
      }
      .img-eye{
       position: absolute;
       transform: scale(0.5);
       top:1rem;
       right: 0;
       cursor: pointer;
      }
    }

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
  }
 
}
</style>
