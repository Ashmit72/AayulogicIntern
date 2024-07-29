import { api } from "@/api"
import axios from "axios"
import Cookies from "js-cookie"
import { defineStore } from "pinia"
import { ref } from "vue"
import { useToast } from "vue-toast-notification"

export const useMessageAdminStore = defineStore('messageAdminStore', () => {
    const loading = ref(false)
    const toast = useToast()
    const pagination = ref({})
    const messageData = ref([])
    const config = {
        headers: {
            Authorization: `Bearer ${Cookies.get('token')}`
        }
    }

    const headers = [
        {
            align: 'start',
            key: 'name',
            sortable: false,
            title: 'Name'
        },
        {
            align: 'start',
            key: 'phone',
            sortable: false,
            title: 'Phone no'
        },
        {
            align: 'start',
            key: 'email',
            sortable: false,
            title: 'Sent By'
        },
        {
            align: 'start',
            key: 'subject',
            sortable: false,
            title: 'Subject'
        },
        {
            key: 'delete',
            title: 'Delete'
        },
        {
            key: 'view',
            title: 'View'
        }
    ]

    const getmessageData = async () => {
        try {
          loading.value = true
          const response = await axios.get(`${api()}/v1/contact-request`)
          if (response.data.requests) {
            messageData.value = response.data.requests
            pagination.value = response.data.pagination
          } else {
            console.log('Something Went Wrong')
          }
        } catch (error) {
          console.log(error.message)
        }
        loading.value = false
      }
      
      const handleDeleteMessageClick = async (id) => {
        try {
          const response = await axios.delete(`${api()}/v1/contact-request/${id}`, config)
          if (response.status === 200) {
            toast.success('Message Deleted', {
              position: 'top-right'
            })
            getmessageData()
          } else {
            toast.error('Message Failed to Delete!', {
              position: 'top-right'
            })
          }
        } catch (error) {
          toast.error(error.message, {
            position: 'top-right'
          })
        }
      }

      return{
        loading,
        toast,
        pagination,
        messageData,
        config,
        headers,
        getmessageData,
        handleDeleteMessageClick
      }

},
{
  persist:true
}
)