<template lang="pug">
.wx-popover(:style="computedPosition" ref="wx-popover" v-click-outside="clickoutside")
  .wx-popover-wrapper(:style="computedWrapperPosition" ref="wx-popover-wrapper")
    .wx-popover-item(v-for="(action, idx) in actions" @click="$emit('select', idx + 1)")
      .iconfont(:class="action.icon")
      a {{action.text}}
</template>

<script>
export default {
  name: 'wx-popover',
  data () {
    return {
      x: 0,
      warpperX: 0,
      y: 0,
      width: 0,
      height: 36,
      translateX: '100%',
      showTipTimer: null,
      removeTimer: null
    }
  },
  props: {
    actions: {
      type: Array,
      default: () => {
        return ['']
      },
      required: true
    },
    dom: null,
    showDelay: {
      type: Number,
      default: 0
    },
    offsetX: {
      default: -12
    }
  },
  computed: {
    computedPosition: function () {
      return {
        left: this.x + 'px',
        top: this.y + 'px'
      }
    },
    computedWrapperPosition: function () {
      return {
        height: this.height + 'px',
        transform: `translateX(${this.translateX})`
      }
    }
  },
  methods: {
    showTip: function () {
      if (!this.isDOM(this.dom)) throw new Error('dom属性必须为DOM节点')
      if (this.showTipTimer) return
      this.showTipTimer = setTimeout(() => {
        let wxTipRect = this.$refs['wx-popover-wrapper'].getBoundingClientRect()
        let domRect = this.dom.getBoundingClientRect()
        let offsetHeight = (domRect.height - wxTipRect.height) / 2
        this.x = domRect.left - wxTipRect.width + this.offsetX
        this.warpperX = wxTipRect.width
        this.width = wxTipRect.width
        this.y = domRect.top + offsetHeight
        this.translateX = '0%'
        clearTimeout(this.showTipTimer)
      }, this.showDelay)
    },
    clickoutside: function () {
      this.translateX = '100%'
      if (this.removeTimer) return
      this.removeTimer = setTimeout(() => {
        this.remove()
        clearTimeout(this.removeTimer)
      }, 300)
    },
    isDOM: function (target) {
      if (typeof HTMLElement === 'object') {
        return target instanceof HTMLElement
      } else {
        return target && typeof target === 'object' && target.nodeType === 1 && typeof target.nodeName === 'string';
      }
    }
  },
  mounted () {
    this.showTip()
    console.log(this)
  }
}
</script>

<style lang="sass" scoped>
.wx-popover
  position: fixed;
  color: white;
  border-radius: 6px
  overflow: hidden;
  align-items: center
  display: flex;
  .wx-popover-wrapper
    background: #4D5154;
    display: flex;
    transition: transform .1s
    border-radius: 6px
    align-items: center
    padding: 0 6px
    font-size: 12px
  .wx-popover-item
    padding: 0 12px
    display: flex;
    flex-direction: row
    align-items: center;
    .iconfont
      margin-right: 4px
      font-size: 12px
    a
      color: white;
</style>
