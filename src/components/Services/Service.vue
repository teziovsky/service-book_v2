<template>
    <v-expansion-panels class="index-0">
        <v-expansion-panel class="my-1">
            <v-expansion-panel-header>
                <v-row
                    no-gutters
                    class="d-flex justify-content-around align-center breakword"
                >
                    <v-col class="pr-5">
                        <div class="caption grey--text">Title</div>
                        <div>{{ service.title }}</div>
                    </v-col>

                    <v-col style="max-width: 85px" class="d-none d-md-block">
                        <div class="caption grey--text">Price</div>
                        <div>{{ formattedNumber(service.price) }} zł</div>
                    </v-col>
                    <v-col style="max-width: 110px" class="d-none d-md-block">
                        <div class="caption grey--text">Date</div>
                        <div>{{ service.date }}</div>
                    </v-col>
                    <v-col style="max-width: 110px" class="d-none d-md-block">
                        <div class="caption grey--text">Mileage</div>
                        <div>{{ formattedNumber(service.mileage) }} km</div>
                    </v-col>
                    <v-col style="max-width: 75px" align-self="center">
                        <v-btn
                            dark
                            small
                            color="error"
                            @click.stop="deleteService(index)"
                            >DELETE</v-btn
                        >
                    </v-col>
                </v-row>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
                <v-divider class="py-1"></v-divider>
                <v-row
                    no-gutters
                    class="justify-space-between d-flex d-md-none pb-2"
                >
                    <v-col style="max-width: 85px">
                        <div class="caption grey--text">Price</div>
                        <div>{{ formattedNumber(service.price) }} zł</div>
                    </v-col>
                    <v-col style="max-width: 110px">
                        <div class="caption grey--text">Date</div>
                        <div>{{ service.date }}</div>
                    </v-col>
                    <v-col style="max-width: 110px">
                        <div class="caption grey--text">Mileage</div>
                        <div>{{ formattedNumber(service.mileage) }} km</div>
                    </v-col>
                </v-row>
                <v-row no-gutters class="breakword">
                    <v-col cols="12">
                        <div class="caption grey--text">Description</div>
                        <div
                            v-if="service.description.length === 0"
                            class="font-italic caption font-weight-light"
                        >
                            Brak opisu
                        </div>
                        <div v-else class="font-italic font-weight-light">
                            {{ service.description }}
                        </div>
                    </v-col>
                </v-row>
            </v-expansion-panel-content>
        </v-expansion-panel>
    </v-expansion-panels>
</template>

<script>
export default {
    name: "Service",
    props: ["service", "index"],
    methods: {
        formattedNumber(value) {
            value = new Intl.NumberFormat().format(value);
            return value;
        },
        deleteService(id) {
            this.$store.dispatch("removeService", id);
        },
    },
};
</script>

<style lang="scss">
.breakword {
    word-break: break-word;
}
.description--padding {
    padding-right: 125px;
}
.index-0 {
    z-index: 0 !important;
}
</style>