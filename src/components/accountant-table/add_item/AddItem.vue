<template>
    <div class="table-add__wrap">
        <el-table class="table-add"
                  width="100%"
                  :data="[new_item]">
            <el-table-column
                    prop="name"
                    label="name"
                    :width="cell_width">
                <el-input placeholder="Item name" slot-scope="scope"
                          v-model="scope.row.name"/>
            </el-table-column>
            <el-table-column
                    prop="number"
                    label="number"
                    :width="cell_width">
                <el-input-number slot-scope="scope"
                                 v-model="scope.row.number"
                                 controls-position="right"
                                 :min="1" :max="100"/>
            </el-table-column>
            <el-table-column
                    class="table-options"
                    prop="price"
                    label="price"
                    :width="cell_width">
                <el-input-number slot-scope="scope"
                                 v-model="scope.row.price"
                                 controls-position="right"
                                 :min="1" :max="100"/>
            </el-table-column>
            <el-table-column
                    :width="cell_width"
                    label="Operations">
                <el-row slot-scope="scope" type="flex" justify="end">
                    <el-button type="success" @click="addItem()">Add</el-button>
                </el-row>
            </el-table-column>
        </el-table>

    </div>

</template>

<script>
    import {Item} from '../../../data/data.Item';
    import dataBus from '../../../data/data.bus';

    export default {
        data() {
            return {
                new_item: new Item(),
                visible: false,
                cell_width: 205
            }
        },
        methods: {

            addItem() {
                if (!this.hasName) {
                    this.$prompt('Enter the item name.', 'Tip', {
                        confirmButtonText: 'OK',
                        cancelButtonText: 'Cancel',
                        inputValidator: (value)=>{
                            return (value ? true : 'Name cannot be empty string')
                        }

                    }).then(value => {
                        this.new_item.name=value.value;
                        dataBus.items.push(new Item(this.new_item));
                        this.new_item = new Item();
                        this.$message({
                            type: 'success',
                            message: value.value + ' item added.'
                        });
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: 'Adding canceled'
                        });
                    });

                } else {
                    const item_name = this.new_item.name;
                    dataBus.items.push(new Item(this.new_item));
                    this.new_item = new Item();
                    this.$message({
                        type: 'success',
                        message: item_name + ' item added.'
                    });
                }
            }
        },
        computed: {
            hasName() {
                return (this.new_item.name && this.new_item.name.length > 0);
            },
            computedItems() {
                return dataBus.$data.items
            }
        }
    }
</script>

<style lang="scss" src="./AddItem.scss"></style>
