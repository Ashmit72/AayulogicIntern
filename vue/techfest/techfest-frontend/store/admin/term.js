import { api } from "@/api"
import axios from "axios"
import Cookies from "js-cookie"
import { defineStore } from "pinia"
import { ref } from "vue"
import { useToast } from "vue-toast-notification"
export const useAdminTermStore=defineStore('termState',()=>{
    const loading = ref(false)
    const termData = ref({})
    const toast=useToast()
    const config = ref({
      headers: {
        Authorization: `Bearer ${Cookies.get('token')}`
      }
    })

    
    const getTermData=async()=> {
          try {
            loading.value = true
            const response = await axios.get(`${api()}/v1/terms`, config.value)
            if (response.status === 200) {
              termData.value = response.data
            } else {
              console.log('Something Went Wrong')
            }
          } catch (error) {
            console.log(error.message)
          } finally {
            loading.value = false
          }
        }
    
        const postTermData=async()=> {
          try {
            loading.value = true
            const response = await axios.post(`${api()}/v1/terms/create`, termData.value, config.value)
            if (response.status === 200) {
              this.termData.status = 'Draft'
              getTermData()
                toast.success('Successfully Created', {
                position: 'top-right'
              })
            } else {
                toast.error('Something Went Wrong', {
                position: 'top-right'
              })
            }
          } catch (error) {
            toast.error(error.response.data.error, {
              position: 'top-right'
            })
          } finally {
            loading.value = false
          }
        }
    
        const patchTermData=async()=> {
          try {
            loading.value = true
            const response = await axios.patch(`${api()}/v1/terms/update`, termData.value, config.value)
            if (response.status === 200) {
              toast.success(`Successfully ${termData.value.status}`, {
                position: 'top-right'
              })
            } else {
              toast.error('Something Went Wrong', {
                position: 'top-right'
              })
            }
          } catch (error) {
            toast.error(error.response.data.error, {
              position: 'top-right'
            })
          } finally {
            loading.value = false
          }
        }
    
       const createTerm=()=> {
          (termData.value.status = 'Draft'), 
          postTermData()
        }
    
        const publishTerm=()=> {
          termData.value.status = 'Published'
          patchTermData()
        }
        
       const saveDraft=()=> {
          termData.value.status = 'Draft'
          patchTermData()
        }

        return{
            getTermData,
            postTermData,
            saveDraft,
            publishTerm,
            createTerm,
            patchTermData,
            loading,
            toast,
            config,
            termData
        }
},
{
    persist:true
}
)