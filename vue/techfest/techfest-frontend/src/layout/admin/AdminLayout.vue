<template>
  <!-- <v-card> -->
  <v-app-bar class="app-bar" color="accent">
    <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

    <v-toolbar-title>Tech Fest</v-toolbar-title>

    <v-spacer></v-spacer>

    <template v-if="$vuetify.display.mdAndUp">
      <v-btn icon="mdi-magnify"></v-btn>
      <v-btn icon="mdi-filter"></v-btn>
    </template>
    <v-btn @click="logout">Logout</v-btn>
    <v-btn icon="mdi-dots-vertical"></v-btn>
  </v-app-bar>

  <v-navigation-drawer v-model="drawer" color="accent">
    <v-list>
      <v-list-item v-for="item in items" :key="item.value" :to="item.src" router>
        <v-list-item-content>
          <v-list-item-title
            ><v-icon style="margin-right: 1rem; transform: scale(0.8)" :icon="item.icon" />{{
              item.title
            }}</v-list-item-title
          >
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>

  <v-main>
    <v-container>
      <router-view />
    </v-container>
  </v-main>
</template>

<script>
import Cookies from 'js-cookie'

export default {
  methods: {
    logout() {
      Cookies.remove('token')
      this.$router.push('/login')
    }
  },
  data: () => ({
    drawer: true,
    items: [
      {
        title: 'Dashboard',
        value: 'dashboard',
        src: '/admin/dashboard',
        icon: 'mdi-monitor-dashboard'
      },
      {
        title: 'Blog',
        value: 'blog',
        src: '/admin/blog',
        icon: 'mdi-post'
      },
      {
        title: 'Event',
        value: 'event',
        src: '/admin/event',
        icon: 'mdi-calendar'
      },
      {
        title: 'FAQ',
        value: 'faq',
        src: '/admin/faq',
        icon: 'mdi-frequently-asked-questions'
      },
      {
        title: 'Level',
        value: 'level',
        src: '/admin/level',
        icon: 'mdi-chart-bar'
      },
      {
        title: 'Message',
        value: 'message',
        src: '/admin/message',
        icon: 'mdi-message'
      },
      {
        title: 'Privacy',
        value: 'privacy',
        src: '/admin/privacy',
        icon: 'mdi-vpn'
      },
      {
        title: 'Prize',
        value: 'prize',
        src: '/admin/prize',
        icon: 'mdi-license'
      },

      {
        title: 'Speaker',
        value: 'speaker',
        src: '/admin/speaker',
        icon: 'mdi-speaker-multiple'
      },
      {
        title: 'Role',
        value: 'role',
        src: '/admin/role',
        icon: 'mdi-account-filter'
      },
      {
        title: 'Sponsor',
        value: 'sponsor',
        src: '/admin/sponsor',
        icon: 'mdi-currency-usd'
      },
      {
        title: 'Term',
        value: 'term',
        src: '/admin/term',
        icon: 'mdi-console'
      },
      {
        title: 'Team',
        value: 'team',
        src: '/admin/team',
        icon: 'mdi-account-group'
      },

      {
        title: 'Workshop',
        value: 'workshop',
        src: '/admin/workshop',
        icon: 'mdi-store-settings'
      }
    ]
  }),

  watch: {
    group() {
      this.drawer = false
    }
  }
}
</script>

<style lang="scss" scoped>
.app-bar {
  background: black;
  color: white;
}
</style>
