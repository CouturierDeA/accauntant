<template>
    <div class="container">
        <div class="table__wrap">
            <el-table class="custom-table"
                      :data="computedItems"
                      style="width: 100%">
                <el-table-column
                        prop="name"
                        label="name"
                        width="180px">
                    <el-input slot-scope="scope"
                              v-model="scope.row.name"
                              placeholder="Item name"/>

                </el-table-column>
                <el-table-column
                        prop="number"
                        label="number"
                        width="180px">
                    <el-input-number slot-scope="scope"
                                     v-model="scope.row.number"
                                     controls-position="right"
                                     :min="1" :max="100"/>
                </el-table-column>
                <el-table-column
                        prop="price"
                        label="price"
                        width="180px">
                    <el-input-number slot-scope="scope"
                                     v-model="scope.row.price"
                                     controls-position="right"
                                     :min="1" :max="100"/>
                </el-table-column>
                <el-table-column
                        label="Operations">
                    <template slot-scope="scope">
                        <el-button
                                size="mini"
                                type="danger"
                                @click="handleDelete(scope.$index, scope.row)">Delete
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <AccauntantTableTotal/>
            <AddItem/>
        </div>
    </div>

</template>

<script>
    import AccauntantItem from './accauntant_item/AccauntantItem.vue';
    import AccauntantTableHeader from './accauntant_table_header/AccauntantTableHeader.vue';
    import AccauntantTableTotal from './accauntant_table_total/AccauntantTableTotal.vue';
    import AddItem from './add_item/AddItem.vue';
    import dataBus from '../../data/data.bus';

    export default {
        components: {
            AccauntantItem,
            AccauntantTableHeader,
            AccauntantTableTotal,
            AddItem
        },
        data() {
            return {
                items: dataBus.$data.items,
            }
        },
        methods: {
            handleDelete($index, $row) {
                this.$delete(this.items, this.items.indexOf($row))
            },

        },
        computed: {
            computedItems: {
                get: function () {
                    let total_count = 0;
                    let total_price = 0;

                    for (let i = 0; i < this.items.length; i++) {
                        let item = this.items[i];
                        total_count += parseInt(item.number);
                        total_price += parseInt(item.number) * parseInt(item.price);
                    }
                    dataBus.$data.total_count = total_count;
                    dataBus.$data.total_price = total_price;

                    return this.items;
                },
            }
        }
    }

</script>

<style src="./AccountantTable.scss" lang="scss"></style>

