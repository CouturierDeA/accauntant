<template>
    <div class="tab">
        <h3 class="tab__title">{{ title }}</h3>
        <ul class="tab__controls" v-if="computedControls.length > 0">
            <li class="tab__control"
                v-for="(control,key) in computedControls"
                :class="{ 'active': activeTab === control.name}">
                <button class="tab__control-btn" @click="switchTab(control.name)">
                    {{ control.name }} {{ control.link.count }}
                </button>
            </li>
        </ul>
        <slot></slot>
    </div>
</template>

<script>
    export default {
        props: {
            title: {
                default: () => {
                    return 'Tabs'
                }
            },
            activeTab: {
                default: () => {
                    return 'activeTab'
                }
            }
        },
        data() {
            return {
                name: 'tab',
                controls: []
            }
        },
        watch: {
            computedTab: function (val) {
                // console.log(val);
            }
        },
        computed: {
            computedTab() {
                return this.activeTab;
            },
            computedControls() {
                return this.controls;
            }
        },
        methods: {
            switchTab(tabName) {
                // this.activeTab = tabName;
                this.$emit('update:activeTab', tabName)
            },
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
