<template lang="">
  <v-form v-model="valid" ref="createBlogForm" @submit.prevent="submitForm">
    <v-text-field v-model="blogData.title" label="Enter Your Title" :rules="rules.title"></v-text-field>
    <v-text-field v-model="blogData.excerpt" label="Enter Your Excerpt" :rules="rules.excerpt"></v-text-field>
    <v-file-input
    v-model="blogData.image"
    density="compact"
    label="Featured Image"
    accept="image/*"
    ></v-file-input>
    <v-card class="container-content">
      <QuillEditor  v-model:content="blogData.content" theme="snow" contentType="html" />
    </v-card>
    <div class="buttons">
      <v-btn class="bg-success" type="submit" @click="blogData.status='Draft'">Draft</v-btn>
      <v-btn class="bg-warning" type="submit" @click="blogData.status='Published'">Publish</v-btn>
    </div>
  </v-form>
</template>

<script>
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import '@vueup/vue-quill/dist/vue-quill.bubble.css'
import axios from 'axios';
import { api } from '@/api';
import Cookies from 'js-cookie';

export default {
  components: {
    QuillEditor
  },
  data() {
    return {
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
        v => (v && v.length >= 10) || 'Title must be More than 10 characters',
      ],
        excerpt: [
        v => !!v || 'Excerpt is required',
        v => (v && v.length >= 10) || 'Excerpt must be more than 10 characters',
      ]
      }
    }
  },
  methods: {
    async submitForm(){
      const { valid } = await this.$refs.createBlogForm.validate()

      const form = new FormData()
      for (const key in this.blogData) {
          form.append(key, this.blogData[key]);
        }


      if(valid){
        try {
          console.log(this.blogData);
          const response=await axios.post(`${api()}/v1/blog/create`,form,this.config)
          if (response.data.success) {
            console.log('Working');
            this.blogData.title=''
            this.blogData.content='',
            this.blogData.excerpt=''
            this.blogData.image=null
            this.$router.push('/admin/blog')
          }else{
            console.log('Something Went Wrong!!');
          }

        } catch (error) {
          console.log(error.message);
        }
      }


    },
    async handleDraftClick(event){
        event.preventDefault();
        try {
          this.blogData.status="Draft"
          console.log(this.blogData);
          const response=await axios.post(`${api()}/v1/blog/create`,this.blogData,this.config)
          response.data.success?console.log('Data Posted'):console.log('Something Went Wrong!');
          

        } catch (error) {
          console.log(error.message);
        }
    },
    async handlePublishClick(event){
        event.preventDefault();
        try {
          this.blogData.status="Published"
          console.log(this.blogData);
          const response=await axios.post(`${api()}/v1/blog/create`,this.blogData,this.config)
          response.data.success?console.log('Data Posted'):console.log('Something Went Wrong!');
          

        } catch (error) {
          console.log(error.message);
        }
    }
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
