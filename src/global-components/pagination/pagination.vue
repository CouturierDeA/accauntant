<template>
  <el-pagination v-show="isVisible"
                 @size-change="handleSizeChange"
                 @current-change="handleCurrentChange"
                 :page-sizes="entries"
                 :page-size="pageSize"
                 :current-page.sync="page"
                 layout="total, sizes, prev, pager, next"
                 :total="totalCount">
  </el-pagination>
</template>
<script>

  export default {
    data() {
      return {
        entries: [5, 10, 25, 50],
        skipCount: 0,
        pageSize: 5,
        orderBy: '',
        page: 1,
        order: '',
        totalCount: 0,
      }
    },
    computed: {
      isVisible() {
        if (!this.items) {
          return false;
        }
        this.totalCount = this.items.length;
        const items = JSON.parse(JSON.stringify(this.items));

        if (items && items.sort && this.sortBy) {
          items.sort((a, b) => {
            if (a[this.sortBy] > b[this.sortBy]) return -1;
            if (a[this.sortBy] < b[this.sortBy]) return 1;
            return 0;
          });
        }

        const pageSize = this.pageSize;
        const page = this.page;

        this.skipCount = pageSize * page - pageSize;

        if (this.totalCount > this.pageSize) {
          let paggedItems = [];
          const lastItem = this.skipCount + this.pageSize;
          const lastIteration = (lastItem < items.length) ? lastItem : items.length;

          for (let i = this.skipCount; i < lastIteration; i++) {
            paggedItems.push(items[i])
          }
          this.$emit('update:sortedItems', paggedItems);

        } else {
          this.$emit('update:sortedItems', this.items);
        }
        return (items.length > 5);
      }
    },
    props: ['items', 'sortedItems', 'sortBy'],
    methods: {
      handleSizeChange(val) {
        this.pageSize = val;
      },
      handleCurrentChange(val) {
        this.page = val
      },
    },
  }
</script>
