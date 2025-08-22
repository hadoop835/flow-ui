<template>
    <div>
      <div class="top">
        <div>
          <el-button v-if="flowDetail.status != '2'" type="primary" :loading="saveLoading" @click="saveFunc"> 保存 </el-button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts"> 
  import { ref, onMounted, reactive } from 'vue';
  
  const props = defineProps({
    lf: Object,
    //标题
    title: {
      type: String,
      default: '',
    },
    //详情
    flowDetail: {
      type: Object,
      default: () => {
        return {};
      },
    },
  });
  
  let saveLoading = ref(false);
  let graphData = reactive({});
  let showViewJson = ref(false);
  let debugDisabled = ref(false);
  
  let logoClick = () => {
    window.location.href = 'https://github.com/xoobom/logicflow-vue3';
  };
  
  //保存
  const saveFunc = () => {
    graphData = props.lf.getGraphData();
    console.log("json",graphData)
  };
  
 
  
  onMounted(() => {
    if (!props.flowDetail.flowJson) {
        debugDisabled.value = true;
    }
  });
  </script>
  
  <style lang="scss" scoped>
  .top {
    display: flex;
    justify-content: space-between;
    margin-bottom: 5px;
  }
  .logo {
    width: 150px;
    height: 40px;
    padding: 5px 10px;
    background-color: var(--el-color-primary);
    border-radius: 6px;
    cursor: pointer;
  }
  </style>