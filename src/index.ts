import WXPopover from './wx-popover.vue'
import CreateAPI from 'vue-create-api'

export interface action {
  icon: string,
  text: string
}

export interface showDelayProps {
  default: Number
}

export interface actionsProps {
  default: Array<action>
}

export enum propsKey {
  actions,
  offsetX
}

export interface offsetXProps {
  default: Number
}

export interface propsOpt {
  actions: Array<action>,
  offsetX: Number,
  showDelay: Number,
  [key: string]: Array<action> | Number
}

export interface propsDefaultOpt {
  actions: actionsProps,
  offsetX: offsetXProps,
  showDelay: showDelayProps,
  [key: string]: actionsProps | offsetXProps | showDelayProps
}

// 将传入的options合并到组件props中
export let mergeOptions = (propOptions: propsOpt, Component: any) => {
  let _opt: propsDefaultOpt = {
    actions: {
      default: [{icon: '', text: ''}]
    },
    offsetX: {
      default: 0
    },
    showDelay: {
      default: 0
    }
  }
  Object.keys(propOptions).map((key: string) => {
    _opt[key].default = propOptions[key]
  })
  console.info(Component)
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
