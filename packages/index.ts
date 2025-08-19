import type { App, Plugin } from 'vue'
import LogicFlowCo from '@logicflow/core'
import * as LogicFlowC from '@logicflow/core'
import * as LogicFlowExt from '@logicflow/extension'
import LiteFlow from './lite-flow/'
const ILiteFlow: any = LiteFlow 
ILiteFlow.install = function (app: App, options: any) {
  app.component('LiteFlow', ILiteFlow)
  if(options?.uiLibrary) {
    app.config.globalProperties.$uiLibrary= options.uiLibrary
  }
}


export default LiteFlow as typeof ILiteFlow &
  Plugin

export const LogicFlow = LogicFlowCo
export const LogicFlowCore = LogicFlowC;
export const LogicFlowExtension = LogicFlowExt