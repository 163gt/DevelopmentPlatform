<template>
  <div class="WindowSize">
    <div class="WindowHeader">
      <div class="headerImage">
        <img
          style="width: 100%; height: 100%; border-radius: 10px"
          :src="headerImage"
        />
      </div>
    </div>
    <RouterView />
  </div>
</template>
<script setup>
import { ref } from "vue";

const headerImage = ref("src/assets/image/header.jpg");
</script>
<style lang="scss" scoped>
.headerImage {
  width: 40px;
  height: 40px;
  margin-left: 50px;
  border-radius: 20px;
}

</style>
