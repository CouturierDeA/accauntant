import ElementUI from 'element-ui';
import locale from "element-ui/lib/locale/lang/en";
import './element-variables.scss';

import RouterNav from 'src/router/RouterNav.vue';
import AnimatedList from 'src/global-components/animated-list/AnimatedList.vue';
import Pagination from 'src/global-components/pagination/pagination';
import Aos from 'src/global-components/aos/aos';

import VeeValidate from "vee-validate";
import vValidateConfig from 'src/veeValidate/config';


const GlobalComponents = {
  install(Vue) {
    Vue.use(VeeValidate, vValidateConfig);
    Vue.use(ElementUI, {locale});
    Vue.component('AnimatedList', AnimatedList);
    Vue.component('RouterNav', RouterNav);
    Vue.component('Pagination', Pagination);
    Vue.component('Aos', Aos);


    const v_trim_handler = function (el, binding, vnode, oldVnode) {
      const value = vnode.componentInstance.$options.propsData.value;
      if (value && typeof value === 'string') {
        vnode.componentInstance.$emit('input', value.trim ? value.trim() : value);
      }
    };

    const vNodeHasInput = function (vnode) {
      if (vnode && vnode.componentInstance && vnode.componentInstance.$refs) {
        return (vnode.componentInstance.$refs.input || vnode.componentInstance.$refs.textarea) ? vnode.componentInstance.$refs.input || vnode.componentInstance.$refs.textarea : null;
      }
      return null;
    };

    Vue.directive('trim', {
      inserted(el, binding, vnode, oldVnode) {
        const input = vNodeHasInput(vnode);
        if (input) {
          input.addEventListener("blur", v_trim_handler.bind(null, el, binding, vnode, oldVnode), true);
        }
      },
      unbind(el, binding, vnode, oldVnode) {
        const input = vNodeHasInput(vnode);
        if (input) {
          input.removeEventListener("blur", v_trim_handler.bind(null, el, binding, vnode, oldVnode), true);
        }
      },
    });
  }
};

export default GlobalComponents;