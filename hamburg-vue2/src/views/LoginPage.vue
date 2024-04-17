
<template>
    <div>
      <!-- X6 图形容器 -->
      <div ref="container" style="width: 800px; height: 600px;"></div>
    </div>
  </template>
  
  <script>
  import { Graph } from '@antv/x6';
  
  export default {
    mounted() {
      // 创建 X6 图形实例
      const graph = new Graph({
        container: this.$refs.container,
        // 其他配置
      });
  
      // 创建节点
      const nodes = [
        { x: 100, y: 100 },
        { x: 200, y: 200 },
        { x: 300, y: 300 },
      ];
  
      nodes.forEach(node => {
        graph.addNode({
          x: node.x,
          y: node.y,
          width: 100,
          height: 40,
          shape: 'CustomFlowReact', // 使用自定义节点样式
          // 其他节点配置
        });
      });
    },
  };
  </script>
  