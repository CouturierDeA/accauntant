<template>
    <ul :class="classObj">
        <li class="language-switcher__li" v-for="locale in locales" :class="{ active: isActive(locale) }">
            <a class="language-switcher__link"
               href="#"
               :class="{ active: isActive(locale) }"
               @click.prevent="change(locale)">{{ locale }}</a>
        </li>
    </ul>

</template>

<script>
    import VueInternalization from '../../I18n';

    export default {
        props: {
            class_name: {
                default: () => {
                    return 'language-switcher'
                }
            }
        },
        data() {
            return {}
        },
        computed: {
            classObj() {
                return [this.class_name]
            },
            locales() {
                return VueInternalization.locales;
            }
        },
        methods: {
            isActive(locale) {
                return (locale === this.$i18n.locale);
            },

            change(locale) {
                if (!this.isActive(locale)) {
                    this.$store.dispatch('setLocale', locale);
                }
            }
        }


    }

</script>

<style lang="scss">
    @import "../../scss/core";

    .language-switcher {
        display: flex;
        flex-wrap: wrap;
        list-style: none;

    }

    .language-switcher__li {
        list-style: none;
        display: inline;

    }

    .language-switcher__link {
        @extend %unselectable;
        /*display: block;*/
        padding: $gw/2;
        text-decoration: none;
        transition: color $transition;
        color: $text-primary;

        &.active {
            cursor: default;
        }

        &.active, &:hover {
            color: $secondary;
        }
    }

</style>

