<template>
  <div ref="container" class="container">
    <!-- 复杂的 HTML 元素 -->
    <div ref="htmlElement" class="complex-element" style="display: none">
      <h1>Hello, World!</h1>
      <p>This is a complex HTML element with multiple tags.</p>
      <button @click="handleButtonClick()">Click me</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import * as THREE from "three";
import {
  CSS2DRenderer,
  CSS2DObject,
} from "three/examples/jsm/renderers/CSS2DRenderer.js";

const container = ref(null);
const htmlElement = ref(null);

// 按钮点击事件处理
function handleButtonClick() {
  console.log("77777");
}
onMounted(() => {
  // 创建场景
  const scene = new THREE.Scene();

  // 创建相机
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.z = 5;

  // 创建 WebGL 渲染器
  const webglRenderer = new THREE.WebGLRenderer();
  webglRenderer.setSize(window.innerWidth, window.innerHeight);
  container.value.appendChild(webglRenderer.domElement);

  // 创建 CSS2D 渲染器
  const cssRenderer = new CSS2DRenderer();
  cssRenderer.setSize(window.innerWidth, window.innerHeight);
  cssRenderer.domElement.style.position = "absolute";
  cssRenderer.domElement.style.top = "0px";
  container.value.appendChild(cssRenderer.domElement);

  // 将 Vue 模板中的复杂 HTML 元素添加到 CSS2DObject
  const object = new CSS2DObject(htmlElement.value);
  object.position.set(0, 0, 0);
  scene.add(object);

  // 确保 CSS2DObject 中的元素是可交互的
  object.element.style.pointerEvents = "auto";

  // 渲染循环
  const animate = () => {
    requestAnimationFrame(animate);
    webglRenderer.render(scene, camera);
    cssRenderer.render(scene, camera);
  };
  animate();

  // 处理窗口大小变化
  const handleResize = () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    webglRenderer.setSize(window.innerWidth, window.innerHeight);
    cssRenderer.setSize(window.innerWidth, window.innerHeight);
  };
  window.addEventListener("resize", handleResize);

  // 清理
  onBeforeUnmount(() => {
    window.removeEventListener("resize", handleResize);
    container.value.removeChild(webglRenderer.domElement);
    container.value.removeChild(cssRenderer.domElement);
  });
});
</script>

<style scoped>
.container {
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
}

.complex-element {
  width: 200px;
  height: 200px;
  background-color: red;
  color: white;
  text-align: center;
  padding: 10px;
  box-sizing: border-box;
}
</style>
