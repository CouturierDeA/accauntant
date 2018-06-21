import VueInternalization from '../../I18n';
import {Validator} from 'vee-validate';

export function startLoading(store) {
    store.commit('setLoading', true);
}

export function stopLoading(store) {
    store.commit('setLoading', false);
}

export function setLocale(state, locale) {

   return VueInternalization.loadLocaleData(locale).then((data) => {
        VueInternalization.i18n.locale = locale;
        Validator.localize(locale);
        state.locale = locale;
    });
}

export default {
    startLoading,
    stopLoading,
    setLocale,
};
