<template>
    <div class="tab__controls" v-if="computedControls.length > 0">
        <div class="tab__control"
             v-for="control in computedControls"
             :class="{ 'tab__control': true, 'active': activeTab === control.component.name}">

            <button class="tab__control-btn" @click="switchTab(control.component.name,control.component.count)">
                {{ control.component.label }} {{ control.component.count ? control.component.count : '' }}
            </button>
        </div>
    </div>
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
            switchTab(tabName, count = null) {
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

<style lang="scss" src="./TabControls.scss"></style>
