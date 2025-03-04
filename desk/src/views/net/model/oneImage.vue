<template>
  <div class="netImage">
    <div class="oneImage_left">
        <img ref="imageRef" style="width: 100%; height: 100%" :src="address" />
    </div>
    <div class="oneImage_right"></div>
  </div>
</template>
<script setup>
import { ref, onMounted, nextTick, watch } from "vue";
import { imageIntersectionObserver } from "@/utils/tool";
const address = ref('');
const imageRef = ref(null);
onMounted(() => {
  if (imageRef.value) {
    // 开始观察图片元素
    imageIntersectionObserver(
      imageRef.value,
      address,
      "src/assets/image/oneImage.webp"
    );
  }
});
// watch(address,(newValue, oldValue) => {
//   console.log(`address发生变化：从 ${oldValue} 到 ${newValue}`);
// });
function oneImageView() {
  observer;
}
</script>
<style lang="scss" scoped>
  .oneImage_left {
    width: 60%;
    height: 100%;
  }
  .oneImage_right {
    width: 40%;
    height: 100%;
  }
</style>
