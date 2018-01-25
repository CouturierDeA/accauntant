<template>
    <transition name="fade" mode="in-out">
        <div id="popup" class="popup" v-if="currentPopup">
            <div class="popup__wrap">
                <div class="popup__container">
                    <component class="container"
                               ref="popupContent"
                               tabindex="1"
                               v-bind:is="currentPopup">
                        <button v-if="currentPopup !='FirstPopup'"
                                @click="switchPopupTo('FirstPopup')"
                        >Switch to the first popup
                        </button>
                        <button v-if="currentPopup !='SecondPopup'"
                                @click="switchPopupTo('SecondPopup')"
                        >Switch to the second popup
                        </button>
                        <svg class="popup__close" @click="switchPopupTo()">
                            <use xlink:href="#close"></use>
                        </svg>
                    </component>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
    import dataBus from '../../data/data.bus';
    import FirstPopup from './first-popup/FirstPopup.vue';
    import SecondPopup from './second-popup/SecondPopup.vue';

    export default {
        components: {
            FirstPopup,
            SecondPopup,
        },
        mounted() {
            document.body.addEventListener('keyup', this.onKey)
        },
        destroyed() {
            document.body.removeEventListener('keyup', this.onKey)
        },
        methods: {
            switchPopupTo(popup_name = null) {
                dataBus.current_popup = popup_name;
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

                return dataBus.current_popup;
            }
        }
    }
</script>

<style lang="scss" src="./Popup.scss"></style>

