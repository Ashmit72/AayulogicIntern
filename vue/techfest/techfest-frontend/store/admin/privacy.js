import { api } from "@/api"
import axios from "axios"
import Cookies from "js-cookie"
import { defineStore } from "pinia"
import { ref } from "vue"
import { useToast } from "vue-toast-notification"

export const useAdminPrivacyStore = defineStore('privacyState', () => {

    const loading = ref(false)
    const privacyData = ref({})
    const toast = useToast()
    const config = {
        headers: {
            Authorization: `Bearer ${Cookies.get('token')}`
        }
    }

    const getprivacyData = async () => {
        try {
            loading.value = true
            const response = await axios.get(`${api()}/v1/privacy`, config)
            if (response.status === 200) {
                privacyData.value = response.data
            } else {
                console.log('Something Went Wrong')
            }
        } catch (error) {
            console.log(error.message)
        } finally {
            loading.value = false
        }
    }

    const postprivacyData = async () => {
        try {
            loading.value = true
            const response = await axios.post(`${api()}/v1/privacy/create`, privacyData.value, config)
            if (response.status === 200) {
                privacyData.value.status = 'Draft'
                getprivacyData()
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

    const patchprivacyData = async () => {
        try {
            loading.value = true
            const response = await axios.patch(`${api()}/v1/privacy/update`, privacyData.value, config)
            if (response.status === 200) {
                toast.success(`Successfully ${privacyData.value.status}`, {
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

    const createTerm = () => {
        privacyData.value.status = 'Draft'
        console.log(privacyData.value.status)
        postprivacyData()
    }

    const publishTerm = () => {
        privacyData.value.status = 'Published'
        patchprivacyData()
    }

    const saveDraft = () => {
        privacyData.value.status = 'Draft'
        patchprivacyData()
    }

    return{
        loading,
        privacyData,
        toast,
        config,
        getprivacyData,
        postprivacyData,
        patchprivacyData,
        createTerm,
        publishTerm,
        saveDraft
    }
},
{
    persist:true
}
)