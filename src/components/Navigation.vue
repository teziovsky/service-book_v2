<template>
    <nav>
        <v-navigation-drawer v-model="drawer" bottom absolute app>
            <transition-group
                tag="div"
                class="v-list v-sheet v-sheet---tile theme--light v-list--dense"
                name="fade-adv"
                mode="out-in"
                appear
            >
                <v-list-item
                    link
                    v-for="(car, index) in cars"
                    :index="index"
                    :key="index"
                    @click.prevent="updateActualCar(index)"
                >
                    <v-list-item-action>
                        <transition name="fade" mode="out-in">
                            <v-icon
                                key="delete"
                                color="red"
                                v-if="editmode"
                                @click.stop="deleteCar(car, index)"
                                >mdi-delete</v-icon
                            >
                            <v-icon key="car" color="indigo" v-else
                                >mdi-car</v-icon
                            >
                        </transition>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>{{
                            formatString(car)
                        }}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item key="input" v-if="editmode">
                    <v-text-field
                        solo
                        dense
                        id="newCarInput"
                        v-model="newCarName"
                        :rules="[newCarRules.required, newCarRules.exist]"
                        class="mt-1"
                        @keyup.enter.native="
                            addCar(reversedFormatString(newCarName))
                        "
                        @click:append="addCar(reversedFormatString(newCarName))"
                        append-icon="mdi-plus"
                        placeholder="Name of new car"
                    ></v-text-field>
                </v-list-item>
                <v-list-item
                    key="editmode"
                    class="d-flex flex-column justify-center"
                >
                    <v-btn
                        small
                        tile
                        v-if="!editmode"
                        color="primary"
                        class="mt-3"
                        @click.prevent="editmode = !editmode"
                        >Manage Cars</v-btn
                    >
                </v-list-item>
            </transition-group>
        </v-navigation-drawer>
        <v-app-bar app color="indigo" dark>
            <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
            <v-toolbar-title>Service Book</v-toolbar-title>
        </v-app-bar>
    </nav>
</template>

<script>
import { mapGetters } from "vuex";
export default {
    name: "Navigation",
    data() {
        return {
            drawer: false,
            editmode: false,
            newCarName: "",
            newCarRules: {
                required: (v) => !!v || "Name is required",
                exist: (v) =>
                    !this.cars.includes(this.reversedFormatString(v)) ||
                    "This car already exists",
            },
        };
    },
    computed: {
        ...mapGetters(["cars"]),
    },
    methods: {
        formatString(value) {
            var newValue = value.split("_").join(" ").toUpperCase();
            return newValue;
        },
        reversedFormatString(value) {
            var newValue = value.split(" ").join("_").toLowerCase();
            return newValue;
        },
        updateActualCar(index) {
            this.$store.commit("setActualCar", index);
            this.editmode = false;
        },
        deleteCar(carName, index) {
            this.$store.dispatch("removeCar", carName, index);
            if (index === 0) {
                this.$store.commit("setActualCar", index);
            } else {
                this.$store.commit("setActualCar", index - 1);
            }
        },
        addCar(newCarName) {
            if (this.cars.includes(this.reversedFormatString(newCarName))) {
                document.querySelector("#newCarInput").focus();
            } else if (this.newCarName.length === 0) {
                document.querySelector("#newCarInput").focus();
            } else {
                this.$store.dispatch("addCar", newCarName);
                this.newCarName = "";
                this.editmode = false;
            }
        },
    },
};
</script>