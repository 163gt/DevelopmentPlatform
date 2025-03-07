<template>
  <div class="WindowSize">
    <div :class="`WindowHeader_${styleNames.styleName}`">
      <div class="headerImage">
        <img
          style="width: 100%; height: 100%; border-radius: 10px"
          :src="headerImage"
        />
      </div>
      <div class="margin">
        <el-popover placement="top-start" :width="200" trigger="hover">
          <div style="width: 100%">
            <netHoverPopoverVue :labelList="labelList" />
          </div>
          <template #reference>
            <el-button class="header_btn" link>产 品</el-button>
          </template>
        </el-popover>
        <el-popover placement="top-start" :width="200" trigger="hover">
          <div style="width: 100%">
            <netHoverPopoverVue :labelList="labelList" />
          </div>
          <template #reference>
            <el-button class="header_btn" link>主 题</el-button>
          </template>
        </el-popover>
      </div>
    </div>
    <RouterView />
  </div>
</template>
<script setup>
import { ref, onBeforeMount, onMounted, onUnmounted } from "vue";
import netHoverPopoverVue from "../components/netHoverPopover.vue";
import header from "@/assets/images/header.jpg";
import { overallStyle } from "@/stores/index";

//头部图标
const headerImage = ref(header);
const styleNames = overallStyle();
const labelList = ref([
  { label: "创建简历", url: "", icon: "" },
  { label: "简历模板", url: "", icon: "" },
]);

function handleScroll() {
  const scrollY = window.scrollY; //获取滚动数值
  if (scrollY > 50) {
    overallStyle().setStyleName("black");
  } else {
    overallStyle().setStyleName("convention");
  }
}
onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

// 组件销毁时移除事件监听
onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
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
  .header_btn {
    color: #fff;
    font-weight: bold;
  }
}
</style>
