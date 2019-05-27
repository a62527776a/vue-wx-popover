import WXPopover from './wx-popover.vue'
import CreateAPI from 'vue-create-api'

export interface action {
  icon: string,
  text: string
}

export interface propsOpt {
  [actions: string]: Array<action>
}

export interface propsDefaultOpt {
  [actions: string]: {
    default: Array<action>
  }
}

// 将传入的options合并到组件props中
let mergeOptions = (propOptions: propsOpt, Component: any) => {
  let _opt: propsDefaultOpt = {}
  Object.keys(propOptions).map((key: string) => {
    _opt[key] = { default: propOptions[key] }
  })
  Component.options.props = Object.assign(Component.options.props, _opt)
  return Component
}

const install = (Vue: any, options: propsOpt) => {
  Vue.config.silent = true
  Vue.use(CreateAPI)
  Vue.createAPI((() => {
    if (options) return mergeOptions(options, WXPopover)
    return WXPopover
  })(), true)
}

export default {
  install
}
