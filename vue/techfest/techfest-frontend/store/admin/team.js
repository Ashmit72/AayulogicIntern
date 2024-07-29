import { api } from "@/api"
import axios from "axios"
import Cookies from "js-cookie"
import { defineStore } from "pinia"
import { ref } from "vue"
import { useToast } from "vue-toast-notification"

export const useAdminTeamStore = defineStore('teamStore', () => {
    const loading = ref(false)
    const pagination = ref({})
    const teamData = ref([])
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
            key: 'email',
            sortable: false,
            title: 'Email'
        },
        {
            align: 'start',
            key: 'leader',
            sortable: false,
            title: 'Leader'
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

    const getTeamData = async () => {
        try {
            loading.value = true
            const response = await axios.get(`${api()}/v1/team/?per_page=10&page=1`)
            if (response.data.teams) {
                teamData.value = response.data.teams
                pagination.value = response.data.pagination
            } else {
                console.log('Something Went Wrong')
            }
        } catch (error) {
            console.log(error.message)
        }
        loading.value = false
    }

    const handleDeleteTeamClick = async (id) => {
        try {
            const response = await axios.delete(`${api()}/v1/team/${id}`, config)
            if (response.status === 200) {
                toast.success('Team Deleted', {
                    position: 'top-right'
                })
                getTeamData()
            } else {
                toast.error('Team Failed to Delete!', {
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
        teamData,
        toast,
        config,
        headers,
        getTeamData,
        handleDeleteTeamClick
    }

},
{
    persist:true
}
)