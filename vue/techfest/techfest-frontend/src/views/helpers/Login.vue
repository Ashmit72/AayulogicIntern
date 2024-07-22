<template>
  <v-container fill-height style="transform: translateY(50%);" >
    <v-row justify="center" align="center">
      <v-col cols="12" md="4">
        <v-card title="Login">
          <v-card-text>
            <v-form @submit.prevent="login">
              <v-text-field
                v-model="loginInfo.email"
                label="Email"
                type="email"
                required
                variant="solo"
              ></v-text-field>

              <v-text-field
                v-model="loginInfo.password"
                label="Password"
                :type="showPassword ? 'text' : 'password'"
                required
                variant="solo"
              >
                <template v-slot:append>
                  <v-icon
                    @click="togglePasswordVisibility"
                    class="eye"
                    :icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                  />
                </template>
              </v-text-field>

              <v-btn type="submit" color="info" block> Login </v-btn>
              <div v-if="!matchCredentials" style="color: red; margin-top: 10px">
                Invalid email or password.
              </div>
            </v-form>
          </v-card-text>
        </v-card> 
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { api } from '@/api';
import axios from 'axios'
import Cookies from 'js-cookie'

export default {
  data() {
    return {
      loginInfo: {
        email: '',
        password: '',
      },
      showPassword: false,
      matchCredentials: true
    }
  },
  methods: {
    togglePasswordVisibility() {
      this.showPassword = !this.showPassword
    },
    async login() {
      try {
        const response = await axios.post(
          `${api()}/v1/login`,
          this.loginInfo
        )
        if (response.data.success) {
          const { token } = response.data
          Cookies.set('token', token)
          this.$router.push('/admin/dashboard')
        } else {
          this.matchCredentials = false
        }
      } catch (error) {
        console.error('Login error:', error.message)
        this.matchCredentials = false
      }
    }
  }
}
</script>

<style scoped>
.eye {
  cursor: pointer;
  position: absolute;
  z-index: 999;
right:2.5rem;
}
</style>
