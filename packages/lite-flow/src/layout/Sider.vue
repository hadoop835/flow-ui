<template>
<el-collapse  v-model="activeNames" expand-icon-position="left" size="">
      <el-collapse-item v-for="group in groupMap" :name="group.value" :title="group.text">
        <el-space wrap direction="vertical" style="width: 100%;">
                <div class="node"  @selectstart.prevent  v-for="nodeType in group.nodes" :key="nodeType" @mousedown="mousedownFunc(nodeTypeDef[nodeType])" >
                    <div class="node-icon" :style="{ 'background-color': nodeTypeDef[nodeType].color}">
                      <SvgIcon :icon-class="nodeTypeDef[nodeType].icon" />
                    </div>
                    <div class="node-title">{{ nodeTypeDef[nodeType].text}}</div>
                </div>
        </el-space>
      </el-collapse-item> 
    </el-collapse>
</template>


<script lang="ts" setup>
 import LogicFlow from "@logicflow/core"; 
import { ref,onMounted,reactive} from 'vue';
import { nodeTypeDef, groupMap } from '../types/nodes';
import SvgIcon from '../../../svg-icon/index.vue'; 
// 初始展开的面板
const activeNames = ref(['switch','gateway','activity','loop'])
 

const props = defineProps({
    lf: {
      type: LogicFlow,
    },
});

let dragRow = reactive({
    type: '',
});

const mousedownFunc = (data:any) => {
     dragRow = data
    props.lf.dnd.startDrag({
      type: data.type,
      text: data.text,
    }); 
};


onMounted(() => {
    props.lf.on('node:dnd-add', () => {
    if (dragRow.type == 'start') { 

    } else if (dragRow.type == 'assignment') {
    
    } else if (dragRow.type == 'decision') {
      
    } else if (dragRow.type == 'parallel') {
      
    } else if (dragRow.type == 'endParallel') {
      
    } else if (dragRow.type == 'machineLearning') {
      
    } else if (dragRow.type == 'deepLearning') {
       
    }
  });
});

</script>

<style scoped>
.node {
        width:160px;
        padding: 10px;
        border: 1px solid #ccc;
        cursor: move;
        border-radius: 5px;
        display: flex;
        align-items: center;
        background-color: #fff;

        &:hover {
                background-color: #deeff5;
                border-color: #0099ff;
            }

        .node-icon {
            margin-right: 10px;
            font-size: 14px;
            color: #FFF;
            border-radius: 5px;
            width: 20px;
            height: 20px;
            display: flex;
            align-items: center;
            justify-content: center;

            
        }

       .node-title {
            font-size: 14px;
            overflow: hidden;
            /** 不换行 自动省略 */
            white-space: nowrap;
            text-overflow: ellipsis;
            max-width: 100px;
        }
    }
</style>

