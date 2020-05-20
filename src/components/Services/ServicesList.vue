<template>
    <div class="serviceslist">
        <div class="text-center d-flex align-baseline" v-if="this.$store.getters.cars.length">
            <v-subheader class="order-first">{{ formatString(actualCarName) }}</v-subheader>
            <v-dialog persistent max-width="600px" v-model="dialog">
                <template v-slot:activator="{ on }">
                    <v-btn color="primary" absolute right dark v-on="on">Add service</v-btn>
                </template>
                <v-card @keyup.enter.native="addService" @keyup.esc.native="dialog = !dialog">
                    <v-card-title>
                        <span class="headline">Add service</span>
                        <v-spacer></v-spacer>
                        <v-icon color="blue darken-1" text @click="dialog = !dialog">mdi-close</v-icon>
                    </v-card-title>
                    <v-card-text>
                        <v-container>
                            <v-row>
                                <v-col cols="12">
                                    <v-text-field
                                        label="Title of service*"
                                        v-model.lazy="name"
                                        :error="$v.name.$dirty && $v.name.$invalid"
                                        @input="$v.name.$touch()"
                                        :rules="[rules.required, rules.name]"
                                        required
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="12">
                                    <v-text-field
                                        label="Description of service"
                                        v-model.lazy="description"
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="4" md="4">
                                    <v-text-field
                                        label="Price*"
                                        v-model.lazy="price"
                                        :error="$v.price.$dirty && $v.price.$invalid"
                                        @input="$v.price.$touch()"
                                        :rules="[rules.required]"
                                        type="number"
                                        required
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="4" md="4">
                                    <v-dialog
                                        ref="dialog"
                                        :return-value.sync="date"
                                        transition="scale-transition"
                                        width="290px"
                                    >
                                        <template v-slot:activator="{ on }">
                                            <v-text-field
                                                v-model="date"
                                                :error="$v.date.$dirty && $v.date.$invalid"
                                                @input="$v.date.$touch()"
                                                :rules="[rules.required]"
                                                label="Date"
                                                readonly
                                                v-on="on"
                                            ></v-text-field>
                                        </template>
                                        <v-date-picker
                                            v-model="date"
                                            no-title
                                            :max="getCurrentDate"
                                            @input="$refs.dialog.save(date)"
                                            scrollable
                                        ></v-date-picker>
                                    </v-dialog>
                                </v-col>
                                <v-col cols="12" sm="4" md="4">
                                    <v-text-field
                                        label="Mileage*"
                                        v-model.lazy="mileage"
                                        :error="$v.mileage.$dirty && $v.mileage.$invalid"
                                        @input="$v.mileage.$touch()"
                                        :rules="[rules.required]"
                                        type="number"
                                        required
                                    ></v-text-field>
                                </v-col>
                            </v-row>
                        </v-container>
                        <small>*indicates required field</small>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                            center
                            color="blue darken-1"
                            :disabled="$v.$invalid"
                            outlined
                            @click="addService"
                        >Add service</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </div>
        <v-alert type="warning" v-if="!this.$store.getters.cars.length">
            <strong>No cars in the database.</strong> Add the first car to your service book!
        </v-alert>
        <div v-else>
            <transition name="fade-alert" mode="out-in">
                <transition-group
                    tag="div"
                    class="container--fluid"
                    v-if="services.length"
                    name="fade"
                    mode="out-in"
                    appear
                >
                    <Service
                        v-for="(service, index) in services"
                        :key="service.id"
                        :index="index"
                        :service="service"
                    />
                </transition-group>
                <v-alert key="nodata" type="warning" class="mt-2" v-else>
                    <strong>No data.</strong> Add the first item to your service book!
                </v-alert>
            </transition>
        </div>
    </div>
</template>

<script>
import Service from "./Service";
import { validationMixin } from "vuelidate";
import { required, minLength } from "vuelidate/lib/validators";

export default {
    name: "ServicesList",
    mixins: [validationMixin],
    data() {
        return {
            dialog: false,
            name: "",
            description: "",
            price: null,
            date: "",
            mileage: null,
            rules: {
                required: value => !!value || "Required.",
                name: value => value.length >= 3 || "Min 3 characters."
            }
        };
    },
    computed: {
        services() {
            return this.$store.getters.services;
        },
        actualCarName() {
            return this.$store.getters.actualcarname;
        },
        getCurrentDate() {
            return new Date().toJSON().slice(0, 10);
        }
    },
    methods: {
        resetData() {
            this.name = "";
            this.description = "";
            this.price = null;
            this.date = "";
            this.mileage = null;
        },
        formatString(value) {
            var newValue = value.replace(/_/g, " ").toUpperCase();
            return newValue;
        },
        addService: function() {
            if (
                this.name != "" &&
                this.price != null &&
                this.date != "" &&
                this.mileage != null
            ) {
                let newService = [
                    {
                        name: this.name,
                        description: this.description,
                        price: this.price,
                        date: this.date,
                        mileage: this.mileage
                    }
                ];
                this.$store.dispatch("addService", ...newService);
                this.dialog = !this.dialog;
                this.resetData();
            } else {
                alert("Fill all fields.");
            }
        }
    },
    validations: {
        name: {
            required,
            minLength: minLength(3)
        },
        price: {
            required
        },
        date: {
            required
        },
        mileage: {
            required
        }
    },
    components: {
        Service
    }
};
</script>

<style scoped lang="scss">
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.25s;
}
.fade-leave-active {
    position: absolute;
}
.fade-move {
    transition: transform 0.25s;
}

.fade-enter,
.fade-leave-to {
    opacity: 0;
}

.fade-alert-enter-active,
.fade-alert-leave-active {
    transition: opacity 0.25s;
}
.fade-alert-enter,
.fade-alert-leave-to {
    opacity: 0;
}
</style>
