 <template>
   <div class="editor">
    <div class="editor-header">
      <Header v-if="showLf"  :lf="lfInstance"></Header>
    </div>
    <div class="editor-content">
      <div class="editor-sider">
        <Sider v-if="showLf"  :lf="lfInstance"></Sider>
      </div>
      <!-- 工具栏 -->
      <Control v-if="showLf" class="editor-control" :lf="lfInstance"></Control>
      <div class="editor-canvas">
        <div ref="container" style="width: 100%;height:100%"></div>
      </div>
    </div>
  </div>
   <!-- 属性面板 -->
   <PropertyDialog v-if="showAttribute" :title="title" :nodeData="nodeData" :flowDetail="flowDetail" :lf="lfInstance"  @closed="showAttribute = false"> </PropertyDialog>
  </template>
  <script lang="ts" setup>
  import { onMounted, ref, watch,reactive } from 'vue';
  import LogicFlow,{NodeData}from "@logicflow/core"; 
  import { Menu, Snapshot, MiniMap } from '@logicflow/extension';
  import "@logicflow/core/lib/style/index.css";  
  import '@logicflow/extension/lib/style/index.css'; 
  import Sider from './layout/Sider.vue' 
  import Control from './layout/Control.vue'
  import Header from './layout/Header.vue' 
  import commonNode from './nodes/common/common'
  import ifNode  from './nodes/if/if'
  import switchNode from './nodes/switch/switch'
  import forNode  from  './nodes/for/for'
  import iteratorNode from './nodes/iterator/iterator'
  import startNode from './nodes/start/start'
  import endNode from './nodes/end/end'
  import whenNode from './nodes/when/when'
  import summaryNode from './nodes/summary/summary'
  import  { LiteFlowProps } from './types/props'; 
  import PropertyDialog from './setting/property-dialog.vue';

  const container = ref<HTMLElement>();  
  const props = defineProps(LiteFlowProps);  
  const emits = defineEmits(['update:value', 'on-init', 'on-render', 'on-save'])
  let lfInstance = ref();
  let showLf = ref(false);

  //弹出框
  let nodeData = ref(null); 
  let showAttribute = ref(false);

const registerElements = (lf: LogicFlow) => {
    startNode(lf)
    endNode(lf)
    commonNode(lf)
    ifNode(lf)
    switchNode(lf)
    forNode(lf)
    iteratorNode(lf)
    whenNode(lf)
    summaryNode(lf)
}

const LfEvent = (lf: LogicFlow) => {
  lf.on('node:dbclick', ({ data }) => {
    nodeData.value = data;
    if (['start', 'end', 'for', 'iterator', 'common', 'if', 'switch','when','summary'].includes(data.type)) {
      showAttribute.value = true;
    }
  });
  lf.on('edge:dbclick', ({ data }) => {
     const  nodeConfig  = lf.getNodeDataById(data.sourceNodeId);
     if(nodeConfig?.type==="if"){
        showAttribute.value = true;
        data.properties={
             "if":true
        }
        nodeData.value = data;
     }else{
      showAttribute.value = false;
     }
    console.log("nodeConfig",data)
    
  });
  //来自边的事件中心发出的事件
  lf.on('edge:app-config', (data) => {
    nodeData.value = data;
    showAttribute.value = true;
  });
  lf.on('element:click', () => {
        
  });
  lf.on('blank:click', () => {
     
  });
  lf.on('connection:not-allowed', (data) => {
     
  });

  lf.on('edge:add', ({ data }) => {
    
  });

  lf.on('edge:delete', ({ data }) => {
     
  });
};


let customTheme = reactive({
  background: {
    backgroundColor: "#f0f4fb",
  },
  grid: {
    size: 10,
  },
  keyboard: {
    enabled: true,
  },
  adjustEdge: false, //允许调整边
  adjustEdgeStartAndEnd: false, //是否允许拖动边的端点来调整连线
  edgeSelectedOutline: true, //鼠标 hover 的时候显示边的外框
  // edgeTextDraggable: true,
  hoverOutline: false,
  nodeTextEdit: false, //节点是否可编辑。false不可编辑
  edgeTextEdit: false, //边是否可编辑。false不可编辑
  autoExpand: false, //点拖动靠近画布边缘时是否自动扩充画布
  textEdit: false, //是否开启文本编辑
  snapline: false, //对齐线。false不开启
});


