import { createApp, h } from 'vue';
import end from './end.vue';
import { randomNumber } from '../../../../utils/index';

export default function registerConnect(lf) {
  lf.register('end', ({ HtmlNode, HtmlNodeModel }) => {
    class endNode extends HtmlNode {
      setHtml(rootEl) {
        const { model } = this.props;
        const el = document.createElement('div');
        rootEl.innerHTML = '';
        rootEl.appendChild(el);

        // Vue 3 使用 createApp 来创建应用实例
        const app = createApp({
          render: () =>
            h(end, {
              properties: model.properties,
            }),
        });

        // 挂载 Vue 应用到元素上
        app.mount(el);
      }
    }
    class endModel extends HtmlNodeModel {
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
            x: x - width / 2,
            y: y,
            id: `${id}_left`,
            type: 'left'
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
      }
    }
    return {
      view: endNode,
      model: endModel,
    };
  });
}