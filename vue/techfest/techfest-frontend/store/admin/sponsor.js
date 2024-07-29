import { api } from "@/api"
import axios from "axios"
import Cookies from "js-cookie"
import { defineStore } from "pinia"
import { ref } from "vue"
import { useToast } from "vue-toast-notification"

export const useAdminSponsorStore = defineStore('sponsorState', () => {
    const loading = ref(false)
    const pagination = ref({})
    const sponsorData = ref([])

    const toast = useToast()

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
            key: 'name',
            sortable: false,
            title: 'Name'
        },
        {
            align: 'start',
            key: 'link',
            sortable: false,
            title: 'Link'
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

    const getSponsorData = async () => {
        try {
            loading.value = true
            const response = await axios.get(`${api()}/v1/sponsor/?per_page=10&page=1`)
            if (response.data.sponsors) {
                sponsorData.value = response.data.sponsors
                pagination.value = response.data.pagination
            } else {
                console.log('Something Went Wrong')
            }
        } catch (error) {
            console.log(error.message)
        }
        loading.value = false
    }

    const handleSponsorDeleteClick = async (id) => {
        try {
            const response = await axios.delete(`${api()}/v1/sponsor/${id}`, config)
            if (response.status === 200) {
                toast.success('Sponsor Deleted', {
                    position: 'top-right'
                })
                getSponsorData()
            } else {
                toast.error('Sponsor Failed to Delete!', {
                    position: 'top-right'
                })
            }
        } catch (error) {
            console.error('Delete Error:', error.response ? error.response.data : error.message)
            toast.error(error.message, {
                position: 'top-right'
            })
        }
    }

    return{
        loading,
        pagination,
        sponsorData,
        toast,
        config,
        headers,
        getSponsorData,
        handleSponsorDeleteClick
    }

},
    {
        persist: true
    }
)