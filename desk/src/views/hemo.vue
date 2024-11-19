<template>
  <div class="home" ref="world">
    <button class="lockBtn" @click="lockButton">Lock Mouse</button>
  </div>
</template>
<script>
import { ref, onMounted, onBeforeUnmount } from "vue";
import * as THREE from "three";
import { PointerLockControls } from "three/addons/controls/PointerLockControls.js";
export default {
  setup(props) {
    const world = ref(null);
    let scene,
      camera,
      renderer,
      controls,
      clock,
      velocity,
      direction,
      velocityFactor;
    let moveForward = false;
    let moveBackward = false;
    let moveLeft = false;
    let moveRight = false;
    //设置地板和网格大小
    const floorSize = 100;
    const halfFloorSize = floorSize / 2;

    const init = () => {
      // 创建渲染器
      renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setSize(window.innerWidth, window.innerHeight);
      world.value.appendChild(renderer.domElement);
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
      camera.position.set(5, 5, 5);

      //指针控制器
      controls = new PointerLockControls(camera, renderer.domElement);
      scene.add(controls.getObject());
      clock = new THREE.Clock();

      // 添加网格助手
      const gridHelper = new THREE.GridHelper(
        floorSize,
        floorSize,
        0x00ffff,
        0x00ffff
      ); // 参数分别为网格的大小和分割数量
      scene.add(gridHelper);
      gridHelper.position.set(0, 0, 0);

      // 创建地板
      const floorGeometry = new THREE.PlaneGeometry(floorSize, floorSize);
      const floorMaterial = new THREE.MeshBasicMaterial({
        color: 0x808080,
        side: THREE.DoubleSide,
      });
      const floor = new THREE.Mesh(floorGeometry, floorMaterial);
      floor.rotation.x = -Math.PI / 2; // 旋转地板使其水平
      floor.position.y = 0; // 设置地板的位置
      scene.add(floor);

      //原点坐标轴
      const axesHelper = new THREE.AxesHelper(5);
      scene.add(axesHelper);

      velocity = new THREE.Vector3();
      direction = new THREE.Vector3();
      velocityFactor = 5;

      //添加星空背景
      starBackground();

      document.addEventListener("keydown", handleKeyDown);
      document.addEventListener("keyup", handleKeyUp);
      // 启动动画
      animate();
    };
    const starBackground = () => {
      const vertices = [];
      for (let i = 0; i < 10000; i++) {
        const x = THREE.MathUtils.randFloatSpread(2000);
        const y = THREE.MathUtils.randFloatSpread(2000);
        const z = THREE.MathUtils.randFloatSpread(2000);

        vertices.push(x, y, z);
      }
      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute(
        "position",
        new THREE.Float32BufferAttribute(vertices, 3)
      );
      const material = new THREE.PointsMaterial({ color: 0x888888 });
      const points = new THREE.Points(geometry, material);
      scene.add(points);
    };
    //点击锁定指针
    const lockButton = () => {
      controls.lock();
    };
    //键盘按下事件
    const handleKeyDown = (event) => {
      switch (event.code) {
        case "ArrowUp":
        case "KeyW":
          moveForward = true;
          break;
        case "ArrowDown":
        case "KeyS":
          moveBackward = true;
          break;
        case "ArrowLeft":
        case "KeyA":
          moveLeft = true;
          break;
        case "ArrowRight":
        case "KeyD":
          moveRight = true;
          break;
      }
    };
    //键盘抬起事件
    const handleKeyUp = (event) => {
      switch (event.code) {
        case "ArrowUp":
        case "KeyW":
          moveForward = false;
          break;
        case "ArrowDown":
        case "KeyS":
          moveBackward = false;
          break;
        case "ArrowLeft":
        case "KeyA":
          moveLeft = false;
          break;
        case "ArrowRight":
        case "KeyD":
          moveRight = false;
          break;
      }
    };
    //处理更新移动视角
    const rendererMove = () => {
      if (controls.isLocked) {
        velocity.x -= velocity.x * 10.0 * 0.01;
        velocity.z -= velocity.z * 10.0 * 0.01;
        if (moveForward) velocity.z -= velocityFactor * 0.01;
        if (moveBackward) velocity.z += velocityFactor * 0.01;
        if (moveLeft) velocity.x -= velocityFactor * 0.01;
        if (moveRight) velocity.x += velocityFactor * 0.01;
        controls.moveRight(velocity.x * 0.1);
        controls.moveForward(-velocity.z * 0.1);
        // 获取当前的位置
        const position = new THREE.Vector3();
        controls.getObject().getWorldPosition(position);
        // 检查并限制 x 轴边界
        if (position.x < -halfFloorSize) {
          position.x = -halfFloorSize;
        } else if (position.x > halfFloorSize) {
          position.x = halfFloorSize;
        }
        // 检查并限制 z 轴边界
        if (position.z < -halfFloorSize) {
          position.z = -halfFloorSize;
        } else if (position.z > halfFloorSize) {
          position.z = halfFloorSize;
        }
        // 将位置设置回对象
        controls.getObject().position.set(position.x, position.y, position.z);
      }
    };
    const animate = () => {
      requestAnimationFrame(animate); // 确保这行没有被注释掉
      //处理更新移动视角
      rendererMove();
      renderer.render(scene, camera); // 渲染场景
    };

    onMounted(() => {
      init();
    });

    // 清理
    onBeforeUnmount(() => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      container.value.removeChild(renderer.domElement);
    });

    return {
      world,
      lockButton,
    };
  },
};
</script>
<style lang="scss" scoped>
.home {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  position: relative;
  .lockBtn {
    position: absolute;
    top: 0;
    left: 50%;
    background-color: #a1a1a1;
  }
}
</style>
