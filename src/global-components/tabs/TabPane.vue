<template>
    <div class="tab__pane" v-if="computedTab === name" :class="classObj">
        <slot></slot>
    </div>

</template>

<script>

    export default {
        data() {
            return {
                control: {name: this.name, label: this.label, count: this.count, component: this},
                shift: 0
            }
        },
        props: {
            name: {
                default: () => {
                    return 'TabPane'
                }
            },
            label: {
                default: () => {
                    return 'Label'
                }
            },
            count: {
                default: () => {
                    return 0
                }
            },
            tab: this.tab
        },
        mounted() {
        },
        created() {
            this.addControll()
        },
        destroyed() {
            this.removeControll()

        },
        methods: {
            addControll() {
                const controls = this.$parent.controls;

                if (controls.indexOf(this.control) === -1) {
                    controls.push(this.control);
                }

            },
            removeControll() {
                const controls = this.$parent.controls;
                const controlIndex = controls.indexOf(this.control);

                if (controlIndex !== -1) {
                    this.$delete(controls, controlIndex);
                }

            }
        },
        computed: {
            computedTab() {
                return this.$parent.activeTab;
            },
            classObj() {
                return {
                    [`mod--${this.name}`]: this.name,
                    active: (this.computedTab === this.name)
                }
            },
        },
    };

</script>

<style lang="scss" src="./TabPane.scss"></style>
