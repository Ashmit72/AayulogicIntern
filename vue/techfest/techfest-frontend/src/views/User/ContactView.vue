<!-- <script>
import { api } from '@/api'
import axios from 'axios'
import Cookies from 'js-cookie'

export default {
  data() {
    return {
      contactData: {
        name: '',
        phone: null,
        email: '',
        subject: '',
        message: ''
      },
      config: {
        headers: {
          Authorization: `Bearer ${Cookies.get('token')}`
        }
      },
      rules: {
        name: [
          (v) => !!v || 'Name is required',
          (v) => (v && v.length <= 15) || 'Name must be less than 15 characters'
        ],
        email: [
          (v) => !!v || 'Email is required',
          (v) =>
          /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
          "E-mail must be valid"
          // (v) => (v && v.length <= 15) || 'Name must be less than 15 characters'
        ],
        subject: [
          (v) => !!v || 'Subject is required',
          (v) => (v && v.length <= 10) || 'Subject must be less than 10 characters'
        ],
        message: [
          (v) => !!v || 'Message is required',
          (v) => (v && v.length >= 15) || 'Message must be more than 15 characters'
        ],
        phone: [
          (v) => !!v || 'Phone number is required',
          (v)=> (v.length>=7 && v.length<=10) || "Number's length must be between 7 and 10",
          (v) =>  /^\(?([0-9]{3})\)?[-.●]?([0-9]{3})[-.●]?([0-9]{4})$/.test(v)
          || 'Phone number must be a valid number'
        ]
      }
    }
  },
  methods: {
    async handleFormSubmit() {
      const {valid}=await this.$refs.createContactForm.validate()
      if (valid) {
        try {
        const response = await axios.post(
          `${api()}/v1/contact-request/create`,
          this.contactData,
          this.config
        )
        if (response.data.success) {
          this.$toast.success('Message Submitted', {
            position: 'top-right'
          })
          this.$refs.createContactForm.reset()
        } else {
          this.$toast.error('Something Went Wrong', {
            position: 'top-right'
          })
        }
      } catch (error) {
        this.$toast.error(error.response?.data?.error || 'Failed to Submit Data', {
          position: 'top-right'
        })
      }
      }
    },

  }
}
</script> -->

<script setup>
import { api } from '@/api'
import axios from 'axios'
import Cookies from 'js-cookie';
import { ref } from 'vue'
import { useToast } from 'vue-toast-notification'
const contactData = ref({
  name: '',
  phone: null,
  email: '',
  subject: '',
  message: ''
})
const createContactForm=ref(null)
const toast = useToast()

const config = {
  headers: {
    Authorization: `Bearer ${Cookies.get('token')}`
  }
}

const rules = {
  name: [
    (v) => !!v || 'Name is required',
    (v) => (v && v.length <= 15) || 'Name must be less than 15 characters'
  ],
  email: [
    (v) => !!v || 'Email is required',
    (v) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
  ],
  subject: [
    (v) => !!v || 'Subject is required',
    (v) => (v && v.length <= 10) || 'Subject must be less than 10 characters'
  ],
  message: [
    (v) => !!v || 'Message is required',
    (v) => (v && v.length >= 15) || 'Message must be more than 15 characters'
  ],
  phone: [
    (v) => !!v || 'Phone number is required',
    (v) => (v.length >= 7 && v.length <= 10) || "Number's length must be between 7 and 10",
    (v) =>
      /^\(?([0-9]{3})\)?[-.●]?([0-9]{3})[-.●]?([0-9]{4})$/.test(v) ||
      'Phone number must be a valid number'
  ]
}

const handleFormSubmit = async () => {
  const { valid } = await createContactForm.value.validate()
  if (valid) {
    try {
      const response = await axios.post(`${api()}/v1/contact-request/create`, contactData.value, config)
      if (response.data.success) {
        toast.success('Message Submitted', {
          position: 'top-right'
        })
        createContactForm.value.reset()
      } else {
        toast.error('Something Went Wrong', {
          position: 'top-right'
        })
      }
    } catch (error) {
      toast.error(error.response?.data?.error || 'Failed to Submit Data', {
        position: 'top-right'
      })
    }
  }
}
</script>

<template>
  <v-container class="contact-container">
    <v-row>
      <v-col>
        <v-form ref="createContactForm" @submit.prevent="handleFormSubmit">
          <v-text-field
            v-model="contactData.name"
            label="Enter your name"
            variant="underlined"
            :rules="rules.name"
          ></v-text-field>
          <v-text-field
            v-model="contactData.phone"
            type="number"
            label="Enter your phone number"
            variant="underlined"
            :rules="rules.phone"
          ></v-text-field>
          <v-text-field
            v-model="contactData.email"
            type="email"
            label="Enter your email"
            variant="underlined"
            :rules="rules.email"
          ></v-text-field>
          <v-text-field
            :rules="rules.subject"
            v-model="contactData.subject"
            type="text"
            label="Enter your subject"
            variant="underlined"
          ></v-text-field>
          <v-textarea
            :rules="rules.message"
            v-model="contactData.message"
            label="Enter your message"
            variant="outlined"
          ></v-textarea>
          <v-btn @click="resetValidation" type="submit" color="success">Submit</v-btn>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.contact-container {
  max-width: 1000px;
  transform: translateY(100px);
}
</style>
