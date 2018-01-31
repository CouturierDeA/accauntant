<template>
    <ul class="tab__controls" v-if="computedControls.length > 0">
        <li class="tab__control"
            v-for="control in computedControls"
            :class="{ 'tab__control': true, 'active': activeTab === control.component.name}">

            <button class="tab__control-btn" @click="switchTab(control.component.name)">
                {{ control.component.name }} {{ control.component.count ? control.component.count : '' }}
            </button>
        </li>
    </ul>
</template>

<script>

    export default {
        props: {
            controls: {
                type: Array,
                default: () => {
                    return []
                }
            },
            activeTab: {
                default: () => {
                    return false
                }
            }
        },
        methods: {
            switchTab(tabName) {
                this.$emit('activeTab', tabName)
            },
        },
        computed: {
            computedControls() {
                return this.controls;
            }
        }
    };

</script>

<style lang="scss">
    @import "../../../scss/core";

    .tab__controls {
        display: flex;
        flex-wrap: wrap;

    }

    .tab__control-btn {
        @extend %btn;
        @extend %unselectable;
    }

    .tab__control {
        list-style: none;

        &.active button {
            background-color: $green;
            border-color: $green;
            color: white;

            cursor: default;

            &:focus {
                outline: $green;
                border-color: $green;
            }
        }
    }

</style>
