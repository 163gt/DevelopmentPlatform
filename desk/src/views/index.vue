<template>
  <div class="WindowSize">
    <div class="WindowHeader">
      <div class="headerImage">
        <img
          style="width: 100%; height: 100%; border-radius: 10px"
          :src="headerImage"
        />
      </div>
      <div class="margin">
        <el-popover
          placement="top-start"
          :width="200"
          trigger="hover"
        >
          <div style="width:100%">
            <netHoverPopoverVue />
          </div>
          <template #reference>
            <el-button link>产品</el-button>
          </template>
        </el-popover>
      </div>
    </div>
    <RouterView />
  </div>
</template>
<script setup>
import { ref } from "vue";
import netHoverPopoverVue from "../components/netHoverPopover.vue";
import header from "@/assets/images/header.jpg"
const headerImage = ref(header);
</script>
<style lang="scss" scoped>
.headerImage {
  width: 40px;
  height: 40px;
  margin-left: 50px;
  border-radius: 20px;
}
.margin {
  margin: 0 20px;
  color: #fff;
}
</style>
