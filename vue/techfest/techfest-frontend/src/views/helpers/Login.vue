<script setup>
import { api } from '@/api';
import axios from 'axios';
import Cookies from 'js-cookie';
import { ref } from 'vue'
import { useRouter } from 'vue-router';
const router=useRouter()
const loginInfo = ref({
  email: '',
  password: ''
})
const showPassword = ref(false)
const matchCredentials = ref(true)
const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value
}

const login=async()=> {
      try {
        const response = await axios.post(`${api()}/v1/login`, loginInfo.value)
        if (response.data.success) {
          const { token } = response.data
          Cookies.set('token', token)
          router.push('/admin/dashboard')
        } else {
          matchCredentials.value = false
        }
      } catch (error) {
        console.error('Login error:', error.message)
        matchCredentials.value = false
      }
    }


</script>

<template>
  <v-container fill-height style="transform: translateY(50%)">
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

<style scoped>
.eye {
  cursor: pointer;
  position: absolute;
  z-index: 999;
  right: 2.5rem;
}
</style>
