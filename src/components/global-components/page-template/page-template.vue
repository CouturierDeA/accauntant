<template>
    <div class="page">
        <div class="d-flex flex-wrap flex-column flex-md-row">
            <!-- Aside -->
            <div class="col-md-4 order-md-2">
                <slot name="aside"></slot>
            </div>
            <!-- Content -->
            <div class="col-md-8 order-md-1">
                <slot name="content"></slot>
            </div>
        </div>
    </div>

</template>
<style lang="scss">
    @import '../../../scss/core.scss';
</style>
