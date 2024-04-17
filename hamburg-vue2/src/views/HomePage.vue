<template>
  <div class="home">
    <div :class="['left_tool_box']">
      <div id="GraphTool" style="width: 300px;"></div>
    </div>
    <div>
      <div id="Antvx6Graph"></div>
    </div>
  </div>
</template>
<script>
import {FlowGraph} from './graph/Graph';
import { graphWidth, graphHeight } from "./graph/GraphWandH";
import {createStencilTool } from './tools/createStencilTool';

export default {
  name: "HomePage",
  data() {
    return {
      title: "",
      flowChartOptions: [
        {
          label: "标准流程一",
          shape: "CustomFlowReact",
        },
        {
          label: "标准流程二",
          shape: "CustomFlowReact",
        },
        {
          label: "判断",
          shape: "CustomFlowReact",
        },
      ],
      data: {
        nodes: [
          {
            id: "node1", // String，可选，节点的唯一标识
            x: 40, // Number，必选，节点位置的 x 值
            y: 40, // Number，必选，节点位置的 y 值
            width: 80, // Number，可选，节点大小的 width 值
            height: 40, // Number，可选，节点大小的 height 值
            label: "hello", // String，节点标签
          },
          {
            id: "node2", // String，节点的唯一标识
            x: 160, // Number，必选，节点位置的 x 值
            y: 180, // Number，必选，节点位置的 y 值
            width: 80, // Number，可选，节点大小的 width 值
            height: 40, // Number，可选，节点大小的 height 值
            label: "world", // String，节点标签
          },
        ],
        // 边
        edges: [
          {
            source: "node1", // String，必须，起始节点 id
            target: "node2", // String，必须，目标节点 id
          },
        ],
      },
    };
  },
  mounted() {
    const graph = FlowGraph.init({
      container: document.getElementById("Antvx6Graph"), 
      width: graphWidth,
      height: graphHeight,
      embedding: {
        enabled: true,
      },
    });
    graph.on('blank:click', () => {
      graph.getNodes().forEach(item => {
        item.removeTools();
      })
      this.graphType = 'grid';
    })
    graph.on('cell:click', ({cell}) => {
      this.graphType = cell.isNode() ? 'node' : 'edge';
      this.graphId = cell.id;
      this.graphType === 'edge' ? this.edgeFunc() : this.nodeFunc();
      if(cell.shape == 'CustomDashedBox'){
        this.groupNode = FlowGraph.graph.getCellById(cell.id);
        this.groupNode.toBack({ deep: true });
      }
    });
    graph.on("node:added", ({node}) => {
      if (node.shape === "CustomStageReact") {
        this.$set(this.stageOptions, node.id, {label: node.attr("label/text"), value: node.id});
      } else if (node.shape === "CustomFlowReact") {
        this.$set(this.flowOptions, node.id, {label: node.attr("label/text"), value: node.id});
      }
    });
    graph.on("node:removed", ({node}) => {
      if (node.shape === "CustomStageReact") {
        this.$delete(this.stageOptions, node.id);
      } else if (node.shape === "CustomFlowReact") {
        this.$delete(this.flowOptions, node.id);
        this.graphType = 'grid';
      }
    });
    this.setgraph();
    this.tools();
  },
  methods: {
    setgraph() {
      FlowGraph.graph.fromJSON(this.data);
      FlowGraph.graph.positionContent('center');
    },
    tools(){
      let stencil = null;
        this.flowChartOptions = [...this.flowChartOptions];
        stencil = createStencilTool(this.flowChartOptions, FlowGraph.graph);
        document.getElementById("GraphTool").appendChild(stencil.container);
    },
  },
};
</script>
<style lang="scss" scoped>
.home {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
  display: flex;
  .left_tool_box {
    height: calc(100%);
    position: absolute;
    left: 0;
    z-index: 100;
    transition: 0.4s;
    box-sizing: border-box;
    border-right: 1px solid #d9d9d9;
    background-color: #fff;
  }
}
</style>