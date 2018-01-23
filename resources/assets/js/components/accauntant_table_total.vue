<template>
    <ul class="table__row mod--total">
        <li class="table__cell">Total :</li>
        <li class="table__cell">{{ computedDataBus.total_count }} items</li>
        <li class="table__cell">{{ computedDataBus.total_price }} $</li>
        <li class="table__cell"></li>
    </ul>
</template>

<script>
    import dataBus from './data_bus';

    export default {
        computed: {
            computedDataBus() {
                return dataBus;
            }
        }
    }

</script>
