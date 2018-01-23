<template>
    <ul class="table__row">
        <li class="table__cell">
            <input type="text" v-model="item.name">
        </li>
        <li class="table__cell">
            <input type="number" v-model="item.number">
        </li>
        <li class="table__cell">
            <input type="number" v-model="item.price">
        </li>
        <li class="table__cell table__btn mod--delete" @click="deleteRow(item)">Delete</li>
    </ul>
</template>

<script>
    import dataBus from '../../../data/data.bus';

    export default {
        props: {
            item: this.item
        },
        methods: {
            deleteRow(item) {
                dataBus.$emit('deleteItem', item);
            }
        }
    }
</script>

