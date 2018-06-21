<template>
  <div class="">
    <b class="m-b-gw">Summary:</b>
    <dl v-for="(price,key) in computedPrices" :key="key" class="d-flex flex-wrap row-half d-inline-flex xs-24 m-b-gw">
      <dt class="d-inline-flex cxs-12"><b>{{ key }} ($/item)</b></dt>
      <dd class="d-inline-flex cxs-12">{{ price.total_price  }}$ ({{ price.total_items }} items)</dd>
    </dl>
    <dl class="xs-24 m-t-gw d-flex flex-wrap row-half">
      <dt class="d-inline-flex cxs-12 m-b-gw"><b>{{ $t('general.count') }}</b></dt>
      <dd class="d-inline-flex cxs-12 m-b-gw">{{ computedPricesSummary.items.length }}</dd>
      <dt class="d-inline-flex cxs-12 m-b-gw"><b>{{ $t('general.price') }} $</b></dt>
      <dd class="d-inline-flex cxs-12 m-b-gw">{{ computedPricesSummary.price }}</dd>
      <dt class="d-inline-flex cxs-12 m-b-gw"><b>{{ $t('general.number') }}</b></dt>
      <dd class="d-inline-flex cxs-12 m-b-gw">{{ computedPricesSummary.number }}</dd>
    </dl>
  </div>
</template>

<script>
  export default {
    methods: {
      clear() {
        this.$store.state.workItems.searchInput = ''
      }
    },
    computed: {
      computedPricesSummary() {
        return this.$store.state.workItems.summary
      },
      computedPrices() {
        return this.$store.state.workItems.summary.prices;
      },
    }
  }

</script>

<style src="./AirbillSummary.scss" lang="scss"></style>

