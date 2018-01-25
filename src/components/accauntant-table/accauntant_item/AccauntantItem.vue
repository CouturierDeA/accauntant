<template>
    <ul class="table__row">
        <li class="table__cell">
            <el-input v-model="item.name"></el-input>
        </li>
        <li class="table__cell">
            <el-input-number v-model="item.number" controls-position="right" :min="1" :max="100"></el-input-number>
        </li>
        <li class="table__cell">
            <el-input-number v-model="item.price" controls-position="right" :min="1" :max="10000"></el-input-number>
        </li>
        <li class="table__cell table__btn mod--delete">
            <el-button @click="deleteRow(item)">Delete</el-button>
        </li>
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

