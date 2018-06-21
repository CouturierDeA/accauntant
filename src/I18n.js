import {Validator} from 'vee-validate';
import vValidator from 'vee-validate';
import Vue from 'vue';
import VueI18n from 'vue-i18n';

import store from 'store';

class I18n {
  constructor(data = null) {
    this.defaultLocale = 'en';
    this.locales = ['en', 'ru'];
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
        store.state.localization = data;
        this.i18n.setLocaleMessage(locale, data);
        const validationDictionary = {};
        const v_messages = data.validation.messages;

        const messages = {
          after: function (e, n) {
            return n[1] ? v_messages['after_inclusion'].replace('{fieldName}', e).replace('{0}', n[0]).replace('{1}', n[1]) : v_messages['after'].replace('{fieldName}', e).replace('{0}', n[0]);
          }, alpha_dash: function (n) {
            return v_messages['alpha_dash'].replace('{fieldName}', n);
          }, alpha_num: function (n) {
            return v_messages['alpha_num'].replace('{fieldName}', n);
          }, alpha_spaces: function (n) {
            return v_messages['alpha_spaces'].replace('{fieldName}', n);
          }, alpha: function (n) {
            return v_messages['alpha'].replace('{fieldName}', n);
          }, before: function (n, e) {
            const key = Object.keys(e[0])[0]
            return v_messages['before'].replace('{fieldName}', n).replace('{0}', key);
          }, between: function (n, e) {
            return v_messages['between'].replace('{fieldName}', n).replace('{0}', e[0]).replace('{1}', e[1])
          }, confirmed: function (n, e) {
            return v_messages['confirmed'].replace('{fieldName}', n);
          }, credit_card: function (n) {
            return v_messages['credit_card'].replace('{fieldName}', n);
          }, date_between: function (n, e) {
            return v_messages['date_between'].replace('{fieldName}', n).replace('{0}', e[0].min).replace('{1}', e[0].max)
          }, date_format: function (n, e) {
            return v_messages['date_format'].replace('{fieldName}', n).replace('{0}', e[0])
          }, decimal: function (n, e) {
            void 0 === e && (e = []);
            let t = e[0];
            return void 0 === t && (t = "*"), v_messages['decimal'].replace('{fieldName}', n).replace('{0}', ("*" === t ? "" : t))
          }, digits: function (n, e) {
            return v_messages['digits'].replace('{fieldName}', n).replace('{0}', e[0])
          }, dimensions: function (n, e) {
            return v_messages['dimensions'].replace('{fieldName}', n).replace('{0}', e[0]).replace('{1}', e[1])
          }, email: function (n) {
            return v_messages['email'].replace('{fieldName}', n);
          }, ext: function (n, e) {
            return v_messages['ext'].replace('{fieldName}', n).replace('{0}', e.slice(0))
          }, image: function (n) {
            return v_messages['image'].replace('{fieldName}', n);
          }, in: function (n) {
            return v_messages['in'].replace('{fieldName}', n);
          }, ip: function (n) {
            return v_messages['ip'].replace('{fieldName}', n);
          }, max: function (n, e) {
            return v_messages['max'].replace('{fieldName}', n).replace('{0}', e[0])
          }, max_value: function (n, e) {
            return v_messages['max_value'].replace('{fieldName}', n).replace('{0}', e[0])
          }, mimes: function (n, e) {
            return v_messages['mimes'].replace('{fieldName}', n).replace('{0}', e.slice(0))
          }, min: function (n, e) {
            return v_messages['min'].replace('{fieldName}', n).replace('{0}', e[0])
          }, min_value: function (n, e) {
            return v_messages['min_value'].replace('{fieldName}', n).replace('{0}', e[0])
          }, not_in: function (n) {
            return v_messages['not_in'].replace('{fieldName}', n);
          }, numeric: function (n) {
            return v_messages['numeric'].replace('{fieldName}', n);
          }, regex: function (n) {
            return v_messages['regex'].replace('{fieldName}', n);
          }, required: function (n) {
            return v_messages['required'].replace('{fieldName}', n);
          }, size: function (n, e) {
            let t, r, u, i = e[0];
            return v_messages['size'].replace('{fieldName}', n).replace('{0}', (t = i, r = 1024, u = 0 == (t = Number(t) * r) ? 0 : Math.floor(Math.log(t) / Math.log(r)), 1 * (t / Math.pow(r, u)).toFixed(2) + " " + ["Byte", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"][u]));
          }, url: function (n) {
            return v_messages['url'].replace('{fieldName}', n);
          }
        };

        validationDictionary[locale] = {
          attributes: data.validation.attributes,
          messages: messages,
        };

        Validator.localize(validationDictionary);

        store.state.loading = false;

        return data;
      });

  }
}

export default new I18n();
