import { createApp, h } from 'vue';
import commonNode from './common.vue';
import ElementPlus,{ElMessage} from 'element-plus'
import 'element-plus/dist/index.css'
import { randomNumber } from '../../../../utils/index';
export default function registerConnect(lf) {
    lf.register('common', ({ HtmlNode, HtmlNodeModel }) => {
      class htmlCommonNode extends HtmlNode {
        setHtml(rootEl) {
          const { model } = this.props;
          const el = document.createElement('div');
          rootEl.innerHTML = '';
          rootEl.appendChild(el);
  
          // Vue 3 使用 createApp 来创建应用实例
          const app = createApp({
            render: () =>
              h(commonNode, {
                properties: model.properties,
              }),
          });
          app.use(ElementPlus)
          // 挂载 Vue 应用到元素上
          app.mount(el);
        }
      }
      class htmlCommonModel extends HtmlNodeModel {
        createId() {
          return randomNumber(); //id用随机数数字
        }
        constructor(data, graphModel) {
          super(data, graphModel);
          this.menu = [
            {
              text: '删除',
              callback(node) {
                lf.deleteNode(node.id);
              },
            },
            {
              text: '复制',
              callback(node) {
                lf.cloneNode(node.id);
              },
            },
          ];
        }
        getDefaultAnchor() {
          const { id, x, y, width, height } = this;
          const anchors = [];
          anchors.push({
            x: x - width / 2,
            y,
            id: `${id}_incomming`,
            type: 'incomming',
          });
          anchors.push({
            x: x + width / 2,
            y,
            id: `${id}_outgoing`,
            type: 'outgoing',
          });
          return anchors;
        }
        initNodeData(data) {
          super.initNodeData(data);
          const width = 168;
          const height = 50;
          this.width = width;
          this.height = height;
          this.properties={
              "nodeType":"SUMMARY"
          }
          this.radius = 50;
          this.targetRules = [
            {
              message: `【普通节点】只允许一个输入`,
              validate: (sourceNode, targetNode, sourceAnchor, targetAnchor) => {
                const edges = this.graphModel.getNodeIncomingEdge(targetNode.id);
                if (edges.length >= 1) {
                  ElMessage.error('【普通节点】只允许一个输入')
                  return false;
                } else {
                  return true;
                }
              },
           },
          ];
          this.sourceRules = [
            {
              message: `【普通节点】只允许1个输出`,
              validate: (sourceNode, targetNode, sourceAnchor, targetAnchor) => {
                const edges = this.graphModel.getNodeOutgoingEdge(sourceNode.id);
                if (edges.length >= 1) {
                    ElMessage.error('【普通节点】只允许1个输出')
                    return false;
                 }else{
                    return true;
                 }
                 },
              },
          ];
        }
      }
      return {
        view: htmlCommonNode,
        model: htmlCommonModel,
      };
    });
  }

