<template>
    <v-app>
        <Navigation></Navigation>
        <v-content class="grey lighten-4">
            <v-container fluid>
                <router-view></router-view>
            </v-container>
        </v-content>
        <Credits />
    </v-app>
</template>

<script>
import Navigation from "./components/Navigation";
import Credits from "./components/Credits";

export default {
    name: "App",
    components: {
        Navigation,
        Credits
    },
    created() {
        this.$store.dispatch("fetchCarNames").then(() => {
            if (this.$store.state.cars.length !== 0) {
                this.$store.commit(
                    "setActualCar",
                    this.$store.state.cars[0].carname
                );
                this.$store.dispatch("fetchServices");
            }
        });
    }
};
</script>

<style lang="scss">
.fade-adv-enter-active,
.fade-adv-leave-active {
    transition: opacity 0.25s;
}
.fade-adv-leave-active {
    position: absolute;
}
.fade-adv-move {
    transition: transform 0.15s;
}

.fade-adv-enter,
.fade-adv-leave-to {
    opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.25s;
}

.fade-enter,
.fade-leave-to {
    opacity: 0;
}
</style>