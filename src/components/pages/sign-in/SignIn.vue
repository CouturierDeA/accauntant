<template>
    <section class="container">
        <h1 class="section__title">{{ $t('sign_in.title') }}</h1>

        <div class="section__controlls form__controll">

            <div class="form__input-wrap">
                <el-input class="form__input"
                          :class="{ 'mod__error': v_errors.has('password') }"
                          name="password"
                          v-validate="{ required: true, min: '6', max: '8' }"
                          placeholder="Pass"
                          v-model="password">
                </el-input>
                <span class="form__field-message">{{ v_errors.first('password') }}</span>
            </div>
            <div class="form__input-wrap">
                <el-input name="email"
                          class="form__input"
                          :class="{ 'mod__error': v_errors.has('email') }"
                          v-validate="{ required: true, email: true }"
                          placeholder="Email"
                          v-model="email">
                </el-input>

                <span class="form__field-message">{{ v_errors.first('email') }}</span>
            </div>

            <inputs/>
            <!--<bootstrapTest></bootstrapTest>-->
            <!--<googleMap v-bind:locations.sync="locations"></googleMap>-->
            <!--<SignaturePad format="png" @signatureSave="onSignatureSave"></SignaturePad>-->

            <el-button class="form__submit" @click="onSubmit()" type="success">
                {{ $t('sign_in.login') }}
            </el-button>

            <ErrorBlock v-bind:error="computedErrorMsg"/>

        </div>
    </section>
</template>

<script>
    import inputs from './inputs.vue';
    import googleMap from '../../google-map/google-map';
    import bootstrapTest from './bootstrap-test';


    export default {
        components: {
            inputs,
            bootstrapTest,
            googleMap
        },
        metaInfo() {
            return {title: 'Vue app example'};
        },
        watch: {
            '$router': function (val) {
                console.warn('route change params id', val);
            }
        },
        data() {
            return {
                errorMsg: false,
                visible: false,
                visible2: false,
                email: 'test@gmail.com',
                password: '1231232',
                locations: [
                    {lat: 4.20967, long: 101.915546},
                    {lat: 2.180967, long: 101.715546},
                    {lat: 3.200848, long: 105.616669},
                    {lat: 3.147372, long: 91.597443},
                    {lat: 3.19125, long: 101.710052},
                ],
                user: {
                    maritalStatus: 1,
                },
                maritalStatuses: [],

            }
        },
        computed: {
            computedErrorMsg() {
                return this.errorMsg;
            },
        },
        methods: {
            onSignatureSave(image,size) {
                console.log(image,size)
            },
            onSubmit() {
                this.locations = [
                    {lat: 1.2095, long: 101.915546},
                    {lat: 4.180967, long: 101.715546},
                    {lat: 3.200848, long: 105.616669},
                    {lat: 2.147372, long: 91.597443},
                    {lat: 3.19125, long: 101.710052},
                ];
                this.errorMsg = '';
                const payload = {email: this.email, password: this.password};

                this.$validator.validateAll().then((valid) => {
                    if (valid) {
                        this.$store.dispatch('user/login', payload)
                            .then(response => {
                                this.$router.push('/tasks');

                            }).catch(error => {

                            this.errorMsg = error;

                        })
                    } else {
                        // this.$message({
                        //     type: 'warning',
                        //     message: 'Form is invalid'
                        // });
                    }
                })
            }
        }
    }
</script>

<style lang="scss">
    @import "../../../scss/core";

    .form__input-wrap {
        position: relative;

        .form__field-message {
            position: absolute;
            left: 16px;
            z-index: 2;

            display: block;

            margin-top: 7px;

            font-size: 13px;
        }
    }

    .form__input {
        margin-top: $gw*1.5;
    }

    .form__input.mod__error {
        input,
        input:focus {
            border-color: $red;
        }
        & + .form__field-message {
            color: $red;
        }
    }

    .form__submit {
        margin-top: $gw;
    }

</style>


