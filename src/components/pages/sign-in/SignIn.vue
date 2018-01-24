<template>
    <section class="container">
        <h1 class="section__title">Sign-In</h1>
        <button @click="callPopup('FirstPopup')">Show popup</button>
        <router-link tag="button" to="accauntant-table">Accauntant</router-link>
    </section>
</template>

<script>
    import dataBus from '../../../data/data.bus';

    export default {
        methods: {
            callPopup(popup_name = null) {
                dataBus.current_popup = popup_name;
            }
        }
    }
</script>
