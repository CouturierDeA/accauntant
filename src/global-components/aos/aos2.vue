<script>

  // const MutationObserver =
  //   window.MutationObserver ||
  //   window.WebKitMutationObserver ||
  //   window.MozMutationObserver;

  export default {
    // Enables an abstract component in Vue.
    // This property is undocumented and may change at any time,
    // but your component should work without it.
    // abstract: true,
    inheritAttrs: false,

    // Props work just fine in abstract components!
    data() {
      return {
        animate: false,
      }
    },
    render: function (createElement) {
      try {
        return createElement(this.tag, {
        }, this.$slots.default);
      } catch (e) {
        throw new Error('IntersectionObserver.vue can only render one, and exactly one child component.');
      }

      return null;
    },
    props: {
      threshold: {
        type: Array
      },
      tag: {
        type: String,
        default: 'div',
        required: false
      }
    },
    // Yay, render functions!
    // render() {
    //   // Without using a wrapper component, we can only render one child component.
    //   try {
    //     return this.$slots.default[0];
    //   } catch (e) {
    //     throw new Error('IntersectionObserver.vue can only render one, and exactly one child component.');
    //   }
    //
    //   return null;
    // },

    mounted() {
      console.warn('this.$attrs',this.$attrs)
      // There's no real need to declare observer as a data property,
      // since it doesn't need to be reactive.
      this.observer = new IntersectionObserver((entries) => {

        console.warn(entries[0]);
        this.animate = entries[0].intersectionRatio > 0;
        this.$emit(entries[0].isIntersecting ? 'intersect-enter' : 'intersect-leave', [entries[0]]);
      }, {
        threshold: this.threshold || 0
      });

      // You have to wait for the next tick so that the child element has been rendered.
      this.$nextTick(() => {
        // this.observer.observe(this.$slots.default[0].elm);
        this.observer.observe(this.$el);
      });
    },

    destroyed() {
      // Why did the W3C choose "disconnect" as the method anyway?
      this.observer.disconnect();
    }
  }
</script>

<style lang="scss">
  @import '~aos/dist/aos.css';
</style>
