<template>

    <div class="table">

        <slot name="header"></slot>

        <accauntant_item v-for="(item,key) in computedItems" v-bind:item="item"></accauntant_item>

        <slot name="total"></slot>

    </div>

</template>

<script>

    import accauntant_item from './accauntant_item.vue';

    import dataBus from './data_bus';


    export default {

        data(){

            return {

                items: dataBus.$data.items,

            }

        },
        created(){

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

        },
        components: {

            accauntant_item,


        }

    }

</script>
