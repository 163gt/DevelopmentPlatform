import * as THREE from "three";
let model;
let idleAction, walkAction, runAction;
let actions, settings;
/**
 * 添加 GLTF 模型加载器到指定的 Three.js 加载器实例中。
 * @param loader - 用于加载 GLTF 模型的 Three.js 加载器实例。
 * @param modelGLB - GLTF 模型文件的路径或 URL。
 * @param scene - Three.js场景实例
 * @param XYZ  - 模型XYZ坐标数组
 * @param onModelLoaded  - 模型加载完成后的回调函数
 */
function addThreeGLTFLoader(loader, modelGLB, scene, XYZ, onModelLoaded) {
  loader.load(
    modelGLB,
    function (gltf) {
      model = gltf.scene;
      // 设置模型的位置
      model.position.set(XYZ[0], XYZ[1], XYZ[2]); // 你可以根据需要调整 x, y, z 坐标
      // 将模型添加到场景中
      scene.add(model);

      model.traverse(function (object) {
        if (object.isMesh) object.castShadow = true;
      });

      if (onModelLoaded) {
        onModelLoaded(model,gltf);
      }
    },
    undefined,
    function (error) {
      console.error("Error loading model:", error);
    }
  );
}

export default addThreeGLTFLoader;