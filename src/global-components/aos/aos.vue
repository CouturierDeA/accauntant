<script>
  // import {TweenMax} from 'gsap';

  import AOS from 'aos';
  //
  // import('aos').then(AOS => {
  //   AOS.init()
  // });
  export default {
    render: function (createElement) {
      return createElement(this.tag, {
        class: {
          fooBar: true,
        }
      }, this.$slots.default);
    },
    props: {
      tag: {
        type: String,
        default: 'div',
        required: false
      }
    },
    mounted() {
      AOS.init()

      // AOS.refreshHard()
      // import('aos').then(AOS => {
      //   AOS.init()
      // });
      // // AOS.init();
      // AOS.refreshHard()
    },
  }
</script>

<style lang="scss">
  @import '~aos/dist/aos.css';
</style>
