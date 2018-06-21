<template>
  <div class="row-half d-flex flex-wrap">
    <div class="form__input-wrap cxs-24 csm-12">
      <el-input name="min_value"
                class="form__input"
                :class="{ 'mod__error': v_errors.has(v_scope ? `${v_scope}.min_value` : 'min_value') }"
                v-validate="{ min_value: 5 }"
                :data-vv-scope="v_scope"
                placeholder="min_value"
                v-model="min_value">
      </el-input>
      <span class="form__field-message">{{ v_errors.first(v_scope ? `${v_scope}.min_value` : 'min_value') }}</span>
    </div>

    <div class="form__input-wrap cxs-24 csm-12">
      <el-input name="before_date"
                class="form__input"
                :data-vv-scope="v_scope"
                :class="{ 'mod__error': v_errors.has(v_scope ? `${v_scope}.before_date` : 'before_date') }"
                v-validate="{ before: { date } }"
                placeholder="Before date"
                v-model="before_date">
      </el-input>
      <span class="form__field-message">{{ v_errors.first(v_scope ? `${v_scope}.before_date` : 'before_date') }}</span>
    </div>
    <div class="form__input-wrap cxs-24 csm-12">
      <el-input name="after_date_include"
                class="form__input"
                :data-vv-scope="v_scope"
                :class="{ 'mod__error': v_errors.has(v_scope ? `${v_scope}.after_date_include` : 'after_date_include') }"
                v-validate="{ after: { date },inclusion : date}"
                placeholder="After_date inclusion"
                v-model="after_date">
      </el-input>
      <span class="form__field-message">{{ v_errors.first(v_scope ? `${v_scope}.after_date_include` : 'after_date_include') }}</span>
    </div>
    <div class="form__input-wrap cxs-24 csm-12">
      <el-input name="after_date"
                class="form__input"
                :data-vv-scope="v_scope"
                :class="{ 'mod__error': v_errors.has('after_date') }"
                v-validate="{ after: { date } }"
                placeholder="After date"
                v-model="after_date">
      </el-input>
      <span class="form__field-message">{{ v_errors.first(v_scope ? `${v_scope}.after_date` : 'after_date') }}</span>
    </div>
    <div class="form__input-wrap cxs-24 csm-12">
      <el-input name="decimal"
                class="form__input"
                :data-vv-scope="v_scope"
                :class="{ 'mod__error': v_errors.has(v_scope ? `${v_scope}.decimal` : 'decimal') }"
                v-validate="{ decimal: 3, required: true }"
                placeholder="Decimal"
                v-model="decimal">
      </el-input>
      <span class="form__field-message">{{ v_errors.first(v_scope ? `${v_scope}.decimal` : 'decimal') }}</span>
    </div>
    <div class="form__input-wrap cxs-24 csm-12">
      <el-input name="ip"
                class="form__input"
                :data-vv-scope="v_scope"
                :class="{ 'mod__error': v_errors.has('ip') }"
                v-validate="{ ip: true }"
                placeholder="Ip"
                v-model="ip">
      </el-input>
      <span class="form__field-message">{{ v_errors.first('ip') }}</span>
    </div>
    <div class="form__input-wrap cxs-24 csm-12">
      <el-input name="date_format"
                class="form__input"
                :data-vv-scope="v_scope"
                :class="{ 'mod__error': v_errors.has('date_format') }"
                v-validate="{ date_format : 'DD/MM/YYYY' }"
                placeholder="Date format"
                v-model="date">
      </el-input>

      <span class="form__field-message">{{ v_errors.first('date_format') }}</span>
    </div>
    <div class="form__input-wrap cxs-24 csm-12">
      <el-input name="someValue"
                class="form__input"
                :data-vv-scope="v_scope"
                :class="{ 'mod__error': v_errors.has('someValue') }"
                :placeholder="'someValue'"
                v-validate="{ decimal: 3, required: true }"
                v-model="someData.someValue">
      </el-input>
      <span>{{ v_errors.first(v_scope ? `${v_scope}.someValue` : 'someValue') }}</span>
    </div>
    <div class="form__input-wrap cxs-24 csm-12">
      <el-input name="date_between"
                class="form__input"
                :data-vv-scope="v_scope"
                :class="{ 'mod__error': v_errors.has(v_scope ? `${v_scope}.date_between` : 'date_between') }"
                v-validate="{ date_format : 'DD/MM/YYYY', date_between: {min: after_date, max : before_date,format: 'DD/MM/YYYY'}}"
                placeholder="date_between"
                v-model="date_between">
      </el-input>

      <span
        class="form__field-message">{{ v_errors.first(v_scope ? `${v_scope}.date_between` : 'date_between') }}</span>
    </div>
    <div class="form__input-wrap cxs-24 csm-12">
      <el-input name="Length"
                class="form__input"
                :class="{ 'mod__error': v_errors.has('Length') }"
                v-validate="{ length: { min: 10, max: 20} }"
                placeholder="Length between 10 and 20"
                v-model="length">
      </el-input>
      <span class="form__field-message">{{ v_errors.first('Length') }}</span>
    </div>
    <div class="form__input-wrap cxs-24 csm-12">
      <el-input name="Length2"
                class="form__input"
                :class="{ 'mod__error': v_errors.has('Length') }"
                v-validate="{ length: 10, required: true }"
                placeholder="Length must be 10"
                v-model="length">
      </el-input>
      <span class="form__field-message">{{ v_errors.first('Length2') }}</span>
    </div>

    <div class="task__image" :style="`background-image: url(${fileAttachment.fileContent})`">
      <input ref="fileUpload" class="task__image-input"
             type="file" name="image"
             v-validate.reject="{ mimes: mimes, size: '200000' }"
             @change="onFileUploadChange($event)">
      <span class="task__image-message"
            :class="{ 'mod--error': v_errors.has('image')}"
            v-if="v_errors.has('image')">{{ v_errors.first('image') }}</span>
    </div>
  </div>

