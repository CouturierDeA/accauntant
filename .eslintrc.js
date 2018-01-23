module.exports = {
    root          : true,
    parser        : 'babel-eslint',
    env           : {
        browser  : true,
        commonjs : true,
        es6      : true
    },
    globals       : {
        __dirname  : true,
        __filename : true,
        process    : true
    },
    parserOptions : {
        ecmaVersion : 6,
        sourceType  : 'module'
    },
    plugins       : [
        'html',         // required to lint *.vue files
        'better', 'chai-expect', 'extend', 'import', 'lodash', 'mocha', 'no-useless-assign', 'promise'
    ],
    extends       : [
        'eslint:recommended',
        'plugin:lodash/recommended',
        // 'plugin:import/errors',
        // 'plugin:import/warnings'
    ],
    // add your custom rules here
    rules         : {
        // allow debugger during development
        'no-debugger' : process.env.NODE_ENV === 'production' ? 2 : 0,

        // Errors
        'comma-dangle'             : [2, 'never'],
        'no-cond-assign'           : [2, 'always'],
        'no-console'               : 0,
        'no-constant-condition'    : 2,
        'no-control-regex'         : 2,
        'no-dupe-args'             : 2,
        'no-dupe-keys'             : 2,
        'no-duplicate-case'        : 2,
        'no-empty-character-class' : 2,
        'no-empty'                 : 2,
        'no-ex-assign'             : 2,
        'no-extra-boolean-cast'    : 2,
        'no-extra-parens'          : 1,
        'no-extra-semi'            : 2,
        'no-func-assign'           : 2,
        'no-inner-declarations'    : 2,
        'no-invalid-regexp'        : 2,
        'no-irregular-whitespace'  : 2,
        'no-negated-in-lhs'        : 2,
        'no-obj-calls'             : 2,
        'no-regex-spaces'          : 1,
        'no-self-assign'           : 2,
        'no-sparse-arrays'         : 2,
        'no-unexpected-multiline'  : 2,
        'no-unreachable'           : 2,
        'use-isnan'                : 2,
        'valid-jsdoc'              : [1, {prefer : {return : 'returns'}, preferType : {object : 'Object', array : 'Array', number : 'number', string : 'string', boolean : 'boolean'}, requireReturn : false}],
        'valid-typeof'             : 2,

        // Best practices
        'accessor-pairs'        : 2,
        'block-scoped-var'      : 2,
        'complexity'            : [2, 15],
        'consistent-return'     : 1,
        'curly'                 : [2, 'all'],
        'default-case'          : 1,
        'dot-location'          : [2, 'property'],
        'dot-notation'          : [2, {'allowKeywords' : true}],
        'eqeqeq'                : [2, 'allow-null'],
        'guard-for-in'          : 2,
        'no-alert'              : 0,
        'no-caller'             : 2,
        'no-case-declarations'  : 2,
        'no-div-regex'          : 2,
        'no-else-return'        : 0,
        'no-empty-pattern'      : 2,
        'no-eq-null'            : 2,
        'no-eval'               : 2,
        'no-extend-native'      : 2,
        'no-extra-bind'         : 2,
        'no-fallthrough'        : 2,
        'no-floating-decimal'   : 2,
        'no-implicit-coercion'  : 2,
        'no-implied-eval'       : 2,
        'no-invalid-this'       : 2,
        'no-iterator'           : 2,
        'no-labels'             : 2,
        'no-lone-blocks'        : 2,
        'no-loop-func'          : 2,
        'no-magic-numbers'      : [1, { 'ignore': [-1, 0, 1, 2] }],
        'no-multi-spaces'       : [1, {'exceptions' : {'Property' : true}}],
        'no-multi-str'          : 2,
        'no-native-reassign'    : 2,
        'no-new-func'           : 2,
        'no-new-wrappers'       : 2,
        'no-new'                : 2,
        'no-octal-escape'       : 2,
        'no-octal'              : 2,
        'no-param-reassign'     : 0,
        'no-process-env'        : 2,
        'no-proto'              : 2,
        'no-redeclare'          : 2,
        'no-return-assign'      : 2,
        'no-script-url'         : 2,
        'no-self-compare'       : 2,
        'no-sequences'          : 2,
        'no-throw-literal'      : 2,
        'no-unused-expressions' : 2,
        'no-unused-labels'      : 2,
        'no-useless-call'       : 2,
        'no-useless-concat'     : 2,
        'no-void'               : 2,
        'no-warning-comments'   : 1,
        'no-with'               : 2,
        'radix'                 : 2,
        'vars-on-top'           : 0,
        'wrap-iife'             : [2, 'inside'],
        'yoda'                  : 2,

        // Strict mode
        'strict' : [2, 'safe'],

        // Variables
        'init-declarations'          : 0,
        'no-catch-shadow'            : 2,
        'no-delete-var'              : 2,
        'no-label-var'               : 2,
        'no-shadow-restricted-names' : 2,
        'no-shadow'                  : 2,
        'no-undef-init'              : 2,
        'no-undef'                   : 2,
        'no-undefined'               : 0,
        'no-unused-vars'             : 2,
        'no-use-before-define'       : 2,

        // Node.js and CommonJS
        'callback-return' : 2,
        'no-new-require'  : 2,

        // Stylistic Issues
        'array-bracket-spacing'       : [2, 'never'],
        'block-spacing'               : [2, 'always'],
        'brace-style'                 : [1, '1tbs', {'allowSingleLine' : true}],
        'camelcase'                   : [2, {'properties' : 'never'}],
        'comma-spacing'               : [2, {'before' : false, 'after' : true}],
        'comma-style'                 : [2, 'last'],
        'computed-property-spacing'   : [2, 'never'],
        'eol-last'                    : 2,
        'id-length'                   : [2, {
            'min'        : 2,
            'properties' : 'never',
            'exceptions' : ['_', '$', 'l', 'x', 'y', 'i', 'e']
        }],
        'indent'                      : [2, 4, {'SwitchCase' : 1}],
        'key-spacing'                 : [1, {
            'align'       : 'colon',
            'beforeColon' : true,
            'afterColon'  : true,
            'mode'        : 'minimum'
        }],
        'keyword-spacing'             : [2, {'before' : true, 'after' : true}],
        'linebreak-style'             : 0,
        'max-depth'                   : [2, 3],
        'max-nested-callbacks'        : [2, 4],
        'max-params'                  : [2, 3],
        'new-cap'                     : [2, {'capIsNew' : false}],
        'new-parens'                  : 2,
        'no-array-constructor'        : 2,
        'no-bitwise'                  : 2,
        'no-continue'                 : 2,
        'no-lonely-if'                : 2,
        'no-mixed-spaces-and-tabs'    : 2,
        'no-multiple-empty-lines'     : [2, {'max' : 1, 'maxEOF' : 1}],
        'no-negated-condition'        : 2,
        'no-nested-ternary'           : 2,
        'no-new-object'               : 2,
        'no-plusplus'                 : 2,
        'no-spaced-func'              : 2,
        'no-trailing-spaces'          : 2,
        'no-unneeded-ternary'         : 2,
        'object-curly-spacing'        : [2, 'never'],
        'one-var'                     : [2, 'never'],
        'operator-assignment'         : [2, 'always'],
        'operator-linebreak'          : [2, 'before', {'overrides' : {'?' : 'before', ':' : 'before', '+=' : 'none'}}],
        'padded-blocks'               : [1, 'never'],
        'quote-props'                 : [2, 'consistent-as-needed'],
        'quotes'                      : [2, 'single', 'avoid-escape'],
        'require-jsdoc'               : [2, {
            'require' : {
                'FunctionDeclaration' : true,
                'MethodDefinition'    : false,
                'ClassDeclaration'    : false
            }
        }],
        'semi-spacing'                : 2,
        'semi'                        : [2, 'always'],
        'space-before-blocks'         : [2, 'always'],
        'space-before-function-paren' : [2, 'always'],
        'space-in-parens'             : [2, 'never'],
        'space-infix-ops'             : 2,
        'space-unary-ops'             : 2,
        'wrap-regex'                  : 2,

        // es6
        'arrow-body-style'        : [2, 'as-needed'],
        'arrow-parens'            : [2, 'as-needed'],
        'arrow-spacing'           : [2, {'before' : true, 'after' : true}],
        'constructor-super'       : 2,
        'no-class-assign'         : 2,
        'no-confusing-arrow'      : 0, //2,
        'no-const-assign'         : 2,
        'no-dupe-class-members'   : 2,
        'no-duplicate-imports'    : 2,
        'no-new-symbol'           : 2,
        'no-this-before-super'    : 2,
        'no-useless-computed-key' : 2,
        'no-useless-constructor'  : 2,
        'no-var'                  : 2,
        'object-shorthand'        : 2,
        'prefer-arrow-callback'   : 2,
        'prefer-const'            : 1,
        'prefer-reflect'          : 0, //2,
        'prefer-rest-params'      : 1,
        'prefer-spread'           : 1,
        'prefer-template'         : 2,
        'require-yield'           : 0, //2,
        'sort-imports'            : [1, {
            'ignoreCase' : true
        }],
        'template-curly-spacing'  : [2, 'never'],
        'yield-star-spacing'      : 2,

        // lodash
        'lodash/chain-style'          : [2, 'explicit'],
        'lodash/prefer-constant'      : 0,
        'lodash/prefer-noop'          : 0,
        'lodash/prefer-lodash-method' : [2, {'except' : ['find', 'map']}],

        // better plugin
        'better/no-deletes'      : 0,
        'better/no-exceptions'   : 0,
        'better/no-fors'         : 2,
        'better/no-ifs'          : 0,
        'better/no-instanceofs'  : 0,
        'better/no-new'          : 0,
        'better/no-nulls'        : 0,
        'better/no-reassigns'    : 0,
        'better/no-switches'     : 0,
        'better/no-this'         : 0,
        'better/no-typeofs'      : 2,
        'better/no-whiles'       : 0,
        'better/explicit-return' : 0,

        // import plugin
        'import/no-amd'      : 2,
        'import/no-commonjs' : 2,
        'import/extensions'  : [2, {'js' : 'never', 'json' : 'always'}],

        // mocha plugin
        'mocha/no-exclusive-tests'   : 2,
        'mocha/no-skipped-tests'     : 0,
        'mocha/no-pending-tests'     : 0,
        'mocha/handle-done-callback' : 2,
        'mocha/no-synchronous-tests' : 0,
        'mocha/no-global-tests'      : 2,

        // no-useless-assign pluguin
        'no-useless-assign/no-useless-assign' : 2,

        // extend plugin
        'extend/no-unsafe-extend-inside-assignment' : [2, {'libraryNames' : ['_']}],
        'extend/no-unsafe-extend-inside-call'       : [2, {'libraryNames' : ['_']}],

        // promise plugin
        'promise/param-names'     : 2,
        'promise/always-return'   : 0,
        'promise/catch-or-return' : 2,

        // chai-expect plugin
        'chai-expect/missing-assertion' : 0,

        // sorting plugin
        'sorting/sort-object-props' : [0 /*1*/, {'ignoreCase' : true, 'ignoreMethods' : false}]
    }
};
