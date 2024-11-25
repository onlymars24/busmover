<script setup>
import SearchLayout from '../components/SearchLayout.vue'
import { onBeforeRouteLeave, onBeforeRouteUpdate } from 'vue-router'
import store from '../store'
import {ref} from 'vue'
import axiosClient from '../axiosClient'

  const loading = ref(true)
  const races = ref([])
  axiosClient
  .get('/races?dispatchPointId='+store.state.dispatchPoint.point_id+'&arrivalPointId='+store.state.arrivalPoint.point_id)
  .then(response => {
      console.log(response)
      races.value = response.data.races
      loading.value = false
  })
  .catch(error => {
      console.log(error)
  })


</script>

<template>
  <main>
    <SearchLayout>
      <h1>Рейсы</h1>
      <p v-if="loading">Загрузка...</p>
      <pre v-else>
        {{ races }}
      </pre>
    </SearchLayout>
    
    
  </main>
</template>