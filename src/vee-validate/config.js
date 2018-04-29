export default {
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
    // i18n: null, // the vue-i18n plugin instance,
    i18nRootKey: 'validations' // the nested key under which the validation messages will be located
};
//
//
// !function (e, n) {
//     "object" == typeof exports && "undefined" != typeof module ? module.exports = n() : "function" == typeof define && define.amd ? define(n) : (e.__vee_validate_locale__en = e.__vee_validate_locale__en || {}, e.__vee_validate_locale__en.js = n())
// }(this, function () {
//     "use strict";
//     var e = {
//         name: "en", messages: {
//             _default: function (e) {
//                 return "The " + e + " value is not valid."
//             }, after: function (e, n) {
//                 var t = n[0];
//                 return "The " + e + " must be after " + (n[1] ? "or equal to " : "") + t + "."
//             }, alpha_dash: function (e) {
//                 return "The " + e + " field may contain alpha-numeric characters as well as dashes and underscores."
//             }, alpha_num: function (e) {
//                 return "The " + e + " field may only contain alpha-numeric characters."
//             }, alpha_spaces: function (e) {
//                 return "The " + e + " field may only contain alphabetic characters as well as spaces."
//             }, alpha: function (e) {
//                 return "The " + e + " field may only contain alphabetic characters."
//             }, before: function (e, n) {
//                 var t = n[0];
//                 return "The " + e + " must be before " + (n[1] ? "or equal to " : "") + t + "."
//             }, between: function (e, n) {
//                 return "The " + e + " field must be between " + n[0] + " and " + n[1] + "."
//             }, confirmed: function (e) {
//                 return "The " + e + " confirmation does not match."
//             }, credit_card: function (e) {
//                 return "The " + e + " field is invalid."
//             }, date_between: function (e, n) {
//                 return "The " + e + " must be between " + n[0] + " and " + n[1] + "."
//             }, date_format: function (e, n) {
//                 return "The " + e + " must be in the format " + n[0] + "."
//             }, decimal: function (e, n) {
//                 void 0 === n && (n = []);
//                 var t = n[0];
//                 return void 0 === t && (t = "*"), "The " + e + " field must be numeric and may contain " + (t && "*" !== t ? t : "") + " decimal points."
//             }, digits: function (e, n) {
//                 return "The " + e + " field must be numeric and exactly contain " + n[0] + " digits."
//             }, dimensions: function (e, n) {
//                 return "The " + e + " field must be " + n[0] + " pixels by " + n[1] + " pixels."
//             }, email: function (e) {
//                 return "The " + e + " field must be a valid email."
//             }, ext: function (e) {
//                 return "The " + e + " field must be a valid file."
//             }, image: function (e) {
//                 return "The " + e + " field must be an image."
//             }, in: function (e) {
//                 return "The " + e + " field must be a valid value."
//             }, integer: function (e) {
//                 return "The " + e + " field must be an integer."
//             }, ip: function (e) {
//                 return "The " + e + " field must be a valid ip address."
//             }, length: function (e, n) {
//                 var t = n[0], i = n[1];
//                 return i ? "The " + e + " length be between " + t + " and " + i + "." : "The " + e + " length must be " + t + "."
//             }, max: function (e, n) {
//                 return "The " + e + " field may not be greater than " + n[0] + " characters."
//             }, max_value: function (e, n) {
//                 return "The " + e + " field must be " + n[0] + " or less."
//             }, mimes: function (e) {
//                 return "The " + e + " field must have a valid file type."
//             }, min: function (e, n) {
//                 return "The " + e + " field must be at least " + n[0] + " characters."
//             }, min_value: function (e, n) {
//                 return "The " + e + " field must be " + n[0] + " or more."
//             }, not_in: function (e) {
//                 return "The " + e + " field must be a valid value."
//             }, numeric: function (e) {
//                 return "The " + e + " field may only contain numeric characters."
//             }, regex: function (e) {
//                 return "The " + e + " field format is invalid."
//             }, required: function (e) {
//                 return "The " + e + " field is required."
//             }, size: function (e, n) {
//                 return "The " + e + " size must be less than " + function (e) {
//                     var n = 0 == (e = 1024 * Number(e)) ? 0 : Math.floor(Math.log(e) / Math.log(1024));
//                     return 1 * (e / Math.pow(1024, n)).toFixed(2) + " " + ["Byte", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"][n]
//                 }(n[0]) + "."
//             }, url: function (e) {
//                 return "The " + e + " field is not a valid URL."
//             }
//         }, attributes: {}
//     };
//     if ("undefined" != typeof VeeValidate) {
//         VeeValidate.Validator.localize((n = {}, n[e.name] = e, n));
//         var n
//     }
//     return e
// });