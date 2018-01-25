<template>
    <div class="container">
        <div class="table__wrap">
            <div class="table">
                <AccauntantTableHeader/>
                <AccauntantItem
                        v-for="(item,key) in computedItems"
                        v-bind:item="item" :key="key"
                />
                <AccauntantTableTotal/>
                <AddItem/>
            </div>
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
        created() {
            dataBus.$on('deleteItem', item => {
                this.$delete(this.items, this.items.indexOf(item))
            })

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

