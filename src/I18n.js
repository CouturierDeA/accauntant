import {Validator} from 'vee-validate';
import Vue from 'vue';
import VueI18n from 'vue-i18n';

import store from 'store';

class I18n {
    switchMessage(value, message) {
        const valueIsObj = (typeof value[0] === 'object');
        if (valueIsObj) {
            const valsArray = value[0];
            Object.keys(valsArray).map((val, i) => {
                message = message.replace(`{${i}}`, valsArray[val]);
            });
            return message;
        } else {
            console.warn('IS OBJECT', valueIsObj);
            return message.replace('{0}', value);
        }
    }

    switchRule = (rule, value, messages, field) => {
        let message = messages[rule];

        switch (rule) {
            case'after':
                const n = value;
                const t = n[0];
                const t1 = n[1];
                const multirules = (message.indexOf('{:}') !== -1);

                if (multirules) {
                    let spl = message.split('{:}');
                    if (t1) {
                        message = spl[1]
                    } else {
                        message = spl[0]
                    }
                }
                Object.keys(t).map((val, i) => {
                    message = message.replace(`{${i}}`, t[val]).replace(`{${i}}`, t[val]).replace('{fieldName}', field);
                });

                return message;

            case 'before':
            case 'between' :
            case 'decimal':
            case 'date_between' :
            case 'date_format' :
            case 'digits' :
            case 'dimensions' :
            case 'length' :
            case 'min_value' :
            case 'max_value' :
            case 'max' :
            case 'min' :
            case 'size' :
                return this.switchMessage(value, message);
            default:
                // in case ['alpha_dash','length',alpha_num','alpha_spaces','alpha','in','confirmed',
                // 'credit_card','decimal','email','ext','image','integer','ip','mimes','not_in',
                // 'numeric','regex','required', 'url']
                return message;
        }
    };

    constructor(data = null) {
        this.defaultLocale = 'en';
        this.locales = ['en', 'ru', 'ua'];
        if (data) {
            for (let field in data) {
                this[field] = data[field];
                if (this[field].type) {
                    this[field].type = data[field].type;
                }
            }
        }
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
                    let messages = data.validation.messages;

                    if (data.validation.messages.hasOwnProperty(rule)) {

                        validationDictionary[locale].messages[rule] = (field, value, event) => {
                            return this.switchRule(rule, value, messages, field).replace('{fieldName}', field);
                        }
                    }
                }

                Validator.localize(validationDictionary);

                store.state.loading = false;

                return data;


            });


    }


}

export default new I18n();
