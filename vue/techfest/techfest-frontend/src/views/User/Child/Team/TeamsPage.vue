<script setup>
import { api } from '@/api'
import axios from 'axios'
import { computed, onMounted, ref } from 'vue'
import { useToast } from 'vue-toast-notification'

const members = ref([])
const roles = ref([])
const selectedRole = ref(100)
const current = ref(0)
const toast = useToast()

onMounted(() => {
  fetchTeams()
})


const fetchTeams = async () => {
  try {
    const response = await axios.get(`${api()}/v1/frontend/team?per_page=10&page=1`)
    if (response.status === 200) {
      members.value = response.data.members
      roles.value = response.data.roles
    } else {
      toast.error('Something Went Wrong', {
        position: 'top-right'
      })
    }
  } catch (error) {
    toast.error(error.message, {
      position: 'top-right'
    })
  }
}


const  filteredMembers=computed(()=>{
    if(current.value === 0) return members.value
    else return members.value.filter(member => member.role.level === selectedRole.value)
   })


const setIndex = (index) => {
  selectedRole.value = index
}
</script>

<template>
  <v-container>
    <v-row>
      <v-col>
        <v-tabs v-model="current">
          <v-tab>All</v-tab>
          <template v-for="(item, i) in roles" :key="i">
            <v-tab @click="setIndex(item.level)">{{ item.title }}</v-tab>
          </template>
        </v-tabs>
      </v-col>
    </v-row>
    <v-row>
      <template v-for="item in filteredMembers" :key="item.id">
        <v-col cols="12" md="3">
          <v-card flat color="transparent">
            <div class="d-flex justify-center">
              <v-avatar size="250">
                <v-img alt="item.memberImage.name" :src="item.memberImage.url"></v-img>
              </v-avatar>
            </div>
            <v-card-title class="d-flex justify-center text-h5 text-bold">{{
              item.name
            }}</v-card-title>
            <v-card-text class="d-flex justify-center"></v-card-text>
          </v-card>
        </v-col>
      </template>
    </v-row>
  </v-container>
</template>
<style scoped></style>
