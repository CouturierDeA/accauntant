<template>
   <transition name="fade" mode="out-in">
       <div class="table-total__wrap" v-if="computedDataBusItems.length>0">
           <el-table class="table-total"
                     width="100%"
                     :data="computedDataBus">
               <el-table-column
                       prop="total_count"
                       label="Total Number"
                       width="100">
               </el-table-column>
               <el-table-column
                       prop="total_price"
                       label="Total Price"
                       width="100">
               </el-table-column>
           </el-table>
       </div>
   </transition>


</template>

<script>
    import dataBus from '../../../data/data.bus';

    export default {
        computed: {
            computedDataBusItems() {
                return dataBus.items;
            },
            computedDataBus() {
                return [dataBus];
            },
        }
    }

</script>

<style src="./AccountantTableTotal.scss" lang="scss"></style>

