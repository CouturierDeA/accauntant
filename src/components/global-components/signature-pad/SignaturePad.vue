<template>
    <div class="signature-pad">
        <p v-if="title" class="signature-pad__title">{{ title }}</p>

        <div :class="{ 'signature-canvas__wrap': true }" ref="PadCanvasWrap">
            <canvas @mousedown="onCanvasClick" :class="canvasClass" ref="PadCanvas"></canvas>
            <p v-if="errorMessage" class="signature-pad__error">{{ errorMessage }}</p>
        </div>

        <el-row class="signature-pad__controls" type="flex" justify="end">
            <el-button class="signature-pad__control" :disabled="!isSigned" type="primary" @click="onSave">
                {{ L('Save') }}
            </el-button>
            <el-button class="signature-pad__control" type="alert" @click="onClear">{{ L('Erase') }}</el-button>
        </el-row>

    </div>
</template>

<script>
    import SignaturePad from 'signature_pad';

    export default {
        props: {
            format: {
                default() {
                    return this.formatDefault;
                }
            },
            title: this.title
        },
        data() {
            return {
                formatDefault: 'jpeg',
                supportedFormats: ['png', 'jpeg', 'svg'],
                signed: true,
                errorMessage: null,
                pad: null,
                ctx: null,
                padWrap: null,
                signaturePad: null,
            }
        },
        mounted() {
            this.onMounted();

        },
        destroyed() {
            this.onDestroyed();

        },
        methods: {
            onDestroyed() {
                $(window).off('resize', this.resizeHandler)
            },
            onMounted() {
                this.pad = this.$refs.PadCanvas;
                this.ctx = this.pad.getContext('2d');
                this.padWrap = this.$refs.PadCanvasWrap;

                $(window).on('resize', this.resizeHandler);
                if (this.pad) {
                    this.initialize();
                }
                this.resizeHandler();
            },
            onCanvasClick() {
                console.log('computedFormat', this.computedFormat);
                this.$emit('signatureDrawStart');
                if (!this.signed) {
                    this.signed = true;
                }
                // if (this.ctx) {
                //     this.ctx.globalCompositeOperation = 'source-over';
                //     this.ctx.globalCompositeOperation = 'destination-out';
                // }
            },
            onClear() {
                this.$emit('signatureClear');
                if (this.signaturePad) {
                    this.signaturePad.clear();
                }
            },
            onSave() {
                if (!this.isSignature) {
                    return;
                }
                const signaturePad = this.signaturePad;
                const format = this.computedFormat;

                let image = signaturePad.toDataURL(`image/${format}`);
                image = image.replace(`data:image/${format};base64,`, '');

                const sizeInBytes = 4 * Math.ceil(image.length / 3);

                // result/1000 is to convert bytes to KB.
                this.$emit('signatureSave', image, sizeInBytes);
                return image;

                // let dataSvg = signaturePad.toDataURL('image/svg+xml');
                // console.log(atob(dataSvg.split(',')[1]));
            },
            resizeHandler() {
                let canvas = this.pad;
                let canvasWrap = this.padWrap;
                if (canvas && canvasWrap) {
                    canvas.width = canvasWrap.offsetWidth;
                    canvas.height = canvasWrap.offsetWidth * .7;
                    this.onClear();
                }
            },
            initialize() {
                if (this.pad) {
                    this.signaturePad = new SignaturePad(this.pad, {
                        backgroundColor: 'rgb(255, 255, 255)' // necessary for saving image as JPEG; can be removed is only saving as PNG or SVG
                    });

                } else {
                    console.warn('Cant find referensed canvas');
                }

            },
        },
        computed: {
            canvasClass() {
                return {
                    'signature-canvas': true,
                    'mod--error': !this.isSigned
                }
            },
            isSigned() {
                const signed = this.signed;
                signed ? this.errorMessage = null : this.errorMessage = this.L('NoSignature');
                return signed;
            },
            computedFormat() {
                let format = this.formatDefault;
                this.supportedFormats.map((f) => {
                    if (f === this.format) {
                        if (format === 'svg') {
                            format = 'svg+xml';
                        } else {
                            format = f;
                        }
                    }
                });
                return format;
            },
            isSignature() {
                return this.signed = (this.signaturePad && !this.signaturePad.isEmpty());
            }
        },

    }

</script>

<style lang="scss">

    .signature-pad__controls {
        width: 100%;

    }

    .signature-pad__control {

        &:first-of-type {
            margin-right: 10px;
        }
    }

    .signature-pad__error {
        position: absolute;
        top: 100%;
    }

    .signature-canvas__wrap {
        position: relative;

        margin-bottom: 15px;
        color: red;
        background-color: white;

    }

    .signature-canvas {
        max-width: 100%;
        border: 1px solid gray;
        &.mod--error {
            border: 1px solid red;
        }
    }

</style>
