import { api } from "@/api";
import axios from "axios";
import Cookies from "js-cookie";
import { defineStore } from "pinia";
import { ref } from "vue";
import { useToast } from "vue-toast-notification";

export const useAdminPrizeStore = defineStore('prizeStore', () => {
    const loading = ref(false)
    const pagination = ref({})
    const prizeData = ref([])
    const config = {
        headers: {
            Authorization: `Bearer ${Cookies.get('token')}`
        }
    }
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
            title: 'Prize'
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

    const toast = useToast()

    const getPrizeData = async () => {
        try {
          loading.value = true
          const response = await axios.get(`${api()}/v1/prize/?per_page=10&page=1`)
          if (response.data.prizes) {
            prizeData.value = response.data.prizes
            pagination.value = response.data.pagination
          } else {
            toast.error('Something Went Wrong!', {
              position: 'top-right'
            })
          }
        } catch (error) {
          toast.error(error.response.data.error, {
            position: 'top-right'
          })
        }
        loading.value = false
      }
      
      const handleDeletePrizeClick = async (id) => {
        try {
          const response = await axios.delete(`${api()}/v1/prize/${id}`, config)
          if (response.status === 200) {
            toast.success('Prize Deleted', {
              position: 'top-right'
            })
            getPrizeData()
          } else {
            toast.error('Prize Failed to Delete!', {
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
        pagination,
        prizeData,
        config,
        headers,
        toast,
        getPrizeData,
        handleDeletePrizeClick
      }
      
},
{
  persist:true
}
)