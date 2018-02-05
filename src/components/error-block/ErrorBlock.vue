<template>
    <p class="error" v-show="computedErrorMsg">{{ computedErrorMsg }}</p>
</template>

<script>

    export default {
        props: {
            error: false,
        },
        methods: {
            swithError(error) {
                switch (error) {
                    case 1:
                        return this.$t('errors.access_denied').toString();
                }
                return this.$t('errors.common').toString()
            }
        },
        computed: {
            computedErrorMsg() {
                return (this.error ? this.swithError(this.error) : false);
            }
        },
    }
</script>

<style lang="scss" scoped>
    @import "../../scss/core";

    .error {
        color: $red;
    }

</style>