/**
 * 自定义渲染
 * 1.默认渲染
 * 2.设置高亮属性
 * @param data 
 */
const myRender = (data: any) =>{
  const lf = lfInstance.value;
  if(!lf) return;
  lf.render(data);
  // emits render事件
  emits('on-render', lf)
}
 

const isHistoryChange = ref(false)

onMounted(()=>{
  if(!container.value) return;
  lfInstance.value = new LogicFlow({
    ...customTheme,
    container: container.value,
    plugins: [Menu, MiniMap, Snapshot],
  });
  const lf = lfInstance.value; 
  showLf.value =true
  registerElements(lf)
  LfEvent(lf)
 // 设置主题
 lf.setTheme({
    baseNode: {
      fill: '#FFFFFF',
      stroke: '#000000',
      strokeWidth: 1,
    },
    circle: {
      stroke: '#000000',
      strokeWidth: 1,
    },
    rect: {
      fill: '#FFFFFF',
      stroke: '#000000',
      outlineColor: '#88f',
      strokeWidth: 1,
    },
    polygon: {
      strokeWidth: 1,
    },
    polyline: {
      stroke: '#000000',
      hoverStroke: '#000000',
      selectedStroke: '#000000',
      strokeWidth: 1,
    },
    nodeText: {
      color: '#000000',
      overflowMode: 'ellipsis', //超出显示省略号
      padding: '0 15px',
      fontSize: 14,
    },
    edgeText: {
      color: '#000000',
      background: {
        fill: "#f0f4fb",
      },
    },
  });
  // emits初始化事件
  emits('on-init', lf)
  

  const { eventCenter } = lf.graphModel;
  // 监听画布变化事件
  eventCenter.on('history:change', ()=>{
    isHistoryChange.value = true
    emits('update:value', lf.getGraphData())
  })
  // 监听自定义的update:graphModel事件
  eventCenter.on('update:graphModel',()=>{
    isHistoryChange.value = true
    emits('update:value', lf.getGraphData())
  })
  // 监听自定义的update:graphData事件
  eventCenter.on('update:graphData',(data: any) =>{
    // emits('update:value', data)
    myRender(data)
  })
  // 监听自定义的save事件
  eventCenter.on('custom:save', (data: any) =>{
    emits('on-save', data)
  })
  myRender(props.value)
})
watch(()=>props.value, (newVal)=>{
  if(!isHistoryChange.value) {
    myRender(newVal);
  }
  isHistoryChange.value = false
}, {
  deep: true
})

const onStartDrag = ({e,nodeType})  => {
  console.log(nodeType)
  lfRef.value?.dnd.startDrag(nodeType);
  };
  </script>

<style scoped>

.editor {
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: #f0f0f0;

  .editor-header {
    height: 50px;
    background-color: #fff;
    border-bottom: 1px solid #ccc;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 20px
  }

  .editor-content {
    flex: 1;
    display: flex;
    overflow: hidden;
  }

 .editor-sider {
    width: 200px;
    background-color: #fff;
    border-right: 1px solid #ccc;
  }

.editor-control {
  position: absolute;
  top: 68px;
  right: 100px;
  z-index: 2;
}
  .editor-canvas {
    flex: 1;
    background-color: #fff;
  }
}

.lf-node-text-auto-wrap {
  cursor: pointer;
}

/* 适应节点图标 */
.lf-node-text-ellipsis-content {
  padding: 0 8px 0 34px !important;
}
.node-title {
  height: 40px;
  width: 100%;
  background: #fff;
  border: 1px solid #e6f7ff;
  box-sizing: border-box;
  padding: 10px 10px 10px 6px;
  border-radius: 8px;
  cursor: pointer;
}
.node-icon {
  width: 26px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
}
.node-name > span {
  border: none !important;
} 

.lf-mini-map {
  border-radius: 5;
  border: none !important;
  box-shadow: 3px 0 10px 1px rgb(228, 224, 219);
}

.lf-mini-map-header {
  border: none !important;
  font-size: 13px;
  height: 24px !important;
  line-height: 24px !important;
  background-color: #ecf5ff !important;
  background-image: none !important;
}

.lf-mini-map-close {
  top: 2px !important;
}

@keyframes lf_animate_dash {
  to {
    stroke-dashoffset: 0;
  }
}
</style>