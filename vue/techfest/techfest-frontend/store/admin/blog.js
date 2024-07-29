import { api } from "@/api";
import axios from "axios";
import Cookies from "js-cookie";
import { defineStore } from "pinia";
import { ref } from "vue";
import { useToast } from "vue-toast-notification";

export const useAdminBlogStore = defineStore('blogState', () => {
  const headers = [
    {
      align: 'start',
      key: 'image',
      sortable: false,
      title: 'Image'
    },
    {
      align: 'start',
      key: 'title',
      sortable: false,
      title: 'Title'
    },
    {
      align: 'start',
      key: 'createdAt',
      sortable: false,
      title: 'Created'
    },
    {
      align: 'start',
      key: 'updatedAt',
      sortable: false,
      title: 'Updated'
    },
    {
      align: 'start',
      key: 'status',
      sortable: false,
      title: 'Status'
    },
    {
      key: 'edit',
      title: 'Edit'
    },
    {
      key: 'delete',
      title: 'Delete'
    }
  ]
  const loading = ref(false)
  const blogData = ref([])
  const pagination = ref({})
  const toast = useToast()

  const config = {
    headers: {
      Authorization: `Bearer ${Cookies.get('token')}`
    }
  }

  async function getBlogData() {
    try {
      loading.value = true
      const response = await axios.get(`${api()}/v1/blog/?per_page=10&page=1`)
      if (response.data.blogs) {
        blogData.value = response.data.blogs
        pagination.value = response.data.pagination
      } else {
        console.log('Something Went Wrong')
      }
    } catch (error) {
      console.log(error.message)
    } finally {
      loading.value = false
    }
  }

  async function handleDeleteBlogClick(id) {
    try {
      const response = await axios.delete(`${api()}/v1/blog/${id}`, config)
      if (response.status === 200) {
        toast.success('Blog Deleted', { position: 'top-right' })
        getBlogData()
      } else {
        toast.error('Blog Failed to Delete!', { position: 'top-right' })
      }
    } catch (error) {
      toast.error(error.message, { position: 'top-right' })
    }
  }
  return {
    loading,
    blogData,
    headers,
    pagination,
    getBlogData,
    handleDeleteBlogClick,
  }

},
{
  persist:true
}
)