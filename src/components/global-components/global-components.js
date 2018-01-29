import VeeValidate from "vee-validate";
import Popup from '../popup/Popup.vue';
import ErrorBlock from '../error-block/ErrorBlock.vue';
import RouterNav from '../../router/RouterNav.vue';

const v_validate_config = {
    errorBagName: 'v_errors', // change if property conflicts
    fieldsBagName: 'v_fields',
    delay: 0,
    locale: 'en',
    dictionary: null,
    strict: true,
    classes: false,
    classNames: {
        touched: 'touched', // the control has been blurred
        untouched: 'untouched', // the control hasn't been blurred
        valid: 'valid', // model is valid
        invalid: 'invalid', // model is invalid
        pristine: 'pristine', // control has not been interacted with
        dirty: 'dirty' // control has been interacted with
    },
    events: 'input|blur',
    inject: true,
    validity: false,
    aria: true,
    i18n: null, // the vue-i18n plugin instance,
    i18nRootKey: 'validations' // the nested key under which the validation messsages will be located
};


const  MyPlugin = {
    install(Vue, options) {
        Vue.use(VeeValidate, v_validate_config);
        Vue.component('Popup', Popup);
        Vue.component('ErrorBlock', ErrorBlock);
        Vue.component('RouterNav', RouterNav);



    }
};

export default MyPlugin;