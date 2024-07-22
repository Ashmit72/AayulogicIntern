<script setup >
import { RouterLink } from 'vue-router';


</script>
<template>
    <nav class="nav-container" >
      <div class="logo">
         <RouterLink to="/" >
             <img src="../assets/images/logo.svg" alt="logo">
         </RouterLink>
      </div>
      <ul class="nav-items" >
        <li><RouterLink to="/" >Home</RouterLink></li>
        <!-- <li><RouterLink to="/register" >Register</RouterLink></li> -->
        <li><RouterLink to="/signIn" >Sign In</RouterLink></li>
      </ul>
    </nav>
</template>


<style lang="scss" scoped>

.nav-container{
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem;

    .nav-items{
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 2rem;
        list-style-type: none;

        a{
            text-decoration: none;
            color: inherit;

            &.router-link-active{
                color: #42b883;
                font-weight: bold;
            }
        }
    }
}

</style>
