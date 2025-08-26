<template>
    <div class="node-title" ref="startNode">
      <span class="node-icon">
        <SvgIcon icon-class="start" />
      </span>
      <span class="node-name"><span></span></span>
    </div>
  </template>
  
  <script setup lang="ts">
 import variables from '../../../../assets/styles/variables.module.scss';
import { ref, onMounted} from 'vue';
import SvgIcon from '../../../../svg-icon/index.vue';
  const props = defineProps({
    properties: {
      type: Object,
      default: null,
    },
  });
  let startNode = ref(null);
  
  onMounted(() => {
    let borderColor = variables.dragNodeBorderColor;
    if (props.properties.frontend_status == '0') {
      borderColor = variables.dangerColor;
    }
    startNode.value.style.border = `1px solid ${borderColor}`; //stroke边框
  });
  </script>
  
  <style scoped lang="scss">
  .node-icon {
  font-size: 16px;
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

.node-name > span {
  border: none !important;
}
  .node-icon {
    color: #6bd452;
    font-size: 17px;
  }
  </style>