import { api } from "@/api"
import axios from "axios"
import { defineStore } from "pinia"
import { ref } from "vue"
import { useRoute } from "vue-router"
import { useToast } from "vue-toast-notification"

export const useWorkshopUserStore=defineStore('workshopUser',()=>{
    const workshopData = ref({})
    const workshops = ref([])
    const route=useRoute()
    const toast=useToast()

    const getworkshopData = async () => {
        try {
          const response = await axios.get(`${api()}/v1/frontend/workshop/${route.params.id}`)
          if (response.status === 200) {
            workshopData.value = response.data
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
      const getworkshops = async () => {
        try {
          const response = await axios.get(`${api()}/v1/frontend/workshop?per_page=10&page=1`)
          if (response.status === 200) {
            workshops.value = response.data.workshops
          }
        } catch (error) {
          toast.error(error.message, {
            position: 'top-right'
          })
        }
      }

      return{
        getworkshopData,
        getworkshops,
        workshopData,
        workshops
      }

},
{
  persist:true
}
)