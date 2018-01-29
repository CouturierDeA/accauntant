import {Validator} from 'vee-validate';
import Vue from 'vue';
import VueI18n from 'vue-i18n';

import store from 'store';

export default class I18n {

    defaultLocale = 'en';
    locales = ['en', 'ru', 'uk'];

    init(priority) {
        priority.push(this.defaultLocale);

        let startLocale;
        for (const locale of priority) {
            if (this.locales.find((value) => value === locale)) {
                startLocale = locale;
                break;
            }
        }

        Vue.use(VueI18n);

        const messages = {};
        for (const locale of this.locales) {
            messages[locale] = {};
        }

        this.i18n = new VueI18n({
            locale: startLocale,
            messages,
        });

        return this.loadLocaleData(startLocale).then(() => {
            Validator.setLocale(startLocale);
            return this.i18n;
        });
    }

    loadLocaleData(locale) {
        store.state.loading = true;

        return System.import('~assets/i18n/' + locale + '.json')
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
                Validator.updateDictionary(validationDictionary);

                store.state.loading = false;

                return data;
            });
    }

    /**
     * Instance of initialized vue-i18n plugin.
     */
    i18n;
}
