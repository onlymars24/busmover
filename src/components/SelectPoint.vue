<script setup>
import store from '../store'

    const props = defineProps({
        typeEn: String,
        typeRu: String,
    })

    const searchPoints = (query) =>{
        console.log(props.typeEn)
        store.dispatch('pointsSearch', {query, pointType: props.typeEn})
    }
</script>

<template>
        <div class="m-4">
            <p>Точка {{ props.typeRu }}</p>
            <el-select
                v-model="store.state[props.typeEn+'Point']"
                filterable
                remote
                :default-first-option="true"
                :placeholder="'Точка '+props.typeRu"
                :remote-method="searchPoints"
                :loading="store.state.pointsLoading"
                style="width: 240px"
                loading-text="Поиск..."
                :disabled="props.typeEn == 'arrival' && !store.state.dispatchPoint"
                :value-key="'id'"
                :label="store.state[props.typeEn+'Point'] ? store.state[props.typeEn+'Point'].name : ''"
            >
                <el-option
                    v-for="item in store.state[props.typeEn+'Points']"
                    :key="item.point_id"
                    :label="item.name"
                    :value="item"
                >{{ item.name+(item.region ? ', '+item.region : '')+(item.details ? ', '+item.details : '') }}</el-option>
            </el-select>
        </div>
</template>