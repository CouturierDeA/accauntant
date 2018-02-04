<template>
    <transition-group name="staggered-fade"
                      tag="div"
                      v-bind:css="false"
                      v-on:before-enter="beforeEnter"
                      v-on:before-leave="afterLeave"
                      v-on:after-leave="afterLeave"
                      v-on:leave="leave">

        <slot/>
    </transition-group>

</template>

<script>

    import {TweenMax} from 'gsap';

    export default {
        methods: {
            beforeEnter(el) {
                console.log('beforeEnter');
                const height = el.offsetHeight;
                TweenMax.fromTo(el, .4,
                    {
                        opacity: 0,
                        height: 0,
                    },
                    {
                        opacity: 1,
                        height: height,
                        onComplete: () => {
                            el.style.opacity = 1;
                            el.style.height = 'auto';
                        }
                        // repeat: -1, /* Aka infinite amount of repeats */
                        // yoyo: true /* Make it go back and forth */
                    }
                );
            },
            beforeLeave(el, done) {

            },
            enter(el) {

            },
            leave(el, done) {
                const height = el.offsetHeight;

                TweenMax.fromTo(el, 1,
                    {
                        opacity: 1,
                        height: height,
                    },
                    {
                        opacity: 0,
                        height: 0,
                        onComplete: () => {
                            done();
                            el.style.opacity = 1;
                            el.style.height = 'auto';
                        }
                    }
                );
            },
            afterLeave(el) {

            }
        }
    }
</script>
