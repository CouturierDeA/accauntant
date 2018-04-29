import ElementUI from 'element-ui';
import './element-variables.scss';
import Mask from 'vue-the-mask';

import ErrorBlock from '../error-block/ErrorBlock.vue';
import Popup from '../popup/Popup.vue';

import RouterNav from '../../router/RouterNav.vue';
import Tab from '../../components/global-components/tabs/Tab.vue';
import TabPane from '../../components/global-components/tabs/TabPane.vue';
import PageTemplate from '../../components/global-components/page-template/page-template.vue';
import AnimatedList from '../../components/global-components/animated-list/AnimatedList.vue';
import SignaturePad from '../../components/global-components/signature-pad/SignaturePad.vue';

import VeeValidate from "vee-validate";
import vValidateConfig from '../../vee-validate/config';

const localization = {
        'CanWeHelpYou?': 'Can We Help You?',
        'CanWeHelpYou?.edit': 'Press Edit button to edit',
        'FirstName': 'First Name',
        'LastName': 'Last Name',
        'DateOfBirth': 'Date Of Birth',
        'SSN': 'SSN',
        'Gender': 'Gender',
        'MaritalStatus': 'Marital Status',
        'MailAddress': 'Mail Address',
        'Submit': 'Submit',
        'PhoneNumber': 'Phone Number',
        'PreferredSpokenLanguage': 'Preferred Spoken Language',
        'PreferredWrittenLanguage': 'Preferred Written Language',
        'PreferredMailType': 'Preferred Mail Type',
        'EditSecurityInfo': 'Edit Security Info',
        'SecurityInfo': 'Security Info',
        'EditContactInfo': 'Edit contact info',
        'ContactInfo': 'Contact info',
        'EditPreferenceInfo': 'Edit Preference info',
        'PreferenceInfo': 'Preference Info',
        'EditPersonalInfo': 'Edit personal info',
        'PersonalInfo': 'Personal info',
};

const GlobalComponents = {
    install(Vue) {
        Vue.use(VeeValidate, vValidateConfig);
        Vue.use(ElementUI);
        Vue.use(Mask);
        Vue.component('AnimatedList', AnimatedList);
        Vue.component('ErrorBlock', ErrorBlock);
        Vue.component('Popup', Popup);
        Vue.component('Tab', Tab);
        Vue.component('TabPane', TabPane);
        Vue.component('PageTemplate', PageTemplate);
        Vue.component('RouterNav', RouterNav);
        Vue.component('SignaturePad', SignaturePad);

        Vue.directive('focus', {
            inserted(el) {
                el.focus()
            }
        });
        Vue.mixin({
            methods: {
                L(text) {
                    if(localization.hasOwnProperty(text)){
                        return localization[text];
                    }else{
                        return text;
                    }
                },
            }
        });
    }

};

export default GlobalComponents;