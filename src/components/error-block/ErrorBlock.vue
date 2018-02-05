<template>
    <p class="error" v-show="computedErrorMsg">{{ computedErrorMsg }}</p>
</template>

<script>

    export default {
        props: {
            error: '',
            errorText: false
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
                return (this.errorText) ? this.errorText : (this.error ? this.swithError(this.error) : false);
            }
        },
    }
</script>
