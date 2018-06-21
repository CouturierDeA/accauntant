<template>
  <div class="table-add__wrap">
    <el-table class="table-add"
              border
              width="100%"
              :data="[new_item]">

      <el-table-column
        prop="name"
        :label="$t('general.add_item')"
        :min-width="cell_width">
        <el-input :placeholder="$t('general.item_name')" slot-scope="scope"
                  v-model="scope.row.name"/>
      </el-table-column>
      <el-table-column
        prop="number"
        :label="$t('general.number')"
        :min-width="cell_width">
        <el-input-number slot-scope="scope"
                         v-model="scope.row.number"
                         controls-position="right"
                         :min="0" :max="100"/>
      </el-table-column>
      <el-table-column
        class="options"
        prop="price"
        :label="$t('general.price')"
        :min-width="cell_width">
        <el-input-number slot-scope="scope"
                         v-model="scope.row.price"
                         controls-position="right"
                         :min="0" :max="100"/>
      </el-table-column>
      <el-table-column
        fixed="right"
        :min-width="100"
        :label="$t('general.operations')">
        <el-row slot-scope="scope" type="flex" justify="end">
          <el-button type="primary" @click="onAddItem()">{{ $t('general.add') }}</el-button>
        </el-row>
      </el-table-column>
    </el-table>
    <slot name="search"></slot>
  </div>

</template>

<script>
  import {Item} from '../../../data/data.ItemClass';
  import VeeValidate from 'vee-validate';

  export default {
    props: ['items'],
    data() {
      return {
        new_item: new Item(),
        visible: false,
        cell_width: 183
      }
    },
    methods: {
      addItem() {
        return this.$store.dispatch('workItems/saveTask', this.new_item).then(() => {
          this.new_item = new Item();
        });
      },
      onAddItem() {
        if (!this.hasName) {
          this.$prompt('Enter the item name.', this.$t('general.tip'), {
            confirmButtonText: this.$t('general.ok'),
            cancelButtonText: 'Cancel',

            inputValidator: (value) => {
              return (VeeValidate.Rules.required(value) ?
                true :
                this.$t('validation.messages.required').replace('{fieldName}', this.$t('validation.attributes.name')))
            }

          }).then(value => {
            this.new_item.name = value.value;
            this.addItem();
          }).catch(() => {
            this.$message({
              type: 'info',
              message: 'Adding canceled'
            });
          });
        } else {
          this.addItem();
        }
      }
    },
    computed: {
      hasName() {
        return (this.new_item.name && this.new_item.name.length > 0);
      },
    }
  }
</script>

<style lang="scss" src="./AirbillAddItem.scss"></style>
