<template>
    <section class="container">
        <h1 class="section__title">Sign-In</h1>
        <div class="section__controlls">
            <el-button @click="callPopup('FirstPopup')">Show custom popup</el-button>
            <el-button @click="visible=true">Show popup</el-button>
            <el-dialog :visible.sync="visible" title="First Modal">
                <el-button @click="visible2=true">Show second popup</el-button>
            </el-dialog>
            <el-dialog :visible.sync="visible2" title="Second Modal">
                <el-button @click="visible2=false">Show first popup</el-button>
            </el-dialog>
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
