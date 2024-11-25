<script setup>
    import Header from './Header.vue'
    import Footer from './Footer.vue'
    import {ref, computed, watch} from 'vue'
    import axios from 'axios';
    import store from '../store'
    // import Multiselect from 'vue-multiselect'
    import SelectPoint from '../components/SelectPoint.vue'
    import { useRouter, useRoute } from 'vue-router'
    import Multiselect from 'vue-multiselect'

    const router = useRouter()
    const route = useRoute()
    const searchPoints = (query) =>{
        store.dispatch('pointsSearch', {query, pointType: 'dispatch'})
    }
    searchPoints('')
    const searchRaces = () => {
        router.push({name: 'Races', params: {dispatchSlug: store.state.dispatchPoint.slug, arrivalSlug: store.state.arrivalPoint.slug}})
    }

    const dispatchPoint = computed(() => store.state.dispatchPoint)
    watch(dispatchPoint, () => {
        store.commit('arrivalPointDelete')
    })

    const options = ref(['qwer1', 'qwer2'])
    const value = ref(null)
</script>

<template>
    <Header/>
    <div>
        <!-- {{ store.state }} -->
        <h1>Header Main</h1>
        <SelectPoint :type-en="'dispatch'" :type-ru="'отправления'"/>
        <SelectPoint :type-en="'arrival'" :type-ru="'прибытия'"/>
        <div>
            <el-button @click="searchRaces">Поиск</el-button>
        </div>
        <!-- store.state.dispatchPoints -->
        <!-- {{ value }} -->
        <!-- <multiselect v-model="value" :customLabel="option => option.name+', '+option.region" 
            :loading="store.state.pointsLoading"
            @search-change="searchPoints" :options="store.state.dispatchPoints"></multiselect> -->
    </div>

    <slot></slot>

    <Footer/>
</template>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style scoped>
/* @import 'vue-select/dist/vue-select.css'; */
.v-select .vs__open-indicator {
  display: none;
}
</style>