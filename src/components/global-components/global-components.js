import ErrorBlock from '../error-block/ErrorBlock.vue';
import Popup from '../popup/Popup.vue';

import RouterNav from '../../router/RouterNav.vue';
import Tab from '../../components/global-components/tabs/Tab.vue';
import TabPane from '../../components/global-components/tabs/TabPane.vue';

import VeeValidate from "vee-validate";
import vValidateConfig from '../../vee-validate/config';



const  MyPlugin = {
    install(Vue) {
        Vue.use(VeeValidate, vValidateConfig);
        Vue.component('ErrorBlock', ErrorBlock);
        Vue.component('Popup', Popup);
        Vue.component('Tab', Tab);
        Vue.component('TabPane', TabPane);
        Vue.component('RouterNav', RouterNav);
    }
};

export default MyPlugin;