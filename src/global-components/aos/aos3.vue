<intersection-observer @intersect-enter="handleEnter" @intersect-leave="handleLeave" :threshold="[0, 0.5, 1]">
  <my-honest-to-goodness-component></my-honest-to-goodness-component>
</intersection-observer>


<script>

  // const MutationObserver =
  //   window.MutationObserver ||
  //   window.WebKitMutationObserver ||
  //   window.MozMutationObserver;

  export default {
    render: function (createElement) {
      return createElement(this.tag, {
        class: {
          'aos-init': true,
          'aos-animate': this.animate
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
    data() {
      return {
        hi: 'hi',
        scrollTop: '',
        scrollBottom: '',
        animate: false,
      }
    },
    methods: {
      checkView() {
        return true;
        // const element = this.$el
        // if (element) {
        //   let elTop = element.offsetTop;
        //   let elBottom = element.offsetTop + element.scrollHeight;
        //   if (this.scrollBottom > (elTop + 200) && (elBottom - 100) > this.scrollTop) {
        //     return true;
        //   } else {
        //     return false;
        //   }
        // }
      },
      scrollHandler() {
        this.scrollBottom = window.scrollY + window.innerHeight;
        this.scrollTop = window.scrollY;
        console.warn('this.scrollBottom', this.scrollBottom)
        console.warn('this.scrollTop', this.scrollTop)
      },

      setState(el, top, once) {
        // console.warn(el);

        var rect = el.getBoundingClientRect();
        console.warn(top);
        // console.warn(rect.top);
        // console.warn(top > rect.top);
        // console.log(rect.top, rect.right, rect.bottom, rect.left);
        // const attrOnce = el.node.getAttribute('data-aos-once');
        const attrOnce = false;

        if (top > rect.top) {
          // el.node.classList.add('aos-animate');
          // el.node.classList.add('aos-animate');
          this.animate = true;
        } else if (typeof attrOnce !== 'undefined') {
          if (attrOnce === 'false' || (!once && attrOnce !== 'true')) {
            this.animate = false;
            // el.node.classList.remove('aos-animate');
          }
        }
      },
      handleScroll() {
        const scrollTop = window.pageYOffset;
        const windowHeight = window.innerHeight;
        /**
         * Check all registered elements positions
         * and animate them on scroll
         */
        this.setState(this.$el, windowHeight + scrollTop, false);
      },

    },
    destroyed(){
      window.removeEventListener('scroll', this.handleScroll);
      window.removeEventListener('resize', this.handleScroll);
    },
    mounted() {
      this.handleScroll();
      window.addEventListener('scroll', this.handleScroll);
      window.addEventListener('resize', this.handleScroll);
      // const observer = new MutationObserver(function(mutations){
      //   console.warn('mutations',mutations);
      // });
      //
      // observer.observe(this.$el, {
      //   childList: true,
      //   subtree: true,
      //   removedNodes: true
      // });

      // import('aos').then(AOS => {
      //   AOS.init()
      // });
      // // AOS.init();
      // AOS.refreshHard()
    }
    ,
  }
</script>

<style lang="scss">
  @import '~aos/dist/aos.css';
</style>
