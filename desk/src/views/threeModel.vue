<template>
  <div ref="canvasContainer" class="canvas-container"></div>
</template>

<script>
import { ref, onMounted, onBeforeUnmount } from "vue";
import * as THREE from "three";

export default {
  name: "ThreeJSComponent",
  setup() {
    const canvasContainer = ref(null);
    let scene, camera, renderer, cube;

    const init = () => {
      // 创建场景
      scene = new THREE.Scene();
      scene.background = new THREE.Color("#ededed");

      const directionalLight = new THREE.DirectionalLight(0xffffff, 1); // 颜色改为白色
      directionalLight.position.set(5, 10, 7); // 设置光源的位置
      directionalLight.castShadow = true; // 开启阴影
      scene.add(directionalLight);

      // 创建相机
      camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );
      camera.position.z = 5;

      // 创建渲染器
      renderer = new THREE.WebGLRenderer();
      renderer.setSize(window.innerWidth, window.innerHeight);
      canvasContainer.value.appendChild(renderer.domElement);

      // 创建立方体
      const geometry = new THREE.BoxGeometry();
      const material = new THREE.MeshStandardMaterial({ color: 0x00ff00 }); // 改为使用 MeshStandardMaterial
      cube = new THREE.Mesh(geometry, material);
      scene.add(cube);

      // 启动动画
      animate();
    };

    const animate = () => {
    //   requestAnimationFrame(animate); // 不要注释掉这行
    //   cube.rotation.x += 0.01; // 旋转立方体
    //   cube.rotation.y += 0.01; // 旋转立方体
      renderer.render(scene, camera);
    };

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    onMounted(() => {
      init();
      window.addEventListener("resize", handleResize);
    });

    onBeforeUnmount(() => {
      window.removeEventListener("resize", handleResize);
      // 清理资源
      renderer.dispose();
    });

    return {
      canvasContainer,
    };
  },
};
</script>

<style>
.canvas-container {
  width: 100vw;
  height: 100vh;
}
</style>