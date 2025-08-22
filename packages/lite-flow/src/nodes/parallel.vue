<template>
      <div class="node" @dblclick="editNode">
        <div class="node-icon" :style="{'background-color':nodeInfo.color}">
          <font-awesome-icon :icon="nodeInfo.icon" />
        </div>
        <div class="node-tools">
            <el-space >
                <div class="wf-node-tool wf-node-tool-deleteNode" @click="deleteNode">
                    <font-awesome-icon icon="fa-solid fa-xmark" />
                </div>
            </el-space>
        </div>
    </div>
</template>

<script  lang="ts">
import { defineComponent } from 'vue'
import { EventType } from '@logicflow/core'
import { vueNodesMap } from '@logicflow/vue-node-registry'
import {nodeTypeDef} from '../types/nodes';
export default defineComponent({
  name: 'ParallelNode',
  inject: ['getNode', 'getGraph'],
  data() {
    return {
      nodeInfo: {
        id: null,
        "type": null,
        "text": null,
        "color": "#0820e2",
        "icon": "fa-solid fa-play",
      },
      node:Object,
      graph:Object
    }
  },
  mounted() {
     this.node = (this as any).getNode()
     this.graph = (this as any).getGraph()
     this.node.width=168
     this.node.height=55
    const nodeType= nodeTypeDef[this.node.type]; 
     this.nodeInfo={
        id: this.node.id,
        type: nodeType.type,
        text: nodeType.text,
        color: nodeType.color,
        icon: nodeType.icon,
   }
  },
  methods: {
    deleteNode() {
      console.log(">>>>>>>",this.graph)
   }
  }
})
</script>

<style scoped>
.node {
        width:140px;
        height: 30px;
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
    .node-tools{
    position: absolute;
    right: 10px;
    cursor: pointer;
    display: none;
}
.node:hover .node-tools{
    display: block;
}
.wf-node-tool {
    display: flex;
    width: 18px;
    height: 18px;
    color: white;
    border-radius: 50%;
    background-color: #1890ff;

    font-size: 12px;
    align-items: center;
    justify-content: center;
    -moz-box-shadow: 1px 1px 7px 1px rgba(181, 183, 199, 0.73);
    box-shadow: 1px 1px 7px 1px rgba(181, 183, 199, 0.73);
    
}

.wf-node-tool-addNode {
    right: 40px;
    background-color: #1890ff;
}

.wf-node-tool-deleteNode {
    right: 10px;
    background-color: #fa0d35;
}

.wf-node-tool-editNode {
    right: 70px;
    background-color: #05940d;
}
</style>
