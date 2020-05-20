import Vue from "vue";
import Vuex from "vuex";
import VueRouter from "vue-router";
import axios from "axios";
Vue.use(VueRouter);
Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        services: [],
        cars: [],
        actualcarname: "",
    },
    getters: {
        services: (state) => state.services,
        cars: (state) => state.cars,
        actualcarname: (state) => state.actualcarname,
    },
    actions: {
        async fetchServices({ commit, getters }) {
            await axios
                .post("http://servicebook.ct8.pl/php/ajaxfile.php", {
                    request: 1,
                    carname: getters.actualcarname,
                })
                .then((response) => {
                    commit("setService", response.data);
                });
        },
        async addService({ dispatch, getters }, service) {
            await axios
                .post("http://servicebook.ct8.pl/php/ajaxfile.php", {
                    request: 2,
                    carname: getters.actualcarname,
                    ...service,
                })
                .then(() => {
                    dispatch("fetchServices");
                });
        },
        // async updateService({ commit, getters }, service) {
        //     const response = await this.$http.post("http://servicebook.ct8.pl/php/ajaxfile.php", {
        //         request: 3,
        //         carname: getters.actualcarname,
        //         ...service,
        //     });
        //     commit("updateService", response.data);
        // },
        async removeService({ dispatch, getters }, id) {
            await axios
                .post("http://servicebook.ct8.pl/php/ajaxfile.php", {
                    request: 4,
                    carname: getters.actualcarname,
                    id: id,
                })
                .then(() => {
                    dispatch("fetchServices");
                });
        },
        async fetchCarNames({ commit }) {
            await axios
                .post("http://servicebook.ct8.pl/php/ajaxfile.php", {
                    request: 5,
                })
                .then((response) => {
                    commit("setCarNames", response.data);
                });
        },
        async removeCar({ commit, dispatch }, carname) {
            await axios
                .post("http://servicebook.ct8.pl/php/ajaxfile.php", {
                    request: 6,
                    carname: carname,
                })
                .then(() => {
                    dispatch("fetchCarNames");
                    if (this.state.cars.length < 1) commit("emptyCarArray");
                });
        },
        async addCar({ dispatch }, newCarName) {
            await axios
                .post("http://servicebook.ct8.pl/php/ajaxfile.php", {
                    request: 7,
                    carname: newCarName,
                })
                .then(() => {
                    dispatch("fetchCarNames");
                });
        },
    },
    mutations: {
        setService: (state, services) => (state.services = services),
        setCarNames: (state, carnames) => (state.cars = carnames),
        setActualCar: (state, actualcar) => (state.actualcarname = actualcar),
        emptyCarArray: (state) => (state.actualcarname = " "),
        // updService: (state, updatedService) => {
        //     const index = state.services.findIndex((t) => t.id === updatedService.id);
        //     if (index !== -1) {
        //         state.services.splice(index, 1, updatedService);
        //     }
        // },
    },
});
