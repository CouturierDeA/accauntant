<template>
  <section class="container container--narrow  p-gw">
    <div class="section__controls form__control d-flex flex-wrap">
      <div class="row-half d-flex flex-wrap">
        <label class="form__input-wrap d-inline-flex flex-column cxs-24 csm-12">
          <b class="form__input-name">{{ $t('validation.attributes.password') }}</b>
          <el-input v-trim name="password"
                    class="form__input"
                    v-validate="{ required: true, min: '6', max: '8' }"
                    :placeholder="$t('validation.attributes.password')"
                    v-model="password">
          </el-input>
          <span class="form__field-message">{{ v_errors.first('password') }}</span>
        </label>
        <label class="form__input-wrap d-inline-flex flex-column cxs-24 csm-12">
          <b class="form__input-name">{{ $t('validation.attributes.email') }}</b>
          <el-input :v-trim="{ active: true }" name="email"
                    class="form__input"
                    v-validate="{ required: true, email: true }"
                    placeholder="Email"
                    v-model="email">
          </el-input>
          <span class="form__field-message">{{ v_errors.first('email') }}</span>
        </label>
      </div>
      <el-button class="pull-right" @click="onSubmit()" type="primary">
        {{ $t('general.submit') }}
      </el-button>
    </div>
  </section>
</template>

<script>
  import inputs from './inputs.vue';

  export default {
    metaInfo() {
      return {title: this.$t('general.title')};
    },
    components: {
      inputs,
    },
    data() {
      return {
        email: 'test@gmail.com',
        password: '123123',
        someData: {
          someValue: null
        }
      }
    },
    methods: {
      onSubmit() {

        this.$validator.validateAll().then((valid) => {
          if (valid) {
            this.$store.dispatch('user/login', {email:this.email,password: this.password})
            .then(response => {
              this.$router.push('/airbill');

            }).catch(error => {

              this.errorMsg = error;

            })
          } else {
            this.$message({
              type: 'warning',
              message: this.$t('errors.correct_errors_before_submit')
            });
          }
        })
      }
    }
  }
</script>

<style lang="scss" src="./SignIn.scss"></style>


