<template>
    <a-scene>
      <a-box position="-1 1.5 -5" rotation="0 45 0" color="#4CC3D9" depth="1" height="1" width="1"></a-box>
      <a-sphere position="0 1.25 -5" radius="1.25" color="#EF2D5E"></a-sphere>
      <a-cylinder position="1 0.75 -5" radius="0.5" height="1.5" color="#FFC65D"></a-cylinder>
      <a-plane position="0 0 -4" rotation="-90 0 0" width="4" height="4" color="#7BC8A4"></a-plane>
      <a-sky color="#ECECEC"></a-sky>
    </a-scene>
  </template>
  
  <script>
  export default {
    name: 'AFrameScene'
  };
  </script>
  
  <style scoped>
  /* 你可以在这里添加一些样式 */
  </style>
  