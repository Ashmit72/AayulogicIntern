import { api } from "@/api"
import axios from "axios"
import { defineStore } from "pinia"
import { ref } from "vue"
import { useRoute } from "vue-router"
import { useToast } from "vue-toast-notification"

export const useEventBlogStore=defineStore('eventUserState',()=>{
    const route=useRoute()
    const toast=useToast()
    const eventData= ref({})
    const events= ref([])

    const geteventData=async()=> {
        try {
          const response = await axios.get(`${api()}/v1/frontend/event/${route.params.id}`);
          if (response.status === 200) {
            eventData.value = response.data;
          } else {
            toast.error('Something went wrong', {
              position: 'top-right',
            });
          }
        } catch (error) {
          console.error('Error fetching blog data:', error);
          toast.error(error.message, {
            position: 'top-right',
          });
        }
      }

      const geteventsData=async()=> {
        try {
          const response = await axios.get(`${api()}/v1/frontend/event?per_page=10&page=1`)
          if (response.status === 200) {
            events.value = response.data.events
          }
        } catch (error) {
          toast.error(error.message, {
            position: 'top-right'
          })
        }
      }

      return{
        route,
        toast,
        eventData,
        events,
        geteventData,
        geteventsData
      }
  

},
{
  persist:true
}
)