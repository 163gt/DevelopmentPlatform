<template>
    <div class="net">
        <twoImageVue />
        <oneImageVue />
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
    background-color: rgb(74, 74, 74);
}
</style>