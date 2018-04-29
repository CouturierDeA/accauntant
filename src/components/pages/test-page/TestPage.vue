<template>
    <section class="container">
        <PageTemplate>
            <slot slot="aside">
                <div class="custom__style">
                    Aside
                </div>
            </slot>
            <slot slot="content">
                <h1 class="section__title">{{ $t('test_page.title') }}</h1>
                <div class="section__controlls">
                    <ErrorBlock v-bind:error="computedErrorMsg"/>
                </div>
            </slot>
        </PageTemplate>

    </section>
</template>

<script>

    export default {
        components: {},
        metaInfo() {
            return {title: 'Vue app example'};
        },
        watch: {
            '$router': function (val) {
                console.warn('route change params id', val);
            }
        },
        data() {
            return {
                errorMsg: false,
                visible: false,
                user: {
                    maritalStatus: 1,
                },
                maritalStatuses: [],
            }
        },
        computed: {
            computedErrorMsg() {
                return this.errorMsg;
            },
        },
        methods: {}
    }
</script>

<style lang="scss">
    @import "../../../scss/core";

    .custom__style {
        line-height: 1.7;
        font-size: 30px;
    }

    .custom__style {
        color: red
    }

    .form__input-wrap {
        position: relative;

        .form__field-message {
            position: absolute;
            left: 16px;
            z-index: 2;

            display: block;

            margin-top: 7px;

            font-size: 13px;
        }
    }

    .form__input {
        margin-top: $gw*1.5;
    }

    .form__input.mod__error {
        input,
        input:focus {
            border-color: $red;
        }
        & + .form__field-message {
            color: $red;
        }
    }

    .form__submit {
        margin-top: $gw;
    }

</style>


