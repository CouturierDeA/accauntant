<template>
    <transition name="fade" mode="in-out">
        <div id="popup" class="popup" v-if="visible" tabindex="-1">
            <div class="popup__wrap" ref="popupWrap" @click="handleWrapperClick($event)">
                <div class="popup__container popup__cont" ref="popupContent" tabindex="1">
                    <div class="popup__content">
                        <p class="popup__title">{{ title }}</p>
                        <slot>
                        </slot>
                        <svg class="popup__close" @click="closePopup()">
                            <use xlink:href="#close"></use>
                        </svg>
                    </div>
                </div>
            </div>
        </div>

    </transition>
</template>

<script>
    export default {
        props: {
            name: {
                default: () => {
                    return 'Popup'
                }
            },
            listener: {
                default: () => {
                    return false
                }
            },
            visible: {
                type: Boolean,
                default: () => {
                    return false
                }
            },
            title: {
                default: () => {
                    return 'Popup message'
                }
            },


            customer: {
                id: null,
                firstName: 'FirstName',
                middleName: 'MiddleName',
                lastName: 'LastName',
                companyName: 'Companyname',
                phone: '1111111111',
                email: 'email@gmail.com',
                addressLine1: 'address line 1',
                addressLine2: 'address line 2',
                city: 'City',
                state: 'State',
                zip: '1232231122'
            },

        },
        mounted() {
            document.body.addEventListener('keyup', this.onKey);
        },
        destroyed() {
            document.body.removeEventListener('keyup', this.onKey)
        },
        methods: {
            focusOn(el) {
                const element = this.$refs[el];
                if (element && element.$el) {
                    this.$nextTick(() => {
                        element.$el.focus();
                    });
                }
            },
            openPopup() {
                this.visible = true;
            },
            closePopup() {
                this.$emit('update:visible', false);
                this.$message({
                    type: 'info',
                    message: `${this.name} closed`
                });
            },
            handleWrapperClick($event) {
                if ($event.target.classList.contains('popup__container')) {
                    this.closePopup();
                }
            },
            onKey(event) {
                event.preventDefault();
                if (event.keyCode === 27) this.closePopup();
            }
        }
    }
</script>

<style lang="scss" src="./Popup.scss"></style>

