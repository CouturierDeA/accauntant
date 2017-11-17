<template>

    <div id="app">

        <accauntant_table>

            <accauntant_table_header slot="header"/>

            <accauntant_table_total slot="total"/>

        </accauntant_table>

        <add_item/>

    </div>

</template>

<script>

    import accauntant_table from './components/accauntant_table';

    import accauntant_table_header from './components/accauntant_table_header.vue';

    import accauntant_table_total from './components/accauntant_table_total.vue';

    import add_item from './components/add_item.vue';

    export default {

        components: {

            accauntant_table,

            accauntant_table_header,

            accauntant_table_total,

            add_item

        }

    }

</script>
