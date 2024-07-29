import { api } from "@/api";
import axios from "axios";
import Cookies from "js-cookie";
import { defineStore } from "pinia";
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useToast } from "vue-toast-notification";


export const useAdminRole=defineStore('adminRoleState',()=>{
    const route = useRoute();
    const router = useRouter();
    const toast = useToast();
    
    const id = route.params.id;
    
    const roleData = ref({
      title: '',
      level: null,
      status: ''
    });
    
    const config = {
      headers: {
        Authorization: `Bearer ${Cookies.get('token')}`
      }
    };
    
    const getRoleDataById = async () => {
      try {
        const response = await axios.get(`${api()}/v1/role/${id}`);
        if (response.status === 200) {
          roleData.value = {
            ...response.data
          };
        }
      } catch (error) {
        toast.error(error.response?.data?.error || 'Failed to fetch data', {
          position: 'top-right'
        });
      }
    };
    
    const postRoleData = async () => {
      try {
        const response = await axios.post(`${api()}/v1/role/create`, roleData.value, config);
        if (response.status === 200) {
          router.push('/admin/role');
        } else {
          toast.error('Something Went Wrong', {
            position: 'top-right'
          });
        }
      } catch (error) {
        toast.error(error.response?.data?.error || 'Failed to submit data', {
          position: 'top-right'
        });
      }
    };
    
    const patchRoleData = async () => {
      try {
        const response = await axios.patch(`${api()}/v1/role/${id}`, roleData.value, config);
        if (response.status === 200) {
          router.push('/admin/role');
        } else {
          toast.error('Something Went Wrong', {
            position: 'top-right'
          });
        }
      } catch (error) {
        toast.error(error.response?.data?.error || 'Failed to update data', {
          position: 'top-right'
        });
      }
    };
    const handleSubmit = async () => {
        if (id) {
          await patchRoleData();
        } else {
          await postRoleData();
        }
      };

    return{
      route,
      router,
      toast,
      id,
      roleData,
      config,
      getRoleDataById,
      postRoleData,
      patchRoleData,
      handleSubmit
    }
},{
  persist:true
}
)