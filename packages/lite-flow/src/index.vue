 <template>
    <div ref="container" style="width: 100%;height:100%"></div>
  </template>
  <script lang="ts" setup>
  import { onMounted, ref, watch } from 'vue';
  import LogicFlow from "@logicflow/core";
  import "@logicflow/core/lib/style/index.css";
  import '@logicflow/extension/lib/style/index.css';
  import Flow from './dnd-panel';
  import './dnd-panel/flow.css';
  import  {  LiteFlowHighLightType } from './types';
  import  { LiteFlowProps } from './types/props';
  import  { NodeStateEnum } from './types/enums';
  const container = ref<HTMLElement>();
  const props = defineProps(LiteFlowProps);
  LogicFlow.use(Flow, {
    ...props,
  });
const emits = defineEmits(['update:value', 'on-init', 'on-render', 'on-save'])
const lfInstance = ref();

/**
 * 设置高亮数据
 * @param data 
 */
 const setHighLight = (data: LiteFlowHighLightType) =>{
  if(!data) return;
  const lf = lfInstance.value;
  if(!lf) return;
  // 设置历史节点state属性为history
  if(Array.isArray(data.historyNodeNames) && data.historyNodeNames.length) {
    data.historyNodeNames.forEach((nodeId :any)=>{
      lf.getNodeModelById(nodeId)?.setProperties({
        state: NodeStateEnum.history,
      });
    })
  }
  // 设置历史边state属性为history
  if(Array.isArray(data.historyEdgeNames) &&data.historyEdgeNames.length) {
    data.historyEdgeNames.forEach((edgeId : any)=>{
      lf.getEdgeModelById(edgeId)?.setProperties({
      state: NodeStateEnum.history,
    });
    })
  }
  // 设置活跃节点state属性为active
  if(Array.isArray(data.activeNodeNames) && data.activeNodeNames.length) {
    data.activeNodeNames.forEach((nodeId : any) =>{
      lf.getNodeModelById(nodeId)?.setProperties({
        state: NodeStateEnum.active,
      });
    })
  }
}
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
  // 设置亮亮数据
  setHighLight(props.highLight)
  // emits render事件
  emits('on-render', lf)
}
const isHistoryChange = ref(false)
onMounted(()=>{
  if(!container.value) return;
  lfInstance.value = new LogicFlow({
    container: container.value,
    grid: true,
    isSilentMode: props.viewer
  });
  const lf = lfInstance.value;
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
  // 监听自定义的update:highlight事件
  eventCenter.on('update:highlight',(data: any) =>{
    setHighLight(data)
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
watch(()=>props.highLight, (newVal)=>{
  setHighLight(newVal)
}, {
  deep: true
})
  </script>