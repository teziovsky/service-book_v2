import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    services: {
      honda_civic_viii: [
        {
          id: 1,
          title: 'Kupno samochodu Honda Civic VIII 1.8 iVTEC 2009r.',
          description: 'W skład ceny wchodzi: transport samochodu z niemiec, akcyza, przegląd, tłumaczenie dokumentów oraz rejestracja.',
          price: 24300,
          date: '08.06.2020',
          mileage: 149500,
        },
        {
          id: 2,
          title: 'Spawanie uchwytu prawego tłumika',
          description: 'Również dolano 200 ml oleju silnikowego.',
          price: 50,
          date: '21.07.2020',
          mileage: 150000,
        },
      ],
      opel_astra_j: [
        {
          id: 1,
          title: 'Kupno samochodu Opel Astra J 2012r.',
          description: 'W skład ceny wchodzi wykonanie tzw. przeglądu 0.',
          price: 26500,
          date: '05.02.2020',
          mileage: 121694,
        },
      ],
      bmw_320i: [
        {
          id: 1,
          title: 'Kupno samochodu BMW 320i 2007r.',
          description: 'W skład ceny wchodzi kupno samochodu oraz wykonanie tzw. przeglądu 0.',
          price: 18700,
          date: '01.02.2018',
          mileage: 249500,
        },
      ],
    },
    cars: ['honda_civic_viii', 'opel_astra_j', 'bmw_320i'],
    actualcarname: 'honda_civic_viii',
  },
  getters: {
    services: (state) => state.services[state.actualcarname].sort((a, b) => b.mileage - a.mileage),
    cars: (state) => state.cars,
    actualcarname: (state) => state.actualcarname,
  },
  actions: {
    addService({ commit }, service) {
      commit('handleAddService', service);
    },
    removeService({ commit }, id) {
      commit('handleRemoveService', id);
    },
    fetchCarNames({ commit }) {
      commit('setCarNames');
    },
    removeCar({ commit }, carName) {
      commit('handleRemoveCar', carName);

      if (this.state.cars.length < 1) commit('emptyCarArray');
    },
    addCar({ commit }, newCarName) {
      commit('handleAddCar', newCarName);
    },
  },
  mutations: {
    handleAddService: (state, service) => state.services[state.actualcarname].push(service),
    handleRemoveService: (state, id) => state.services[state.actualcarname].splice(id, 1),
    setActualCar: (state, actualcar) => (state.actualcarname = state.cars[actualcar]),
    handleAddCar: (state, newCarName) => {
      state.cars.push(newCarName);
      state.services[newCarName] = [];
    },
    handleRemoveCar: (state, carName) => {
      state.cars.splice(state.cars.indexOf(carName), 1);
      delete state.services[carName];
    },

    emptyCarArray: (state) => (state.actualcarname = ' '),
  },
});
