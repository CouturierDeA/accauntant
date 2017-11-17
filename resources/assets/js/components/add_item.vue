<template>

    <div class="table">

        <ul class="table__row">

            <li class="table__cell"><input type="text" placeholder="add item" v-model="new_item.name"></li>

            <li class="table__cell"><input type="number" v-model="new_item.number"></li>

            <li class="table__cell"><input type="number" v-model="new_item.price"></li>

            <li class="table__cell table__btn mod--add" @click="addItem()">Add</li>

        </ul>

    </div>

</template>

<script>

    import {Item} from './data.Item';

    import dataBus from './data_bus';

    export default {

        data(){

            return {

                new_item: new Item()

            }

        },

        methods: {

            addItem(){

                this.computedItems.push(new Item(this.new_item));

                this.new_item = new Item();

            }

        },

        computed:{

            computedItems(){

                return dataBus.$data.items
            }
        }

    }
</script>
