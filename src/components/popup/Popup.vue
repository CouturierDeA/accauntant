<template>
    <transition name="fade" mode="in-out">
        <div id="popup" class="popup" v-if="currentPopup">
            <div class="popup__wrap">
                <div class="popup__container" ref="popupContent" tabindex="1">
                    <div class="popup__content">
                        <p class="popup__title">{{ title }}</p>
                        <slot>
                        </slot>
                        <svg class="popup__close" @click="switchPopupTo()">
                            <use xlink:href="#close"></use>
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
    import dataBus from '../../data/data.bus';
    import FirstPopup from './first-popup/FirstPopup';

    export default {
        components: {
            FirstPopup
        },
        props: {
            visible: this.visible,
            title: {
                default: () => {
                    return 'Popup message'
                }
            }
        },
        data() {
            return {
                name: 'popup',
            }
        },
        mounted() {
            document.body.addEventListener('keyup', this.onKey);
        },
        destroyed() {
            document.body.removeEventListener('keyup', this.onKey)
        },
        methods: {
            switchPopupTo(popup_name = null) {
                dataBus.$emit('state_popup', popup_name);
            },
            onKey(event) {
                event.preventDefault();
                if (event.keyCode === 27) this.switchPopupTo();
            }
        },
        computed: {
            currentPopup() {
                this.$nextTick(() => {
                    const element = this.$refs.popupContent;
                    if (element && element.$el) {
                        element.$el.focus();
                    }
                });
                return this.visible;
            }
        }
    }
</script>

<style lang="scss" src="./Popup.scss"></style>

