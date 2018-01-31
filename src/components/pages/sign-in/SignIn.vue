<template>
    <section class="container">
        <h1 class="section__title">Sign In</h1>
        <div class="section__controlls form__controll">
         
            <el-form>
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
                <div class="form__input-wrap">
                    <el-input class="form__input"
                              :class="{ 'mod__error': v_errors.has('password') }"
                              name="password"
                              v-validate="{ required: true}"
                              placeholder="Pass"
                              v-model="password">
                    </el-input>
                    <span class="form__field-message">{{ v_errors.first('password') }}</span>
                </div>

                <el-button :disabled="v_errors.any()" class="form__submit" @click="onSubmit()" type="success">Submit
                </el-button>
            </el-form>

            <ErrorBlock v-bind:error="loginError"/>

        </div>
    </section>
</template>

<script>

    export default {
        data() {
            return {
                loginError: false,
                visible: false,
                visible2: false,
                email: 'test@gmail.com',
                password: '123123'
            }
        },
        methods: {
            onSubmit() {
                this.loginError = '';
                const payload = {email: this.email, password: this.password};

                this.$validator.validateAll().then((valid) => {
                    if (valid) {
                        this.$store.dispatch('user/login', payload)
                            .then(response => {
                                this.$router.push('/accountant-table');
                                this.loginError = 'No such user or password is invalid';

                            }).catch(error => {

                            if (error == 1) {
                                this.loginError = 'No such user or password is invalid';
                                this.$message({
                                    type: 'warning',
                                    message: 'Login canceled'
                                });
                            } else {
                                this.loginError = 'Something went wrong';
                            }

                        })
                    } else {
                        this.$message({
                            type: 'warning',
                            message: 'Form is invalid'
                        });
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
