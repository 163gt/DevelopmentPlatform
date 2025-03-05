<template>
  <div class="netImage" ref="imageRef">
    <div class="oneImage_left" ref="imageRefBox">
      <img
        class="slide-rotate-hor-t-bck"
        style="width: 100%; height: 100%"
        :src="address"
      />
    </div>
    <div class="oneImage_right">构建构建构建构建构建构建构建构建构建构建</div>
  </div>
</template>
<script setup>
import { ref, onMounted, nextTick, watch, onUnmounted } from "vue";
import { imageIntersectionObserver, debounce } from "@/utils/tool";
//图片地址
const address = ref("");
//图片ref
const imageRef = ref(null);
//图片父容器
const imageRefBox = ref(null);
//防抖函数使用
// const debounceScroll = debounce(handleScroll, 0);

function handleScroll() {
  const scrollY = window.scrollY; //获取滚动数值
  const maxScroll = imageRefBox.value.offsetHeight; //最大滚动距离
  const remainingY = maxScroll - scrollY; //剩余滚动距离
  const progress = Math.min(remainingY / maxScroll, 1); //计算进度
  if (progress < 0.3) {
    imageRef.value.style.transform = `scale(0)`;
    imageRef.value.style.opacity = `0`;
  } else {
    imageRef.value.style.transform = `scale(${progress})`;
    imageRef.value.style.opacity = `${progress}`;
  }
}

onMounted(() => {
  if (imageRef.value) {
    // 开始观察图片元素
    imageIntersectionObserver(
      imageRef.value,
      address,
      "src/assets/image/oneImage.webp"
    );
    //添加滚动监听
    window.addEventListener("scroll", handleScroll);
  }
});

// 组件销毁时移除事件监听
onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});

// watch(address,(newValue, oldValue) => {

// });
</script>
<style lang="scss" scoped>
.oneImage_left {
  width: 60%;
  height: 100%;
  //   position: fixed;
}
.oneImage_right {
  width: 40%;
  //   margin-left: 60%;
  height: 100%;
  display: flex;
  align-items: center;
  font-size: 2rem;
}

.slide-rotate-hor-t-bck {
  transition: transform 0.2s;
  transform-origin: center center;
}
</style>
