<template>
  <div ref="canvasContainer" class="canvas-container"></div>
</template>

<script>
import { ref, onMounted, onBeforeUnmount } from "vue";
import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
// import shiba from "../assets/three3DModel/shiba/scene.gltf?url";

export default {
  name: "ThreeJSComponent",
  setup() {
    const canvasContainer = ref(null);
    let scene, camera, renderer, model;

    const init = () => {
      // 创建场景
      scene = new THREE.Scene();
      scene.background = new THREE.Color("#fff");

      // 创建相机
      camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );
      camera.position.set(0, 0, 0); // 调整相机位置，使其远离模型

      // 创建渲染器
      renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.shadowMap.enabled = true; // 启用阴影贴图
      canvasContainer.value.appendChild(renderer.domElement);

      // 添加模型
      const loader = new GLTFLoader();
      loader.load(
        shiba,
        function (gltf) {
          model = gltf.scene;
          // 设置模型的位置
          model.position.set(0, 0, -5); // 你可以根据需要调整 x, y, z 坐标
          // 将模型添加到场景中
          scene.add(model);
          console.log('Model loaded:', model); // 调试输出
        },
        undefined,
        function (error) {
          console.error('Error loading model:', error);
        }
      );

      // 添加环境光
      const ambientLight = new THREE.AmbientLight(0x404040);
      scene.add(ambientLight);

      // 添加方向光
      const directionalLight = new THREE.DirectionalLight(0xffffff, 1); // 使用白色光源
      directionalLight.position.set(-1, 0, -1); // 设置光源的位置
      directionalLight.castShadow = true; // 开启阴影
      directionalLight.shadow.camera.top = 10;
      directionalLight.shadow.camera.bottom = -10;
      directionalLight.shadow.camera.left = -10;
      directionalLight.shadow.camera.right = 10;
      directionalLight.shadow.camera.near = 0.1;
      directionalLight.shadow.camera.far = 100;
      scene.add(directionalLight);

      // 启动动画
      animate();
    };

    const animate = () => {
      requestAnimationFrame(animate); // 确保这行没有被注释掉
      if (model) {
        model.rotation.y += 0.01; // 可选：旋转模型以便观察
      }
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
