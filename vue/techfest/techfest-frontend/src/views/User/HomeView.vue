<script setup>
import { api } from '@/api'
import axios from 'axios'
import { onMounted, ref } from 'vue'
import { useToast } from 'vue-toast-notification'

const prizeData = ref([])
const speakerData = ref([])
const levelData = ref([])
const sponsors = ref([])
const toast = useToast()

onMounted(() => {
  getHomeData()
})

const getHomeData = async () => {
  try {
    const response = await axios.get(`${api()}/v1/frontend/home`)
    if (response.status === 200) {
      prizeData.value = response.data.prizes
      speakerData.value = response.data.speakers
      levelData.value = response.data.levels
      sponsors.value = response.data.sponsors
    }
  } catch (error) {
    toast.error(error.message, {
      position: 'top-right'
    })
  }
}

const openLink = (url) => {
  if (url) {
    window.open(url, '_blank')
  }
}
</script>
<template>
  <v-container>
    <!-- Prizes Section -->
    <v-row>
      <v-col cols="12">
        <v-card class="pa-4" outlined>
          <v-card-title class="headline">Prizes</v-card-title>
          <v-card-subtitle>Discover the awards and their descriptions.</v-card-subtitle>
          <v-divider></v-divider>
          <v-row>
            <v-col v-for="prize in prizeData" :key="prize.id" cols="12" md="4">
              <v-card class="mx-auto">
                <v-img :src="prize.prizeImage.url" height="200px" cover></v-img>
                <v-card-title>{{ prize.title }}</v-card-title>
                <v-card-text>{{ prize.description }}</v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>

    <!-- Speakers Section -->
    <v-row>
      <v-col cols="12">
        <v-card class="pa-4" outlined>
          <v-card-title class="headline">Speakers</v-card-title>
          <v-card-subtitle>Meet our distinguished speakers.</v-card-subtitle>
          <v-divider></v-divider>
          <v-row>
            <v-col v-for="speaker in speakerData" :key="speaker.id" cols="12" md="4">
              <v-card class="mx-auto">
                <v-img
                  :src="speaker.speakerImage.url"
                  style="border-radius: 100%; transform: translate(10px, 10px)"
                  width="200px "
                  height="200px"
                  cover
                ></v-img>
                <v-card-title>{{ speaker.name }}</v-card-title>
                <v-card-subtitle>{{ speaker.position }}</v-card-subtitle>
                <v-card-text>{{ speaker.description }}</v-card-text>
                <v-card-actions>
                  <v-btn text @click="openLink(speaker.facebook)">Facebook</v-btn>
                  <v-btn text @click="openLink(speaker.twitter)">Twitter</v-btn>
                  <v-btn text @click="openLink(speaker.linkedin)">LinkedIn</v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" class="d-flex align-center justify-center py-16">
        <div class="position-relative">
          <div class="title text-h1 font-weight-black text-primary">Sponsors</div>
          <div class="subtitle text-h5 font-weight-regular text-center">Our valued sponsors</div>
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col v-for="sponsor in sponsors" :key="sponsor.id" cols="12" md="4">
        <v-card class="mx-auto" outlined>
          <v-img
            :src="sponsor.sponsorImage.url"
            style="border-radius: 10px; transform: translate(10px, 10px)"
            width="200px"
            height="200px"
            cover
            v-if="sponsor.sponsorImage"
          ></v-img>
          <v-card-title>{{ sponsor.name }}</v-card-title>
          <v-card-subtitle>{{ sponsor.link }}</v-card-subtitle>
          <v-card-text>{{ sponsor.description }}</v-card-text>
          <v-card-text
            >Sponsor-Level:
            <span style="color: yellowgreen">{{ sponsor.level.title }}</span></v-card-text
          >
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.v-card {
  transition: transform 0.3s;
}

.v-card:hover {
  transform: scale(1.03);
}

.v-card-title {
  font-weight: bold;
}

.v-img {
  object-fit: cover;
}

.v-divider {
  margin: 16px 0;
}
</style>
