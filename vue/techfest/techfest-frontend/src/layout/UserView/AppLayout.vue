<template>
  <v-app>
    <v-app-bar
      class="position-fixed border"
      rounded="pill"
      height="80"
      
      color="rgba(var(--v-theme-surface),0.8)"
      style="
        backdrop-filter: blur(4px);
        width: 96%;
        left: 50%;
        top: 7px;
        transform: translateX(-50%);
      "
    >
      <v-container>
        <v-row align="center">
          <v-btn :ripple="false" color="transparent" variant="text" rounded="0" height="70" to="/">
            <v-img width="120" src="/logo-min.png" alt="Logo"></v-img>
          </v-btn>
          <v-spacer></v-spacer>
          <div class="hidden-md-and-down">
            <v-btn
              v-for="link in navLinks"
              :key="link.to"
              :color="link.color"
              :height="link.height"
              :variant="link.variant"
              :rounded="link.rounded"
              :to="link.to"
            >
              {{ link.label }}
            </v-btn>
            <v-menu open-on-hover>
              <template v-slot:activator="{ props }">
                <v-btn color="primary" height="50" rounded="lg" variant="text" v-bind="props">
                  More
                  <v-icon icon="mdi-menu-down" end></v-icon>
                </v-btn>
              </template>
              <v-list class="bg-grey-lighten-3">
                <v-list-item v-for="link in moreLinks" :key="link.to" :to="link.to" link>
                  <v-list-item-title>{{ link.label }}</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </div>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            height="50"
            rounded="lg"
            @click="toggleTheme"
            aria-label="Toggle Theme"
          >
            <v-icon :icon="isDarkMode ? 'mdi-weather-night' : 'mdi-weather-sunny'"></v-icon>
          </v-btn>
          <v-app-bar-nav-icon
            class="hidden-lg-and-up"
            color="primary"
            rounded="lg"
            @click.stop="drawer = !drawer"
            aria-label="Open Drawer"
          ></v-app-bar-nav-icon>
        </v-row>
      </v-container>
    </v-app-bar>

    <!-- Navigation drawer -->
    <v-navigation-drawer v-model="drawer" temporary :location="'right'">
      <v-list class="mb-4" density="compact" nav>
        <v-list-item
          v-for="item in drawerItems"
          :key="item.value"
          :prepend-icon="item.icon"
          :title="item.title"
          :to="item.to"
          link
        ></v-list-item>
        <v-divider v-for="(item, index) in drawerItems" :key="index"></v-divider>
      </v-list>
      <v-list-item class="mob-login">
        <v-btn @click="handleAuth" color="info">{{ isAuth ? 'Logout' : 'Login' }}</v-btn>
      </v-list-item>
    </v-navigation-drawer>

    <v-main>
      <v-container>
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import Cookies from 'js-cookie';
import isAuthenticated from '@/utils';
import { useTheme } from 'vuetify/lib/framework.mjs';

const drawer = ref(false);
const isDarkMode = ref(false);
const theme = useTheme();

const isAuth = computed(() => isAuthenticated());

const moreLinks = [
  { to: '/teams', label: 'Teams' },
  { to: '/workshops', label: 'Workshops' },
  { to: '/terms', label: 'Terms' },
  { to: '/policies', label: 'Policies' },
  { to: '/faq', label: 'FAQ' }
];

const navLinks = [
  { to: '/blog', label: 'Blogs', color: 'primary', height: '50', variant: 'text', rounded: 'lg' },
  { to: '/events', label: 'Events', color: 'primary', height: '50', variant: 'text', rounded: 'lg' },
  { to: '/contact', label: 'Contact Us', color: 'primary', height: '50', variant: 'text', rounded: 'lg' }
];

const drawerItems = [
  { icon: 'mdi-forum', title: 'Blogs', value: 'blogs', to: '/blog' },
  { icon: 'mdi-calendar-clock', title: 'Events', value: 'events', to: '/events' },
  { icon: 'mdi-frequently-asked-questions', title: 'FAQ', value: 'faq', to: '/faq' },
  { icon: 'mdi-information', title: 'Policies', value: 'policies', to: '/policies' },
  { icon: 'mdi-domain', title: 'Workshops', value: 'workshops', to: '/workshops' },
  { icon: 'mdi-account-multiple', title: 'Teams', value: 'teams', to: '/teams' },
  { icon: 'mdi-hvac', title: 'Terms', value: 'terms', to: '/terms' },
];

const router = useRouter();

onMounted(() => {
  const darkModeSetting = localStorage.getItem('dark_mode');
  isDarkMode.value = darkModeSetting === 'true';
  theme.global.name.value = isDarkMode.value ? 'dark' : 'light';
});

const toggleTheme = () => {
  isDarkMode.value = !isDarkMode.value;
  localStorage.setItem('dark_mode', isDarkMode.value);
  theme.global.name.value = isDarkMode.value ? 'dark' : 'light';
};

const handleAuth = () => {
  if (isAuth.value) {
    Cookies.remove('token');
    window.location.reload();
  } else {
    router.push('/login');
  }
};
</script>

<style scoped lang="scss">
.mob-login {
  display: flex;
  align-items: center;
  justify-content: center;
}

.nav-container {
  display: flex;
  align-items: center;
  justify-content: space-between;

  .icon {
    cursor: pointer;
  }

  .bar-title {
    a {
      text-decoration: none;
      color: inherit;
    }
  }
}

.nav-container .nav-items {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;

  @media screen and (max-width: 800px) {
    display: none;
  }

  a {
    text-decoration: none;
    color: inherit;

    &.router-link-active {
      color: green;
    }
  }
}

@media screen and (min-width: 800px) {
  .nav-container .bar {
    display: none;
  }
}

.icon {
  cursor: pointer;
}
</style>
