<script setup>
import { ref, onMounted } from 'vue'
import { QuillEditor } from '@vueup/vue-quill'
import { api } from '@/api'
import axios from 'axios'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import '@vueup/vue-quill/dist/vue-quill.bubble.css'
import Cookies from 'js-cookie'
import { useRoute, useRouter } from 'vue-router'
import { useToast } from 'vue-toast-notification' 

const blogData = ref({
  title: '',
  slug: '',
  excerpt: '',
  content: '',
  image: null,
  createBlogForm: null,
  valid: false
})

const createBlogForm=ref(null);

const config = {
  headers: {
    Authorization: `Bearer ${Cookies.get('token')}`
  }
}

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

const toast = useToast()
const route = useRoute()
const router = useRouter()

const getSlugData = async () => {
  try {
    const response = await axios.get(`${api()}/v1/blog?per_page=10&page=1`)
    if (response.data.blogs) {
      const blogSlug = response.data.blogs.find((blog) => blog.id === route.params.id)
      if (blogSlug) {
        blogData.value.slug = blogSlug.slug
        getSingleSlug()
      } else {
        toast.error('Blog Not Found', {
          position: 'top-right'
        })
      }
    }
  } catch (error) {
    toast.error(error.message, {
      position: 'top-right'
    })
  }
}

const getSingleSlug = async () => {
  try {
    const response = await axios.get(`${api()}/v1/blog/${blogData.value.slug}`)
    if (response.status === 200) {
      blogData.value.title = response.data.title
      blogData.value.slug = response.data.slug
      blogData.value.status = response.data.status
      blogData.value.content = response.data.content
      blogData.value.excerpt = response.data.excerpt
      blogData.value.image = response.data.featuredImage
    }
  } catch (error) {
    toast.error(error.message, {
      position: 'top-right'
    })
  }
}

const submitForm = async () => {
  const { valid } = await createBlogForm.value.validate()

  const form = new FormData()
  for (const key in blogData.value) {
    form.append(key, blogData.value[key])
  }

  if (valid) {
    try {
      const response = await axios.patch(
        `${api()}/v1/blog/${route.params.id}`,
        form,
        config
      )
      if (response.data.success) {
        console.log('Working')
        blogData.value.title = ''
        blogData.value.content = ''
        blogData.value.excerpt = ''
        blogData.value.image = null
        router.push('/admin/blog')
      } else {
        toast.error('Something Went Wrong', {
          position: 'top-right'
        })
      }
    } catch (error) {
      toast.error(error.message, {
        position: 'top-right'
      })
    }
  }
}

const handleDraftClick = async (event) => {
  event.preventDefault()
  try {
    blogData.value.status = 'Draft'
    const response = await axios.patch(
      `${api()}/v1/blog/${route.params.id}`,
      blogData.value,
      config
    )
    response.data.success
      ? toast.success('Blog Updated', {
          position: 'top-right'
        })
      : toast.error('Something Went Wrong', {
          position: 'top-right'
        })
  } catch (error) {
    toast.error(error.message, {
      position: 'top-right'
    })
  }
}

const handlePublishClick = async (event) => {
  event.preventDefault()
  try {
    blogData.value.status = 'Published'
    const response = await axios.patch(
      `${api()}/v1/blog/${route.params.id}`,
      blogData.value,
      config
    )
    response.data.success
      ? toast.success('Blog Updated', {
          position: 'top-right'
        })
      : toast.error('Something Went Wrong', {
          position: 'top-right'
        })
  } catch (error) {
    toast.error(error.message, {
      position: 'top-right'
    })
  }
}

onMounted(() => {
  getSlugData()
})
</script>


<template>
  <v-form v-model="valid" ref="createBlogForm" @submit.prevent="submitForm">
    <v-text-field
      v-model="blogData.title"
      label="Enter Your Title"
      :rules="rules.title"
    ></v-text-field>
    <v-text-field
      v-model="blogData.excerpt"
      label="Enter Your Excerpt"
      :rules="rules.excerpt"
    ></v-text-field>
    <v-file-input
      v-model="blogData.image"
      density="compact"
      label="Featured Image"
      accept="image/*"
    ></v-file-input>
    <v-card class="container-content">
      <QuillEditor v-model:content="blogData.content" theme="snow" contentType="html" />
    </v-card>
    <div class="buttons">
      <v-btn class="bg-success" type="submit" @click="blogData.status = 'Draft'">Draft</v-btn>
      <v-btn class="bg-warning" type="submit" @click="blogData.status = 'Published'">Publish</v-btn>
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
