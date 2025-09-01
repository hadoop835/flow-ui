import { createApp, h } from 'vue';
import startNode from './start-node.vue';
import { randomNumber } from '../../../../utils/index';
import ElementPlus,{ElMessage} from 'element-plus'
import 'element-plus/dist/index.css'
export default function registerConnect(lf) {
  lf.register('startNode', ({ HtmlNode, HtmlNodeModel }) => {
    class startHtmlNode extends HtmlNode {
      setHtml(rootEl) {
        const { model } = this.props;
        const el = document.createElement('div');
        rootEl.innerHTML = '';
        rootEl.appendChild(el);

        // Vue 3 使用 createApp 来创建应用实例
        const app = createApp({
          render: () =>
            h(startNode, {
              properties: model.properties,
            }),
        });

        // 挂载 Vue 应用到元素上
        app.mount(el);
      }
    }
    class startHtmlModel extends HtmlNodeModel {
      createId() {
        return randomNumber();
      }
      constructor(data, graphModel) {
        super(data, graphModel);
        this.menu = [];
      }
      getDefaultAnchor() {
        const { id, x, y, width, height } = this;
        const anchors = [];
        anchors.push({
            x: x + width / 2,
            y: y,
            id: `${id}_right`,
            type: 'right'
        });
        return anchors;
      }
      initNodeData(data) {
        super.initNodeData(data);
        const width = 168;
        const height = 50;
        this.width = width;
        this.height = height;
        this.radius = 50;
        this.targetRules = [
          {
            message: '【开始节点】不允许连接输入',
            validate: (sourceNode, targetNode, sourceAnchor, targetAnchor) => {
              ElMessage.error('【开始节点】不允许连接输入'); 
              return false;
            },
          },
        ];
        this.sourceRules = [
           
        ];
      }
    }
    return {
      view: startHtmlNode,
      model: startHtmlModel,
    };
  });
}