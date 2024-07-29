import { api } from "@/api";
import axios from "axios";
import { defineStore } from "pinia";
import { ref } from "vue";
import { useRoute } from "vue-router";
import { useToast } from "vue-toast-notification";

export const useUserBlogStore = defineStore('blogUserState', () => {
    const toast = useToast()
    const route = useRoute()
    const blogData = ref({})
    const blogs = ref([])

    const getBlogData = async () => {
        try {
            const response = await axios.get(`${api()}/v1/frontend/blog/${route.params.slug}`)
            if (response.status === 200) {
                blogData.value = response.data
            } else {
                toast.error('Something went wrong', {
                    position: 'top-right'
                })
            }
        } catch (error) {
            toast.error(error.message, {
                position: 'top-right'
            })
        }
    }

    const getBlogsData = async () => {
        try {
            const response = await axios.get(`${api()}/v1/frontend/blog?per_page=10&page=1`)
            if (response.status === 200) {
                blogs.value = response.data.blogs
            }
        } catch (error) {
            toast.error(error.message, {
                position: 'top-right'
            })
        }
    }

    return {
        getBlogData,
        getBlogsData,
        blogData,
        blogs
    }
},
{
    persist:true
}
)
