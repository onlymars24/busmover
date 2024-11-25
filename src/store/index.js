import { createStore } from 'vuex'
import axiosClient from '../axiosClient'

// define injection key


export default createStore({
    state: {
      dispatchPoint: null,
      dispatchPoints: [],

      arrivalPoint: null,
      arrivalPoints: [],
      races: [],
      pointsLoading: false
    }, 
    getters: {

    },
    actions: {
      async dispatchPointsSearch (store, query) {
          let search = query
          if(query.length < 1 && store.state.dispatchPoint){
            search = store.state.dispatchPoint.name
          }
          store.commit('pointsLoadingStart')
          await axiosClient
          .get('/dispatch/points?search='+search)
          .then(response => {
              console.log(response)
              store.commit('changeDispatchPoints', response.data.dispatchPoints)
          })
          .catch(error => {
              console.log(error)
          })
          store.commit('pointsLoadingEnd')
      },
      async arrivalPointsSearch (store, query) {
          let search = query
          if(query.length < 1 && store.state.arrivalPoint){
            search = store.state.arrivalPoint.name
          }
          store.commit('pointsLoadingStart')
          await axiosClient
          .get('/arrival/points?search='+search+'&dispatchPointId='+store.state.dispatchPoint.point_id)
          .then(response => {
              console.log(response)
              store.commit('changeArrivalPoints', response.data.arrivalPoints)
          })
          .catch(error => {
              console.log(error)
          })
          store.commit('pointsLoadingEnd')
      },

      async pointsSearch(store, playload){
        console.log(playload)
        let query = playload.query
        let pointType = playload.pointType
        let search = query
        if(query.length < 1 && store.state[pointType+'Point']){
          search = store.state[pointType+'Point'].name
        }
        store.commit('pointsLoadingStart')
        await axiosClient
        .get('/points?pointType='+pointType+'&search='+search+(pointType == 'arrival' ? '&dispatchPointId='+store.state.dispatchPoint.point_id : ''))
        .then(response => {
            console.log(response)
            store.commit(pointType+'PointsSet', response.data.points)
        })
        .catch(error => {
            console.log(error)
        })
        store.commit('pointsLoadingEnd')
      },
      findRaces(){
        
      }
    },
    mutations: {
      pointsLoadingStart(state){
        state.pointsLoading = true
      },
      pointsLoadingEnd(state){
        state.pointsLoading = false
      },
      dispatchPointsSet(state, points){
        state.dispatchPoints = points
      },
      arrivalPointsSet(state, points){
        state.arrivalPoints = points
      },
      arrivalPointDelete(state){
        state.arrivalPoint = null
      },
      pointsSetBySlugs(state, points){
        state.dispatchPoint = points['dispatchPoint']
        state.dispatchPoints = [points['dispatchPoint']]
        state.arrivalPoint = points['arrivalPoint']
        state.arrivalPoints = [points['arrivalPoint']]
      }
    }
})