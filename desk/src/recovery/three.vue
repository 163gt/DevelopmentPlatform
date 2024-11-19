<template>
  <div class="ThreeScene">
    <div class="coordinate">
      {{ modelPosition.x }} {{ modelPosition.y }} {{ modelPosition.z }}
    </div>
    <div ref="canvasContainer" class="canvas-container"></div>
    <div class="direction-controls">
      <button class="direction-button up" @click="moveModel('up')"><</button>
      <button class="direction-button left" @click="moveModel('left')"><</button>
      <button class="direction-button right" @click="moveModel('right')">></button>
      <button class="direction-button down" @click="moveModel('down')">v</button>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, onBeforeUnmount } from "vue";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
// import {addThreeGLTFLoader} from "@/utils/createThreeGLTF"

import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import shiba from "@/assets/Soldier.glb?url";

export default {
  name: "ThreeJSComponent",
  setup() {
    const canvasContainer = ref(null);
    const currentX = ref(0);
    const currentY = ref(5);
    const currentZ = ref(0);
    const modelPosition = ref({ x: 0, y: 0, z: 0 }); // 添加模型位置
    const modelDirection  = ref({ x: 0, y: 0, z: 0 }); // 添加模型位置
    let mixer;
    let scene, camera, renderer, controls, walkAction,model;
    const init = () => {
      // 创建渲染器
      renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setSize(window.innerWidth, window.innerHeight);
      canvasContainer.value.appendChild(renderer.domElement);
      // 创建场景
      scene = new THREE.Scene();
      scene.background = new THREE.Color("black");
      // 创建相机
      camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );
      // 添加模型
      // const loader = new GLTFLoader();
      // addThreeGLTFLoader(loader, shiba, scene, [modelPosition.value.x, modelPosition.value.y, modelPosition.value.z], (loadedModel, gltf) => {
      //   model = loadedModel;
      //   mixer = new THREE.AnimationMixer(loadedModel);
      //   const animations = gltf.animations;
      //   if (animations && animations.length > 0) {
      //     walkAction = mixer.clipAction(animations[1]); // 假设第一个动画是行走动作
      //     // walkAction.play(); // 播放行走动画
      //     walkAction.stop(); // 停止行走动画
      //   }
      // });
      // 创建地板
      const floorGeometry = new THREE.PlaneGeometry(20, 20);
      const floorMaterial = new THREE.MeshStandardMaterial({
        color: 0x808080,
        side: THREE.DoubleSide,
      });
      const floor = new THREE.Mesh(floorGeometry, floorMaterial);
      floor.rotation.x = -Math.PI / 2; // 旋转地板使其水平
      floor.position.y = 0; // 设置地板的位置
      scene.add(floor);
      // 创建墙壁材质
      const wallMaterial = new THREE.MeshStandardMaterial({ color: 0xffaaaa });

      // 创建前墙
      const frontWallGeometry = new THREE.BoxGeometry(20, 25, 1);
      const frontWall = new THREE.Mesh(frontWallGeometry, wallMaterial);
      frontWall.position.set(0, 12.5, -10); // 位置：x=0, y=12.5, z=-5
      frontWall.receiveShadow = true;
      scene.add(frontWall);

      // 创建后墙
      const backWallGeometry = new THREE.BoxGeometry(20, 25, 1);
      const backWall = new THREE.Mesh(backWallGeometry, wallMaterial);
      backWall.position.set(0, 12.5, 10); // 位置：x=0, y=12.5, z=5
      backWall.receiveShadow = true;
      scene.add(backWall);

      // 创建左墙
      const leftWallGeometry = new THREE.BoxGeometry(1, 25, 20);
      const leftWall = new THREE.Mesh(leftWallGeometry, wallMaterial);
      leftWall.position.set(-10, 12.5, 0); // 位置：x=-5, y=12.5, z=0
      leftWall.receiveShadow = true;
      scene.add(leftWall);

      // 创建右墙
      const rightWallGeometry = new THREE.BoxGeometry(1, 25, 20);
      const rightWall = new THREE.Mesh(rightWallGeometry, wallMaterial);
      rightWall.position.set(10, 12.5, 0); // 位置：x=5, y=12.5, z=0
      rightWall.receiveShadow = true;
      scene.add(rightWall);

      // 创建点光源
      const pointLight = new THREE.PointLight(0xffffff, 2, 100); // 白色光，强度为1，最大距离为100
      pointLight.position.set(0, 20, 0); // 设置光源位置
      scene.add(pointLight);

      // 创建OrbitControls
      controls = new OrbitControls(camera, renderer.domElement);
      //监听键盘事件
      controls.listenToKeyEvents(window);
      controls.enableDamping = true; // 启用阻尼效果
      controls.dampingFactor = 0.01; // 阻尼因子
      controls.screenSpacePanning = false;
      controls.minDistance = 3;
      controls.maxDistance = 10;
      controls.maxPolarAngle = Math.PI / 2.5;
      controls.update(); // 更新控制器
      camera.position.set(currentY.value, currentX.value, currentZ.value); // 调整相机位置，使其远离模型

      //原点坐标轴
      const axesHelper = new THREE.AxesHelper(5);
      scene.add(axesHelper);
      // 启动动画
      animate();
    };

    
    const animate = () => {
      requestAnimationFrame(animate); // 确保这行没有被注释掉
      // 确保 mixer 被初始化
      if (mixer) {
        mixer.update(0.01); // 更新动画状态
      }
      controls.update(); // 更新控制器
      renderer.render(scene, camera); // 渲染场景
    };

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    const moveModel = (direction) => {
      let step = 0.5;
      if (!model) {
        console.log("Model is not loaded yet."); // 如果模型未加载，打印提示
        return;
      }
      switch (direction) {
        case "up":
          modelPosition.value.z += step; // 向上移动
          modelDirection.value.y = Math.PI; // 面向 Z 轴
          break;
        case "down":
          modelPosition.value.z -= step; // 向下移动
          modelDirection.value.y = 0; // 面向 Z 轴
          break;
        case "left":
          modelPosition.value.x -= step; // 向左移动
          modelDirection.value.y = Math.PI/2; // 面向 Z 轴
          break;
        case "right":
          modelPosition.value.x += step; // 向右移动
          modelDirection.value.y = -Math.PI/2; // 面向 Z 轴
          break;
      }
      walkAction.play(); // 播放行走动画
      model.rotation.set(modelDirection.value.x, modelDirection.value.y, modelDirection.value.z); // 更新模型旋转
      model.position.set(modelPosition.value.x, modelPosition.value.y, modelPosition.value.z); // 更新模型位置
      setTimeout(() => {
        walkAction.stop(); // 停止行走动画
      }, 500);
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
      moveModel,
      currentY,
      currentX,
      currentZ,
      modelPosition,
    };
  },
};
</script>

