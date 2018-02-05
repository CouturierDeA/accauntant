<template>
    <p class="error" v-show="computedErrorMsg">{{ computedErrorMsg }}</p>
</template>

<script>

    export default {
        props: {
            error: '',
            errorText: false
        },
        computed: {
            computedErrorMsg() {
                let errorMsg = false;
                if (!this.errorText) {
                    if (this.error) {
                        errorMsg = this.$t('errors.common');

                        switch (this.error) {
                            case 1:
                                return errorMsg = this.$t('errors.access_denied').toString();
                        }
                    }
                } else {
                    errorMsg = this.errorText
                }
                return errorMsg;
            }
        },
    }
</script>
