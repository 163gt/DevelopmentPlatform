<template>
    <div class="net">
        <oneImageVue />
        <twoImageVue style="z-index:10" />
    </div>
</template>
<script>
import oneImageVue from './model/oneImage.vue'
import twoImageVue from './model/twoImage.vue'
export default {
    name:'netConsist',
    components:{
        oneImageVue,
        twoImageVue
    },
    data() {
        return {
            
        }
    },
}
</script>
<style lang="scss" scoped>
.net{
    width: 100%;
    background: linear-gradient(to bottom, #9478ff, #0D1117 100%);
    color: #fff;
}
</style>