<style>
.ThreeScene {
  position: relative;
  width: 100vw;
  height: 100vh;
}
.canvas-container {
  width: 100%;
  height: 100%;
}

.coordinate {
  position: absolute;
  top: 0;
  left: 0;
  color: #fff;
}
.direction-controls {
  position: absolute;
  bottom: 10px; /* 距离底部的距离 */
  right: 10px; /* 距离右边的距离 */
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* 3列布局 */
  grid-template-rows: repeat(3, 1fr); /* 3行布局 */
  gap: 5px; /* 调整按钮之间的间距 */
  justify-items: center;
  align-items: center;
}

.direction-button {
  width: 50px;
  height: 50px;
  font-size: 24px;
  border: none;
  background-color: #f0f0f0;
  cursor: pointer;
  transition: background-color 0.3s;
}

.direction-button:hover {
  background-color: #d0d0d0;
}

/* 上方向 */
.up {
  grid-row: 1 / 2;
  grid-column: 2 / 3;
  transform: rotate(90deg);
}

/* 下方向 */
.down {
  grid-row: 3 / 4;
  grid-column: 2 / 3;
  /* transform: rotate(180deg); */
}

/* 左方向 */
.left {
  grid-row: 2 / 3;
  grid-column: 1 / 2;
  /* transform: rotate(-90deg); */
}

/* 右方向 */
.right {
  grid-row: 2 / 3;
  grid-column: 3 / 4;
  z-index: 0 !important;
  /* transform: rotate(90deg); */
}
</style>
