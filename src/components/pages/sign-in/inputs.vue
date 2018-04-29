<template>
    <el-form>

        <div class="form__input-wrap">
            <el-input name="min_value"
                      class="form__input"
                      :class="{ 'mod__error': v_errors.has('min_value') }"
                      v-validate="{ min_value: 5 }"
                      placeholder="min_value"
                      v-model="min_value">
            </el-input>
            <span class="form__field-message">{{ v_errors.first('min_value') }}</span>
        </div>

        <div class="form__input-wrap">
            <el-input name="before_date"
                      class="form__input"
                      :class="{ 'mod__error': v_errors.has('before_date') }"
                      v-validate="{ before: { date } }"
                      placeholder="Before date"
                      v-model="before_date">
            </el-input>
            <span class="form__field-message">{{ v_errors.first('before_date') }}</span>
        </div>
        <div class="form__input-wrap">
            <el-input name="after_date_include"
                      class="form__input"
                      :class="{ 'mod__error': v_errors.has('after_date_include') }"
                      v-validate="{ after: { date },inclusion : date}"
                      placeholder="After_date inclusion"
                      v-model="after_date">
            </el-input>
            <span class="form__field-message">{{ v_errors.first('after_date_include') }}</span>
        </div>
        <div class="form__input-wrap">
            <el-input name="after_date"
                      class="form__input"
                      :class="{ 'mod__error': v_errors.has('after_date') }"
                      v-validate="{ after: { date } }"
                      placeholder="After date"
                      v-model="after_date">
            </el-input>
            <span class="form__field-message">{{ v_errors.first('after_date') }}</span>
        </div>
        <div class="form__input-wrap">
            <el-input name="decimal"
                      class="form__input"
                      :class="{ 'mod__error': v_errors.has('decimal') }"
                      v-validate="{ decimal: 3, required: true }"
                      placeholder="Decimal"
                      v-model="decimal">
            </el-input>
            <span class="form__field-message">{{ v_errors.first('decimal') }}</span>
        </div>
        <div class="form__input-wrap">
            <el-input name="ip"
                      class="form__input"
                      :class="{ 'mod__error': v_errors.has('ip') }"
                      v-validate="{ ip: true }"
                      placeholder="Ip"
                      v-model="ip">
            </el-input>
            <span class="form__field-message">{{ v_errors.first('ip') }}</span>
        </div>

        <div class="form__input-wrap">
            <el-input name="date_format"
                      class="form__input"
                      :class="{ 'mod__error': v_errors.has('date_format') }"
                      v-validate="{ date_format : 'DD/MM/YYYY' }"
                      placeholder="Date format"
                      v-model="date">
            </el-input>

            <span class="form__field-message">{{ v_errors.first('date_format') }}</span>
        </div>

        <!--<div class="form__input-wrap">-->
            <!--<el-input name="date"-->
                      <!--class="form__input"-->
                      <!--:class="{ 'mod__error': v_errors.has('date') }"-->
                      <!--v-validate="{ date_format : 'DD/MM/YYYY', date_between: {min: '20/09/2016',max : '20/10/2019'}}"-->
                      <!--placeholder="date"-->
                      <!--v-model="date">-->
            <!--</el-input>-->

            <!--<span class="form__field-message">{{ v_errors.first('date') }}</span>-->
        <!--</div>-->

        <!--<div class="form__input-wrap">-->
            <!--<el-input name="Length"-->
                      <!--class="form__input"-->
                      <!--:class="{ 'mod__error': v_errors.has('Length') }"-->
                      <!--v-validate="{ length: { min: 10, max: 20} }"-->
                      <!--placeholder="Length between 10 and 20"-->
                      <!--v-model="length">-->
            <!--</el-input>-->
            <!--<span class="form__field-message">{{ v_errors.first('Length') }}</span>-->
        <!--</div>-->
        <!--<div class="form__input-wrap">-->
            <!--<el-input name="Length"-->
                      <!--class="form__input"-->
                      <!--:class="{ 'mod__error': v_errors.has('Length') }"-->
                      <!--v-validate="{ length: 10, required: true }"-->
                      <!--placeholder="Length must be 10"-->
                      <!--v-model="length">-->
            <!--</el-input>-->
            <!--<span class="form__field-message">{{ v_errors.first('Length') }}</span>-->
        <!--</div>-->

        <!--<div class="task__image" :style="`background-image: url(${taskImage})`">-->
            <!--<input class="task__image-input"-->
                   <!--type="file" name="image"-->
                   <!--v-validate.reject="'image|size:400'"-->
                   <!--@change="onFileChange"-->
            <!--&gt;-->
            <!--<span class="task__image-message"-->
                  <!--:class="{ 'mod&#45;&#45;error': v_errors.has('image')}"-->
                  <!--v-if="v_errors.has('image')">{{ v_errors.first('image') }}</span>-->
        <!--</div>-->

    </el-form>
</template>

<script>
    export default {
        // inject: {
        //      $validator: '$validator'
        // },
        data() {
            return {
                name: 'inputs module',
                decimal: '',
                min_value: '',
                before_date: '',
                after_date: '',
                date: '11/11/2018',
                ip: '',
                length: '10',
                errorMsg: false,
                visible: false,
                visible2: false,
                task_image: '',
            }
        },
        created() {
            this.$validator = this.$parent.$validator;
        },
        computed: {
            // vErrors(){
            //     return this.v_errors.items.map(e => {
            //         console.log(this.$validator.rules.length);
            //         console.log(e);
            //         return e.msg
            //     })
            // },
            taskImage: {
                get: function () {
                    return this.task_image
                },
                set: function (newValue) {
                    this.task_image = newValue;
                }
            },
        },
        methods: {
            click() {
                alert('click!!!');
            },
            onFileChange(e) {

                const files = e.target.files || e.dataTransfer.files;
                this.$validator.validate('image').then(valid => {

                    if (!files.length || !valid) {
                        return false;
                    } else {
                        this.createImage(files[0]);
                    }
                });

            },
            createImage(file) {
                const reader = new FileReader();

                reader.onload = (e) => {
                    this.taskImage = e.target.result;
                };
                reader.readAsDataURL(file);
            },
            removeImage: function (e) {
                this.taskImage = '';
            },
        }
    }
</script>