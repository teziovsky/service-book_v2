<template>
    <nav>
        <v-navigation-drawer v-model="drawer" bottom absolute app>
            <!-- <v-list dense> -->
            <transition-group
                tag="div"
                class="v-list v-sheet v-sheet---tile theme--light v-list--dense"
                name="fade-adv"
                mode="out-in"
                appear
            >
                <v-list-item
                    link
                    v-for="(car, index) in carNames"
                    :index="index"
                    :key="car.carname"
                    @click.prevent="updateActualCar(car.carname)"
                >
                    <v-list-item-action @click.stop="deleteCar(car.carname, index)">
                        <transition name="fade" mode="out-in">
                            <v-icon key="delete" color="red" v-if="editmode">mdi-delete</v-icon>
                            <v-icon key="car" color="indigo" v-else>mdi-car</v-icon>
                        </transition>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>{{formatString(car.carname)}}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item key="input" v-if="editmode">
                    <v-text-field
                        solo
                        dense
                        v-model="newCarName"
                        class="mt-1"
                        @keyup.enter.native="addCar(reverseFormatString(newCarName))"
                        @click:append="addCar(reverseFormatString(newCarName))"
                        append-icon="mdi-plus"
                        placeholder="Name of new car"
                    ></v-text-field>
                </v-list-item>
                <v-list-item key="editmode" class="d-flex flex-column justify-center">
                    <v-btn
                        small
                        tile
                        v-if="!editmode"
                        color="primary"
                        class="mt-3"
                        @click.prevent="editmode = !editmode"
                    >Manage Cars</v-btn>
                </v-list-item>
            </transition-group>
            <!-- </v-list> -->
        </v-navigation-drawer>
        <v-app-bar app color="indigo" dark>
            <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
            <v-toolbar-title>Service Book</v-toolbar-title>
            <v-btn
                text
                @click="refreshList"
                absolute
                right
                :loading="isLoading"
                :disabled="isLoading"
            >
                <v-icon>mdi-refresh</v-icon>
            </v-btn>
        </v-app-bar>
    </nav>
</template>

<script>
export default {
    name: "Navigation",
    data() {
        return {
            drawer: false,
            isLoading: false,
            editmode: false,
            newCarName: ""
        };
    },
    computed: {
        carNames() {
            return this.$store.getters.cars;
        }
    },
    methods: {
        formatString(value) {
            var newValue = value.replace(/_/g, " ").toUpperCase();
            return newValue;
        },
        reverseFormatString(value) {
            var newReverseValue = value.replace(/ /g, "_").toUpperCase();
            return newReverseValue;
        },
        refreshList() {
            this.$store.dispatch("fetchServices");
            this.isLoading = true;
            setTimeout(() => {
                this.isLoading = false;
            }, 1000);
        },
        updateActualCar(actualcar) {
            this.$store.commit("setActualCar", actualcar);
            this.$store.dispatch("fetchServices");
            this.editmode = false;
        },
        deleteCar(carName, index) {
            this.$store.dispatch("removeCar", carName);
            if (index === 0) {
                this.$store.commit(
                    "setActualCar",
                    this.$store.state.cars[1].carname
                );
            } else {
                this.$store.commit(
                    "setActualCar",
                    this.$store.state.cars[index - 1].carname
                );
            }
        },
        addCar(newCarName) {
            if (this.carNames.length !== 0) {
                for (var i = 0; i < this.carNames.length; i++) {
                    if (this.carNames[i].carname == newCarName)
                        alert("nazwa już istnieje");
                    else {
                        this.$store.dispatch("addCar", newCarName);
                        this.newCarName = "";
                    }
                }
            } else {
                this.$store.dispatch("addCar", newCarName);
                this.newCarName = "";
                this.editmode = false;
            }
            this.$store.commit("setActualCar", newCarName);
            this.$store.dispatch("fetchServices");
        }
    }
};
</script>