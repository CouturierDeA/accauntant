<template>
    <div class="container">
        <googleMap></googleMap>
        <h1 class="section__title">{{ $t('accountant-table.title') }}</h1>
        <div class="form__controll">

            <div class="table__wrap">
                <AddItem/>
                <el-table class="custom-table"
                          :data="computedItems"
                          width="100%">
                    <el-table-column
                            prop="name"
                            label="name"
                            :width="cell_width">
                        <el-input slot-scope="scope"
                                  v-model="scope.row.name"
                                  placeholder="Item name"/>
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
                            <el-button type="danger"
                                       @click="handleDelete(scope.$index, scope.row)">Delete
                            </el-button>
                        </el-row>
                    </el-table-column>
                </el-table>
                <AccountantTableTotal/>


            </div>
        </div>

    </div>


</template>

<script>
    import AccountantTableTotal from './accountant_table_total/AccountantTableTotal.vue';
    import AddItem from './add_item/AddItem.vue';
    import dataBus from '../../data/data.bus';
    import googleMap from '../../components/google-map/google-map';

    export default {
        metaInfo() {
            return {title: this.$t('accountant-table.title')};
        },
        components: {
            AccountantTableTotal,
            googleMap,
            AddItem
        },
        data() {
            return {
                items: dataBus.$data.items,
                cell_width: 183,
                pageItems: [],
                skipCount: 0,
                pageSize: 2,
                totalCount: -1
            }
        },
        methods: {
            handleDelete($index, $row) {
                this.$confirm('This will permanently delete the item. Continue?', 'Warning', {
                    confirmButtonText: 'OK',
                    cancelButtonText: 'Cancel',
                    type: 'warning'
                }).then(() => {
                    this.$delete(this.items, this.items.indexOf($row));
                    this.$message({
                        type: 'success',
                        message: 'Delete completed'
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: 'Delete canceled'
                    });
                });

            },
        },
        computed: {
            count() {
                return dataBus.$data.total_count;
            },
            computedItems: {
                get: function () {
                    let total_count = 0;
                    let total_price = 0;
                    this.pageItems = [];

                    for (let i = 0; i < this.items.length; i++) {
                        let item = this.items[i];

                        if (i >= this.skipCount && i < (this.skipCount + this.pageSize)) {
                            this.pageItems.push(item);
                        }


                        total_count += parseInt(item.number);
                        total_price += parseInt(item.number) * parseInt(item.price);
                    }

                    dataBus.$data.total_count = total_count;
                    dataBus.$data.total_price = total_price;

                    return this.pageItems;
                },
            }
        }
    }

</script>

<style src="./AccountantTable.scss" lang="scss"></style>


