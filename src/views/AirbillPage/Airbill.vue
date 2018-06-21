<template>
  <div class="d-flex flex-wrap p-gw m-b-gw row-half justify-content-start" v-loading="$store.state.loading">
    <h1 class="section__title xs-24 m-b-gw m-t-gw">{{ $t('airbill.title') }}</h1>
    <div class="form__control d-inline-flex flex-column xs-24 cmd-18 m-b-gw">
      <AirbillAddItem class="  overflow-x-auto flex-column d-inline-flex xs-olumn d-inline-flex">
        <slot slot="search">
          <el-input class="m-b-gw m-t-gw" v-model="$store.state.workItems.searchInput"
                    :placeholder=" $t('general.search')">
            <template slot="append">
              <el-button type="primary" :disabled="$store.state.workItems.searchInput.length < 1"
                         @click="clear">{{ $t('general.clear') }}
              </el-button>
            </template>
          </el-input>
        </slot>
      </AirbillAddItem>
      <div class="table__wrap d-flex flex-wrap">
        <Pagination class="xs-24 d-inline-flex m-t-gw m-b-gw"
                    sortBy="name"
                    v-bind:items.sync="computedItems"
                    v-bind:sortedItems.sync="computedSortedItems"/>
        <div class="xs-24 custom-table__wrap">
          <el-table class="xs-24 custom-table"
                    border
                    :data="computedSortedItems"
                    width="100%">
            <el-table-column
              prop="name"
              :label="$t('general.name')"
              :min-width="cell_width">
              <el-input slot-scope="scope"
                        @change="tableValChanged(scope)"
                        v-model="scope.row.name"
                        placeholder="Item name"/>
            </el-table-column>
            <el-table-column
              prop="number"
              label="number"
              :label="$t('general.number')"
              :min-width="cell_width">
              <el-input-number slot-scope="scope"
                               v-model="scope.row.number"
                               @change="tableValChanged(scope)"
                               controls-position="right"
                               :min="0" :max="100"/>
            </el-table-column>
            <el-table-column
              prop="price"
              :label="$t('general.price')"
              :min-width="cell_width">
              <el-input-number slot-scope="scope"
                               v-model="scope.row.price"
                               @change="tableValChanged(scope)"
                               controls-position="right"
                               :min="0" :max="100"/>
            </el-table-column>
            <el-table-column
              prop="checked"
              :label="$t('general.checked')"
              :min-width="cell_width">
              <el-checkbox slot-scope="scope"
                           v-model="scope.row.checked"
                           @change="tableValChanged(scope)">Checked
              </el-checkbox>
            </el-table-column>
            <el-table-column
              prop="type"
              :label="$t('general.type')"
              :min-width="cell_width + 40">
              <el-select slot-scope="scope"
                         @change="tableValChanged(scope)"
                         v-model="scope.row.type">
                <el-option v-for="(type,index,key) in types" :key="key" :value="type.id" :label="$t(type.name)"/>
              </el-select>
            </el-table-column>
            <el-table-column
              fixed="right"
              :min-width="cell_width"
              label="Operations">
              <el-row slot-scope="scope" type="flex" justify="end">
                <el-button type="danger"
                           @click="handleDelete(scope.$index, scope.row)">Delete
                </el-button>
              </el-row>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
    <AirbillSummary class="form__control align-self-start xs-24 cmd-6 flex-column flex-column d-inline-flex m-b-gw"/>
  </div>


</template>

<script>
  import AirbillSummary from './AirbillSummary/AirbillSummary.vue';
  import AirbillAddItem from './AirbillAddItem/AirbillAddItem.vue';
  import {Item} from '../../data/data.ItemClass'

  export default {
    metaInfo() {
      return {title: this.$t('airbill.title')};
    },
    components: {
      AirbillSummary,
      AirbillAddItem
    },
    data() {
      return {
        items: [],
        cell_width: 120,
        sortedItems: [],
      }
    },
    created() {
      this.types = [
        {id: null, name: 'general.not_selected'},
        {id: 1, name: 'airbill.task'},
        {id: 2, name: 'airbill.bug'}
      ];

      this.fetchTasks();
    },
    methods: {
      clear() {
        this.$store.state.workItems.searchInput = ''
      },
      fetchTasks() {
        return this.$store.dispatch('workItems/getTasks');
      },
      updateItemOnServer(item) {
        return this.$store.dispatch('workItems/saveTask', item);
      },
      tableValChanged(scope) {
        this.updateItemOnServer(scope.row)
      },
      handleDelete($index, $row) {
        const name = $row.name;

        this.$confirm('This will permanently delete the item. Continue?', 'Warning', {
          confirmButtonText: 'OK',
          cancelButtonText: 'Cancel',
          type: 'warning'

        }).then(() => {
          this.$store.dispatch('workItems/deleteTask', name)

        }).catch(() => {
          this.$message({
            type: 'info',
            message: 'Delete canceled'
          });
        });

      },
    },
    computed: {
      computedSortedItems: {
        get: function () {
          return this.sortedItems;
        },
        set: function (val) {
          return this.sortedItems = val;
        },
      },
      computedItems() {
        // console.warn(this.$store.getters['workItems/workItems']);
        return this.$store.getters['workItems/workItems'];
      }
    }
  }

</script>

<style src="./Airbill.scss" lang="scss"></style>


