<template>
    <transition name="fade">

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
                <el-button @click="visible=true">Delete</el-button>
            </li>
        </ul>
        <el-dialog :visible.sync="visible" title="Sure?">
            <el-button @click="deleteRow(item)">Yes</el-button>
        </el-dialog>
    </transition>
</template>

<script>
    import dataBus from '../../../data/data.bus';

    export default {
        props: {
            item: this.item
        },
        data() {
            return {
                visible: false
            }
        },
        methods: {
            deleteRow(item) {
                this.visible=false;
                dataBus.$emit('deleteItem', item);
            }
        }
    }
</script>

