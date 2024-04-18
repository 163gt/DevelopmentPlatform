import { toolbarWidth } from '../graph/GraphWandH';
import { stencilNodeOptions } from './config';
import { Stencil } from '@antv/x6-plugin-stencil'

/**
 * 创建模板工具
 * @param graph 画布
 * @returns
 */
export function createStencilTool(nodeOptions, graph) {
    // 阶段节点
    let groups = stencilNodeOptions.map((e) => e.group)
    const stencil = new Stencil({
        placeholder: '请输入节点名称',
        title: '选择流程图形状',
        target: graph,
        stencilGraphWidth: toolbarWidth,
        collapsable: false,
        groups
    })
    // 流程节点
    //   const FlowOptions = nodeOptions.filter(item => item.shape === 'CustomFlowReact' || item.shape === 'CustomPolygon');
      const FlowNodes = nodeOptions.map((item)=>
        graph.createNode({
            shape:item.shape,
        })
      )
    stencil.load(FlowNodes, 'basic');
    return stencil
}


