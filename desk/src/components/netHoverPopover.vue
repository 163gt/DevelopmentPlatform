<template>
  <div class="netHoverPopover">
    <div
      class="netHoverPopover_box"
      v-for="(item, index) in labelList"
      :key="index"
    >
      <span class="netHoverPopover_label">{{ item.label }}</span>
    </div>
  </div>
</template>

<script setup>
defineProps({
  labelList: { type: Array, default: [] },
});
</script>
<style lang="scss" scoped>
.netHoverPopover {
  width: 100%;
  .netHoverPopover_box {
    margin-bottom: 10px;
    .netHoverPopover_label {
      cursor: pointer;
      font-weight: bold;
    }
  }
}
</style>
