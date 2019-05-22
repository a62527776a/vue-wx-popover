import wxPopover from './wx-popover.vue'
import CreateAPI from 'vue-create-api'

interface Binding {
  value: Function
  expression: string
}

interface TargetEl extends HTMLElement {
  __clickOutside__: EventListenerOrEventListenerObject
}

// 验证是否为dom节点
let validate = (binding: Binding): Boolean => {
  if (typeof binding.value !== 'function') {
    console.warn('[Vue-WxPopover:] provided expression', binding.expression, 'is not a function.')
    return false
  }
  return true
}

// 事件绑定
let bindEvent = (el: TargetEl, binding: Binding): void => {
  if (!validate(binding)) return
  // 监听事件
  const triggerEvent = (e: Event): void => {
    if (e.target) {
      if (el.contains(e.target as HTMLElement)) {
        return
      }
      binding.value()
    }
  }
  el.__clickOutside__ = triggerEvent
  document.body.addEventListener('touchstart', el.__clickOutside__, true)
  document.body.addEventListener('click', el.__clickOutside__, true)
}

// 事件解绑
let unBindEvent = (el: TargetEl): void => {
  document.body.removeEventListener('touchstart', el.__clickOutside__, true)
  document.body.removeEventListener('click', el.__clickOutside__, true)
}

// 将传入的options合并到组件props中
let mergeOptions = (Options, Component) => {
  let _opt = {}
  Object.keys(Options).map(key => {
    _opt[key] = { default: Options[key] }
  })
  Component.props = Object.assign(Component.props, _opt)
  return Component
}

const install = (Vue, options) => {
  Vue.use(CreateAPI)
  Vue.directive('click-outside', {
    bind: bindEvent,
    unbind: unBindEvent
  })
  Vue.createAPI((() => {
    if (options) return mergeOptions(options, wxPopover)
    return wxPopover
  })(), true)
}

if (typeof window !== 'undefined' && window.Vue) install(window.Vue)

export default {
  install
}