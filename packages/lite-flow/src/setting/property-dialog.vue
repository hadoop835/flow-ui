<template>
    <div>
      <el-drawer :wrapperClosable="false" v-model="showNodeAttribute" direction="rtl" size="550px" append-to-body :close-on-click-modal="false" @closed="closed">
        <template #header>
          <div class="unit">{{ getLabelByValue(nodeData.type, nodeTypeDef, 'type', 'text') }}</div>
        </template>
        <div style="padding: 15px 20px">
         <startProperty v-if="nodeData.type === 'start'" :title="title" :nodeData="nodeData" :lf="lf" :flowDetail="flowDetail" @closed="closed" />
         <endProperty v-if="nodeData.type === 'end'" :title="title" :nodeData="nodeData" :lf="lf" :flowDetail="flowDetail" @closed="closed" />
         <ifProperty v-if="nodeData.type === 'if'" :title="title" :nodeData="nodeData" :lf="lf" :flowDetail="flowDetail" @closed="closed" />
         <!-- 连线 -->
         <edgeProperty v-if="nodeData.type ==='polyline'" :title="title" :nodeData="nodeData" :lf="lf" :flowDetail="flowDetail" @closed="closed" />
        </div>
      </el-drawer>
    </div>
  </template>
  <script setup lang="ts">
  import { ref, onMounted} from 'vue';
  import { getLabelByValue } from '../../../utils/index'; 
  import ifProperty from '../nodes/if/if-property.vue';
  import startProperty from '../nodes/start/start-property.vue';
  import endProperty from '../nodes/end/end-property.vue';
  import edgeProperty from '../edges/edge-property.vue';
  import { nodeTypeDef} from '../types/nodes';
  let  options = ref()
  const props = defineProps({
    //标题
    title: {
      type: String,
      default: '',
    },
    nodeData: Object,
    lf: Object,
    //详情
    flowDetail: {
      type: Object,
      default: () => {
        return {};
      },
    },
  });
  const emit = defineEmits();
  
  let showNodeAttribute = ref(true);
  
  //弹窗关闭
  const closed = () => {
    emit('closed', true);
  };
  
  onMounted(() => {
    
  });
  </script>
  <style></style>