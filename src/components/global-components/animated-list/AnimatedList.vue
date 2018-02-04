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
            beforeEnter(el, done) {
                console.log('beforeEnter');
                const height = el.offsetHeight;
                el.style.opacity = 0;
                el.style.height = 0;
                TweenMax.fromTo(el, .4,
                    {
                        opacity: 0,
                        height: 0,
                    },
                    {
                        opacity: 1,
                        height: height,
                        onComplete: () => {
                            done();
                            el.style.opacity = 1;
                            el.style.height = 'auto';
                        }
                        // repeat: -1, /* Aka infinite amount of repeats */
                        // yoyo: true /* Make it go back and forth */
                    }
                );
            },
            beforeLeave(el, done) {
                console.log(el.offsetHeight, el.clientHeight);
                console.log('beforeLeave');


            },
            enter(el, done) {

                console.log(el.offsetHeight, el.clientHeight);
                const height = el.offsetHeight;
                console.log('enter');
                // TweenMax.fromTo(el, 1,
                //     {
                //         opacity: 1,
                //         height: height,
                //     },
                //     {
                //         opacity: 0,
                //         height: 0,
                //         onComplete: () => {
                //             done();
                //             el.style.opacity = 1;
                //             el.style.height = 'auto';
                //         }
                //         // repeat: -1, /* Aka infinite amount of repeats */
                //         // yoyo: true /* Make it go back and forth */
                //     }
                // );
            },
            leave(el, done) {
                console.log(el.offsetHeight, el.clientHeight);
                const height = el.offsetHeight;
                console.log('leave');
                // TweenMax.to(el, 1, {opacity: 0, height: 0, onComplete: done}, 0);

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
                        // repeat: -1, /* Aka infinite amount of repeats */
                        // yoyo: true /* Make it go back and forth */
                    }
                );
            },
            afterLeave(el) {
                // console.log(el.offsetHeight,el.clientHeight);
                // console.log('afterLeave');
                // el.style.opacity = 1;
                // el.style.height = 'auto';

            }
        }
    }
</script>
