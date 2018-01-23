<template>
    <ul class="table__row mod--total" v-if="computedDataBus">
        <li class="table__cell">Total :</li>
        <li class="table__cell">{{ computedDataBus.total_count }} items</li>
        <li class="table__cell">{{ computedDataBus.total_price }} $</li>
        <li class="table__cell"></li>
    </ul>
</template>

<script>
    import dataBus from '../../../data/data.bus';

    export default {
        computed: {
            computedDataBus() {
                if (dataBus.total_count && dataBus.total_price){
                    return dataBus
                }else{
                    return false
                }
            }
        }
    }

</script>


