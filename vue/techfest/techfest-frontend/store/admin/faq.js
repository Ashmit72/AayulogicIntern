import { api } from "@/api";
import axios from "axios";
import Cookies from "js-cookie";
import { defineStore } from "pinia"
import { ref } from "vue";


export const useAdminFAQstore=defineStore('faqAdminState',()=>{
    const headers = [
        {
          align: 'start',
          key: 'title',
          sortable: false,
          title: 'Question'
        },
        {
          align: 'start',
          key: 'status',
          sortable: false,
          title: 'Status'
        },
        {
          align: 'start',
          key: 'edit',
          title: 'Edit'
        },
        {
          align: 'start',
          key: 'delete',
          title: 'Delete'
        }
      ];

      const config = {
        headers: {
          Authorization: `Bearer ${Cookies.get('token')}`
        }
      };

      const faqData = ref([]);

      const pagination = ref({
        totalPage: 1,
        totalItems: 0,
        itemsPerPage: 10,
        currentPage: 1
      });

      const getFAQData = async () => {
        try {
          const response = await axios.get(`${api()}/v1/faq?per_page=10&page=1`, config);
          if (response.status === 200) {
            faqData.value = response.data.faqs;
            pagination.value = response.data.pagination;
          }
        } catch (error) {
          console.error(error.message); 
        }
      };


const faqDeleteData = async (id) => {
  try {
    const response = await axios.delete(`${api()}/v1/faq/${id}`, config);
    if (response.data.message) {

      console.log('Success:', response.data.message);
    } else {
      console.error('Something Went Wrong'); 
    }
    await getFAQData();
  } catch (error) {
    console.error(error.message); 
  }
};

return{
headers,
config,
faqData,
pagination,
getFAQData,
faqDeleteData
}

},
{
  persist:true
}
)