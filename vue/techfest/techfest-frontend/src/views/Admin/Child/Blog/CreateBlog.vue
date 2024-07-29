<script setup>
import axios from 'axios'
import { api } from '@/api'
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import '@vueup/vue-quill/dist/vue-quill.bubble.css'
import { useAdminBlogStore } from '../../../../../store/admin/blog'
import { ref } from 'vue';
import { useRouter } from 'vue-router';


const blog = ref({
  title: '',
  slug: '',
  excerpt: '',
  content: '',
  image: null,
  status: ''
})

const valid = ref(false)
const createBlogForm = ref(null)
const router=useRouter()



const rules = {
  title: [
    v => !!v || 'Title is required',
    v => (v && v.length >= 10) || 'Title must be More than 10 characters'
  ],
  excerpt: [
    v => !!v || 'Excerpt is required',
    v => (v && v.length >= 10) || 'Excerpt must be more than 10 characters'
  ]
}

const blogStore=useAdminBlogStore()

// Submit form function
async function submitForm() {
  const { valid: formValid } = await createBlogForm.value.validate()

  if (formValid) {
    const form = new FormData()
    for (const key in blog.value) {
      form.append(key, blog[key])
    }

    try {
      console.log(blog)
      const response = await axios.post(`${api()}/v1/blog/create`, form, blogStore.config)
      if (response.data.success) {
        blog.value = response.data;
        router.push('/admin/blog')
      } else {
        console.log('Something Went Wrong!!')
      }
    } catch (error) {
      console.log(error.message)
    }
  }
}

// Set status and submit
function setStatus(status) {
  blog.value.status=status
  submitForm()
}
</script>
<template>
  <v-form v-model="valid" ref="createBlogForm" @submit.prevent="submitForm">
    <v-text-field v-model="blog.title" label="Enter Your Title" :rules="rules.title"></v-text-field>
    <v-text-field v-model="blog.excerpt" label="Enter Your Excerpt" :rules="rules.excerpt"></v-text-field>
    <v-file-input
      v-model="blog.image"
      density="compact"
      label="Featured Image"
      accept="image/*"
    ></v-file-input>
    <v-card class="container-content">
      <QuillEditor v-model:content="blog.content" theme="snow" contentType="html" />
    </v-card>
    <div class="buttons">
      <v-btn class="bg-success" type="submit" @click="setStatus('Draft')">Draft</v-btn>
      <v-btn class="bg-warning" type="submit" @click="setStatus('Published')">Publish</v-btn>
    </div>
  </v-form>
</template>


<style lang="scss">
.container-content {
  height: 450px;
}
.buttons {
  width: 100%;
  margin-top: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
}
</style>
