import { Graph, Shape } from '@antv/x6';

export class FlowGraph {
    static graph
    static init(options) {
        const graph = createGraph(options)
        this.graph = graph
        return graph
    }
}
// 画布基础信息
const defaultOptions = {
    width: 800,
    height: 500,
    // grid: true,
    grid: {
        size: 10,
        visible: true
    },
    // 画布拖拽
    panning: {
        enabled: true
    },
    //画布混论缩放
    mousewheel: {
        enabled: true,
        zoomAtMousePosition: true,
        modifiers: 'ctrl',
        minScale: 0.5,
        maxScale: 3,
    },
    // 配置连线规则
    connecting: {
        router: 'manhattan',
        connector: 'rounded',
        anchor: 'center',
        connectionPoint: 'anchor',
        allowBlank: false,
        snap: {
            radius: 50,
        },
        createEdge() {
            return new Shape.Edge({
                attrs: {
                    line: {
                        stroke: '#00ABA0',
                        strokeWidth: 1,
                        targetMarker: {
                            name: 'classic',
                            width: 10,
                            height: 6
                        },
                    },
                },
                tools: {
                    name: 'button-remove',
                    args: { distance: -40 },
                },
                zIndex: 0,
            })
        },
        validateConnection({ targetMagnet }) {
            return !!targetMagnet
        },
    },
    highlighting: {
        magnetAdsorbed: {
            name: 'stroke',
            args: {
                padding: 4,
                attrs: {
                    strokeWidth: 4,
                    stroke: 'rgba(223,234,255)'
                },
            },
        },
    },
}
function createGraph(options) {
    const o = Object.assign({}, defaultOptions, options)
    const graph = new Graph(o)
    return graph
}