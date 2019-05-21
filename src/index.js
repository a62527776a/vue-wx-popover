import wxPopover from './wx-popover.vue'
import CreateAPI from 'vue-create-api'

// 验证是否为dom节点
let validate = (binding) => {
  if (typeof binding.value !== 'function') {
    console.warn('[Vue-WxTip:] provided expression', binding.expression, 'is not a function.')
    return false
  }
  return true
}

// 事件绑定
let bindEvent = (el, binding) => {
  if (!validate(binding)) return
  // 监听事件
  const triggerEvent = (e) => {
    if (el.contains(e.target)) {
      return false
    }
    binding.value()
  }
  el.__clickOutside__ = triggerEvent
  document.body.addEventListener('touchstart', el.__clickOutside__, true)
  document.body.addEventListener('click', el.__clickOutside__, true)
}

// 事件解绑
let unBindEvent = (el) => {
  document.body.removeEventListener('touchstart', el.__clickOutside__, true)
  document.body.removeEventListener('click', el.__clickOutside__, true)
}

const install = (Vue, options) => {
  Vue.use(CreateAPI)
  Vue.directive('click-outside', {
    bind: bindEvent,
    unbind: unBindEvent
  })
  Vue.createAPI((() => {
    if (options) {
      let _opt = {}
      Object.keys(options).map(key => {
        _opt[key] = { default: options[key] }
      })
      wxPopover.props = Object.assign(wxPopover.props, _opt)
    }
    return wxPopover
  })(), true)
}

if (typeof window !== 'undefined' && window.Vue) install(window.Vue)

export default {
  install
}