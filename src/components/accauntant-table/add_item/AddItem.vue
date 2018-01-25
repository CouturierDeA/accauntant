<template>
    <ul class="table__row">
        <li class="table__cell">
            <el-input placeholder="Item name" v-model="new_item.name"></el-input>
        </li>
        <li class="table__cell">
            <el-input-number v-model="new_item.number" controls-position="right" :min="1" :max="100"></el-input-number>
        </li>
        <li class="table__cell">
            <el-input-number v-model="new_item.price" controls-position="right" :min="1" :max="100"></el-input-number>
        </li>
        <li class="table__cell table__btn mod--add">
            <el-button @click="addItem()">
                Add
            </el-button>
            <el-dialog :visible.sync="visible" title="Enter name of the item first!">
                <el-input  @keyup.13="addItem()" v-model="new_item.name"></el-input>
                <el-button @click="addItem()">
                    Add
                </el-button>
            </el-dialog>
        </li>
    </ul>

</template>

<script>
    import {Item} from '../../../data/data.Item';
    import dataBus from '../../../data/data.bus';

    export default {
        data() {
            return {
                new_item: new Item(),
                visible: false
            }
        },
        methods: {
            addItem() {
                if (this.new_item.name.length <= 0) {
                    this.visible = true;
                }else{
                    this.computedItems.push(new Item(this.new_item));
                    this.visible = false;
                    this.new_item = new Item();
                }
            }
        },
        computed: {
            computedItems() {
                return dataBus.$data.items
            }
        }
    }
</script>