</template>

<script>
  export default {
    // inject: {
    //      $validator: '$validator'
    // },
    props: {
      v_scope: this.v_scope,
      validator: this.validator,
      someData: this.someData,

    },
    data() {
      return {
        mimes: ['image/jpeg', 'image/jpg', 'image/png', 'image/tiff', 'application/pdf', 'text/plain'],
        name: 'inputs module',
        decimal: '',
        min_value: '',
        before_date: '11/11/2020',
        after_date: '11/11/2016',
        date_between: '11/11/2018',
        date: '11/11/2018',
        ip: '',
        length: '10',
        errorMsg: false,
        visible: false,
        visible2: false,
        fileAttachment: {
          attachmentId: 0,
          fileContent: '',
          fileName: null,
          mimeType: null,
          type: '',
          notes: ''
        }
      }
    },
    methods: {
      openAttachment() {
        const content = this.fileAttachment;

        const src = encodeURI(content.fileContent);
        const w = window.open();


        if (content.mimeType.indexOf('image') !== -1) {
          const html = `<img src="${src}" alt="${content.fileName}">`;
          $(w.document.body).html(html);
        } else {
          w.document.write('<iframe src="' + src + '"'
            + ' frameborder="0"  style="border:0; top:0; left:0; bottom:0; right:0; width:100%; height:100%;" '
            + 'allowfullscreen ></iframe>');
        }
        w.document.title = content.fileName;
      },
      onFileUploadChange($event) {

        let input = $event.target;
        let inputName = $event.target.name;
        let localErrors = this.v_errors;
        localErrors.clear(inputName);

        // console.log(this.$refs.fileUpload.files.FileList);

        if (this.$refs.fileUpload.files.length) {
          this.fileAttachment.fileName = this.$refs.fileUpload.files[0].name;
          const file = this.$refs.fileUpload.files[0];
          console.warn('this.fileAttachment.fileName', this.fileAttachment.fileName)
          if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
              console.warn('localErrors.first(inputName)', localErrors.first(inputName));
              if (!localErrors.has(inputName)) {
                const fileContent = event.target.result || null;

                this.fileAttachment.fileContent = fileContent;
                this.fileAttachment.mimeType = file.type;
                this.fileAttachment.fileName = file.name;
                console.log("Filename: " + file.name);
                console.log("Type: " + file.type);
                console.log("Size: " + file.size + " bytes");

              } else {
                input.value = '';
                this.fileAttachment.fileContent = null;
                this.fileAttachment.fileName = null;
                this.fileAttachment.mimeType = null;
              }

            };
            reader.readAsDataURL(file);
          }
        }

      },
    },

    created() {
      if (this.validator) {
        this.$validator = this.validator;
      }
    },
  }
</script>