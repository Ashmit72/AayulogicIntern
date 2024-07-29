import { api } from "@/api";
import axios from "axios";
import Cookies from "js-cookie";
import { defineStore } from "pinia"
import { ref } from "vue";
import { useToast } from "vue-toast-notification";


export const useAdminLevelStore=defineStore('adminLevelState',()=>{
    const loading = ref(false);
    const toast = useToast();
    const pagination = ref({});
    const levelData = ref([]);
    const headers = [
      {
        align: 'start',
        key: 'title',
        sortable: false,
        title: 'Title'
      },
      {
        align: 'start',
        key: 'priority',
        sortable: false,
        title: 'Priority'
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
    ];
    const config= {
      headers: {
        Authorization: `Bearer ${Cookies.get('token')}`
      }
    };

    const getLevelData = async () => {
        try {
          loading.value = true;
          const response = await axios.get(`${api()}/v1/sponsor-level/?per_page=10&page=1`);
          if (response.data.levels) {
            levelData.value = response.data.levels;
            pagination.value = response.data.pagination;
          } else {
            console.log('Something Went Wrong');
          }
        } catch (error) {
          console.log(error.message);
        } finally {
          loading.value = false;
        }
      };
      
      const handleDeleteLevelClick = async (id) => {
        try {
          const response = await axios.delete(`${api()}/v1/sponsor-level/${id}`, config);
          if (response.status === 200) {
            toast.success('Level Deleted', {
              position: 'top-right'
            });
            await getLevelData(); 
          } else {
            toast.error('Level Failed to Delete!', {
              position: 'top-right'
            });
          }
        } catch (error) {
          toast.error(error.message, {
            position: 'top-right'
          });
        }
      };
    

      return{
        loading,
        toast,
        pagination,
        levelData,
        headers,
        config,
        getLevelData,
        handleDeleteLevelClick
      }
},
{
  persist:true
}
)