<script>
import { RouterLink } from 'vue-router';

export default {
  data() {
    return {
      darkmode: JSON.parse(localStorage.getItem('darkMode')) || false,
      showNav: true
    };
  },
  methods: {
    toggleDarkmode() {
      const body = document.querySelector('body');
      this.darkmode = !this.darkmode;
      localStorage.setItem('darkMode', this.darkmode);
      this.darkmode ? body.classList.add('dark-mode') : body.classList.remove('dark-mode');
    },
    toggleNav() {
      this.showNav = !this.showNav;
      console.log(this.showNav);
    }
  },
  mounted() {
    const body = document.querySelector('body');
    if (this.darkmode) {
      body.classList.add('dark-mode');
    }
  }
}
</script>

<template>
  <nav class="nav-container">
    <div class="logo">
      <RouterLink to="/">
        <img src="../assets/images/logo.svg" alt="Logo">
      </RouterLink>
    </div>
    <div @click="toggleDarkmode" id="mode">
      <template v-if="darkmode">
        <img src="../assets/images/sun.svg" alt="mode">
      </template>
      <template v-else>
        <img src="../assets/images/moon.svg" alt="mode">
      </template>
    </div>

    <ul class="nav-items" :class="{ 'hidden-nav': !showNav }">
      <li>
        <RouterLink to="/">Home</RouterLink>
      </li>
      <li>
        <RouterLink to="/about">About</RouterLink>
      </li>
      <li>
        <RouterLink to="/contact">Contact</RouterLink>
      </li>
      <li>
        <RouterLink to="/settings">Settings</RouterLink>
      </li>
    </ul>

    <div @click="toggleNav" id="bar">
      <img src="../assets/images/bar.svg" alt="bar">
    </div>
  </nav>
</template>

<style lang="scss" scoped>
.nav-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;

  .logo {
    height: 100px;
    width: 100px;

    img {
      height: 100%;
      width: 100%;
      object-fit: contain;
    }
  }

  #mode {
    height: 80px;
    width: 80px;

    img {
      height: 100%;
      width: 100%;
      object-fit: contain;
      transform: scale(0.5);
      cursor: pointer;
    }
  }

  .nav-items {
    list-style: none;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    font-size: 15px;

    @media screen and (max-width: 700px) {
      position: absolute;
      background: #36454f;
      border-radius: 12px;
      top: 6rem;
      width: 90%;
      padding: 1rem;
      left: 1rem;
      color: white;
      display: none;
      &.hidden-nav {
        display: flex;
      }
    }

    a {
      text-decoration: none;
      color: inherit;

      &.router-link-active {
        font-weight: bold;
        color: #82d0ad;
      }
    }
  }

  #bar {
    @media screen and (min-width: 700px) {
      display: none;
    }

    transform: scale(0.5);
    cursor: pointer;
  }
}
</style>
