import {Validator} from 'vee-validate';
import Vue from 'vue';
import VueI18n from 'vue-i18n';

import store from 'store';

class I18n {

    constructor() {
        this.defaultLocale = 'en';
        this.locales = ['en', 'ru', 'uk'];
    }
    i18n;

    init(priority) {
        priority.push(this.defaultLocale);

        let startLocale;
        for (const locale of priority) {
            if (this.locales.find((value) => value === locale)) {
                startLocale = locale;
                break;
            }
        }

        const messages = {};
        for (const locale of this.locales) {
            messages[locale] = {};
        }

        Vue.use(VueI18n);
        this.i18n = new VueI18n({
            locale: startLocale,
            silentTranslationWarn: false,
            messages,
        });

        return this.loadLocaleData(startLocale).then(() => {
            Validator.localize(startLocale);
            return this.i18n;
        });
    }

    loadLocaleData(locale) {
        store.state.loading = true;

        return System.import('../assets/i18n/' + locale + '.json')
            .then((data) => {
                this.i18n.setLocaleMessage(locale, data);

                const validationDictionary = {};
                validationDictionary[locale] = {
                    attributes: data.validation.attributes,
                    messages: {},
                };
                for (const rule in data.validation.messages) {
                    if (data.validation.messages.hasOwnProperty(rule)) {
                        validationDictionary[locale].messages[rule] =
                            (field, value) => {
                                switch (rule) {
                                    case 'min':
                                        return data.validation.messages[rule]
                                            .replace('{value}', value);
                                    default:
                                        return data.validation.messages[rule];
                                }
                            };
                    }
                }
                Validator.localize(validationDictionary);

                store.state.loading = false;

                return data;
            });
    };
}

export default new I18n();
