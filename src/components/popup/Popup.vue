<template>
    <transition name="fade" mode="in-out">
        <div id="popup" class="popup" v-if="currentPopup">
            <div class="popup__wrap">
                <div class="popup__container">
                    <component class="container" v-bind:is="currentPopup">
                        <transition name="fade" mode="out-in">

                        </transition>
                        <transition name="fade" mode="out-in">

                        </transition>
                        <transition name="fade" mode="out-in">

                        </transition>
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
        methods: {
            switchPopupTo(popup_name = null) {
                dataBus.current_popup = popup_name;
            }
        },
        computed: {
            currentPopup() {
                return dataBus.current_popup;
            }
        }
    }
</script>

<style lang="scss" src="./Popup.scss"></style>

