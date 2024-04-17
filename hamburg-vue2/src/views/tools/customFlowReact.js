import {ReactFlowWidth, ReactFlowHeight} from './size'
// import {ports} from '../options/ports'
import {Shape, Dom} from '@antv/x6'

/**流程节点 */
export const CustomFlowReact = Shape.Rect.define({
  shape: 'CustomFlowReact',
  width: ReactFlowWidth,
  height: ReactFlowHeight,
  attrs: {
    body: {
      strokeWidth: 1,
      stroke: "#00ABA0",
      fill: "#00ABA0",
      refWidth: '100%',
      refHeight: '100%',
    },
    plan: {
      text: "",
      fill: "#0DB0A5",
      fontFamily: "SimHei"
    },
    actual: {
      text: "",
      fill: "#E38546",
      fontFamily: "SimHei"
    },
    unit: {
      text: "",
      fill: "#E38546",
      fontFamily: "SimHei"
    },
    label: {
      fontSize: 14,
      fill: '#FFFFFF',
      // lineHeight: 'normal',
      refX: 0.5,
      refY: 0.5,
      textAnchor: "middle",
      textVerticalAnchor: "middle",
      fontFamily: "SimHei"
    },
    projectCount: {
      fill: "#fff",
      text: ''
    },
  },
  markup: [
    {
      tagName: 'rect',
      selector: 'body'
    },
    {
      tagName: "text",
      selector: "plan",
    },
    {
      tagName: "image",
      selector: "image",
    },
    {
      tagName: "text",
      selector: "actual",
    },
    {
      tagName: "text",
      selector: "unit",
    },
    {
      tagName: 'text',
      selector: 'label'
    },
    {
      tagName: "rect",
      selector: "projectCircle",
    },
    {
      tagName: "text",
      selector: "projectCount",
    },
  ],
  //连接桩配置
  // ports: ports
})
