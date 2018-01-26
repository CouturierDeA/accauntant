<template>
    <section class="container">
        <h1 class="section__title">First Page</h1>
        <div class="section__controlls">
            <el-button @click="$router.push('/accountant-table')">Accountant</el-button>
        </div>
    </section>
</template>

<script>
    import dataBus from '../../../data/data.bus';

    export default {
        data() {
            return {
                visible: false,
                visible2: false
            }
        },
        methods: {
            callPopup(popup_name = null) {
                dataBus.current_popup = popup_name;
            }
        }
    }
</script>
