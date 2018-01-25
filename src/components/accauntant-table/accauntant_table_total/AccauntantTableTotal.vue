<template>
    <el-table class="custom-table"
              :data="computedDataBus"
              style="width: 100%">
        <el-table-column
                prop="total_count"
                label="Total Count"
                width="180px">
        </el-table-column>
        <el-table-column
                prop="total_price"
                label="Total Price"
                width="180px">
        </el-table-column>
    </el-table>
</template>

<script>
    import dataBus from '../../../data/data.bus';

    export default {
        computed: {
            computedDataBus() {
                return [dataBus];
            },
        }
    }

</script>


