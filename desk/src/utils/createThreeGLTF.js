import * as THREE from 'three';
/**
 * 添加 GLTF 模型加载器到指定的 Three.js 加载器实例中。
 * @param loader - 用于加载 GLTF 模型的 Three.js 加载器实例。
 * @param modelGLB - GLTF 模型文件的路径或 URL。
 * @param scene - Three.js场景实例
 * @param XYZ  - 模型XYZ坐标数组
 * @param onModelLoaded  - 模型加载完成后的回调函数
 */
function addThreeGLTFLoader(loader, modelGLB, scene,XYZ, onModelLoaded) {
  let model;
  loader.load(
    modelGLB,
    function (gltf) {
      model = gltf.scene;
      // 设置模型的位置
      model.position.set(XYZ[0], XYZ[1], XYZ[2]); // 你可以根据需要调整 x, y, z 坐标
       // 遍历模型中的所有网格，确保它们的材质支持光照
    //    model.traverse(function (child) {
    //     if (child.isMesh) {
    //       child.material = new THREE.MeshStandardMaterial({
    //         color: 0x000000, // 你可以根据需要设置颜色
    //         metalness: 0,  // 金属度
    //         roughness: 0   // 粗糙度
    //       });
    //     }
    //   });
      // 将模型添加到场景中
      scene.add(model);
      if (onModelLoaded) {
        onModelLoaded(model);
      }
    },
    undefined,
    function (error) {
      console.error("Error loading model:", error);
    }
  );
}

export default addThreeGLTFLoader;
