<template>
    <div class="node-title" ref="iteratorNode">
      <span class="node-icon">
      <SvgIcon icon-class="iterator" />
      </span>
      <span class="node-name"><span></span></span>
  </div>
</template>

<script lang="ts" setup>
import variables from '../../../../assets/styles/variables.module.scss';
import { ref, onMounted} from 'vue';
import SvgIcon from '../../../../svg-icon/index.vue';
const props = defineProps({
properties: {
  type: Object,
  default: null,
},
});
let iteratorNode = ref(null);

onMounted(() => {
let borderColor = variables.dragNodeBorderColor;
iteratorNode.value.style.border = `1px solid ${borderColor}`; //stroke边框
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
</style>
