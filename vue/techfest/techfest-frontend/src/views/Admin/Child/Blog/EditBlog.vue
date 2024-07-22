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
<script>
import { QuillEditor } from '@vueup/vue-quill'
import { api } from '@/api'
import axios from 'axios'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import '@vueup/vue-quill/dist/vue-quill.bubble.css'
import Cookies from 'js-cookie'

export default {
    components: {
    QuillEditor
  },
  
  data() {
    return {
      getSlug: '',
      blogData: {
        title: '',
        slug: '',
        excerpt: '',
        content: '',
        image: null,
        createBlogForm: null,
        valid: false
      },
      config:{
        headers:{
          'Authorization':`Bearer ${Cookies.get('token')}`
        }
      },
      rules:{
        title: [
        v => !!v || 'Title is required',
        v => (v && v.length >= 10) || 'Title must be more than 10 characters',
      ],
        excerpt: [
        v => !!v || 'Excerpt is required',
        v => (v && v.length >= 10) || 'Excerpt must be more than 10 characters',
      ]
      }
    }
  },
  methods: {
    async getSlugData() {
      try {
        const response = await axios.get(`${api()}/v1/blog?per_page=10&page=1`)
        if (response.data.blogs) {
          const blogSlug = response.data.blogs.find((blog) => blog.id === this.$route.params.id)
          if (blogSlug) {
            this.getSlug = blogSlug.slug
            this.getSingleSlug()
          } else {
            this.$toast.error('Blog Not Found', {
              position: 'top-right'
            })
          }
        }
      } catch (error) {
        this.$toast.success(error.message, {
              position: 'top-right'
            })
      }
    },
    async getSingleSlug() {
      try {
        const response = await axios.get(`${api()}/v1/blog/${this.getSlug}`)
        if (response.status === 200) {
          this.blogData.title=response.data.title
          this.blogData.slug=response.data.slug;
          this.blogData.status=response.data.status;
          this.blogData.content=response.data.content;
          this.blogData.excerpt=response.data.excerpt;
          this.blogData.image=response.data.featuredImage;

        }
      } catch (error) {
        this.$toast.success(error.message, {
              position: 'top-right'
            })
      }
    },
    async submitForm(){
      const { valid } = await this.$refs.createBlogForm.validate()

      const form = new FormData()
      for (const key in this.blogData) {
          form.append(key, this.blogData[key]);
        }


      if(valid){
        try {
          const response=await axios.patch(`${api()}/v1/blog/${this.$route.params.id}`,form,this.config)
          if (response.data.success) {
            console.log('Working');
            this.blogData.title=''
            this.blogData.content='',
            this.blogData.excerpt=''
            this.blogData.image=null
            this.$router.push('/admin/blog')
          }else{
            this.$toast.error('Something Went Wrong', {
              position: 'top-right'
            })
          }

        } catch (error) {
            this.$toast.error(error.message, {
              position: 'top-right'
            })
        }
      }
    },
    async handleDraftClick(event){
        event.preventDefault();
        try {
          this.blogData.status="Draft"
          console.log(this.blogData);
          const response=await axios.patch(`${api()}/v1/blog/${this.$route.params.id}`,this.blogData,this.config)
          response.data.success?
             this.$toast.success('Blog Updated', {
              position: 'top-right'
            })
          :this.$toast.error('Something Went Wrong', {
              position: 'top-right'
            });
          

        } catch (error) {
             this.$toast.error(error.message, {
              position: 'top-right'
            })
        }
    },
    async handlePublishClick(event){
        event.preventDefault();
        try {
          this.blogData.status="Published"
          console.log(this.blogData);
          const response=await axios.patch(`${api()}/v1/blog/${this.$route.params.id}`,this.blogData,this.config)
          response.data.success?
             this.$toast.success('Blog Updated', {
              position: 'top-right'
            })
          :this.$toast.error('Something Went Wrong', {
              position: 'top-right'
            });
          

        } catch (error) {
             this.$toast.error(error.message, {
              position: 'top-right'
            })
        }
    }
  },
  mounted() {
    this.getSlugData()
  }
}
</script>

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
