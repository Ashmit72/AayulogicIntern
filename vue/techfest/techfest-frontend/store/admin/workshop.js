import { api } from "@/api"
import axios from "axios"
import Cookies from "js-cookie"
import { defineStore } from "pinia"
import { ref } from "vue"
import { useToast } from "vue-toast-notification"

export const useAdminWorkshopStore = defineStore('workshopAdminState', () => {
    const loading = ref(false)
    const pagination = ref({})
    const workShopData = ref([])
    const toast = useToast()
    const config = ref({
        headers: {
            Authorization: `Bearer ${Cookies.get('token')}`
        }
    })
    const headers = ref([
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
      ])
      const getWorkShopData=async()=>{
        try {
          loading.value = true
          const response = await axios.get(`${api()}/v1/workshop/?per_page=10&page=1`)
          if (response.data.workshops) {
            workShopData.value = response.data.workshops
            pagination.value = response.data.pagination
          } else {
            console.log('Something Went Wrong')
          }
        } catch (error) {
          console.log(error.message)
        }
        loading.value = false
      }
  
  
  const  handleDeleteWorkshopClick=async(id)=> {
        try {
          const response = await axios.delete(`${api()}/v1/workshop/${id}`, config.value)
          if (response.status === 200) {
            toast.success('Workshop Deleted', {
              position: 'top-right'
            })
            getWorkShopData()
          } else {
            toast.error('Workshop Failed to Delete!', {
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
        workShopData,
        toast,
        config,
        headers,
        getWorkShopData,
        handleDeleteWorkshopClick
      }
},{
    persist:true
})