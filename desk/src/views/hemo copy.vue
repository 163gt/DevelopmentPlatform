<template>
  <div class="home" ref="world"></div>
</template>
<script>
import { ref, onMounted, onBeforeUnmount } from "vue";
import * as THREE from "three";
import * as echarts from "echarts";
import { PointerLockControls } from "three/addons/controls/PointerLockControls.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

import {
  CSS3DRenderer,
  CSS3DObject,
  CSS3DSprite,
} from "three/examples/jsm/renderers/CSS3DRenderer.js";

export default {
  setup(props) {
    const world = ref(null);

    /**场景 */
    let scene;
    /**相机 */
    let camera;
    /**WebGL渲染器 */
    let renderer;
    /**网格大小 */
    const floorSize = 100;
    /**3d渲染器 */
    let css3Renderer;

    const init = () => {
      //添加场景
      scene = new THREE.Scene();
      scene.background = "black";

      //添加相机
      camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );
      camera.position.set(0, 2, 5);

      //添加渲染器
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

      // 添加网格助手
      const gridHelper = new THREE.GridHelper(
        floorSize,
        floorSize,
        0x00ffff,
        0x00ffff
      ); // 参数分别为网格的大小和分割数量
      scene.add(gridHelper);
      gridHelper.position.set(0, 0, 0);

      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.domElement.style.position = "absolute";
      renderer.domElement.style.top = "0";
      world.value.appendChild(renderer.domElement);

      //添加3d
      css3Renderer = new CSS3DRenderer();
      css3Renderer.setSize(window.innerWidth, window.innerHeight);
      css3Renderer.domElement.style.position = "absolute";
      css3Renderer.domElement.style.top = "0";
      world.value.appendChild(css3Renderer.domElement);

      animate();
    };
    const animate = () => {
      requestAnimationFrame(animate); // 确保这行没有被注释掉

      renderer.render(scene, camera);
    };

    onMounted(() => {
      init();
    });

    return {
      world,
    };
  },
};
</script>
<style lang="scss" scoped>
.home {
  width: 100%;
  height: 100%;
  position: absolute;
  overflow: hidden;
}
</style>
