<template lang="pug">
.wx-popover(:style="computedPosition" ref="wx-popover" v-click-outside="clickoutside")
  .wx-popover-wrapper(:style="computedWrapperPosition" ref="wx-popover-wrapper")
    .wx-popover-item(v-for="(action, idx) in actions" @click="$emit('select', idx + 1)")
      .iconfont(:class="action.icon")
      a {{action.text}}
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

interface rect {
  height: number
  width: number
  left: number
  top: number
}

interface popoverRect {
  x: number
  y: number,
  warpperX: number,
  translateX: string
}

interface popoverPosition {
  left: string
  top: string
}

interface popoverWrapperPosition {
  height: string
  transform: string
}

@Component
export default class WXPopover extends Vue {
  @Prop(Array) actions: Array<any>
  @Prop(Object) targetDom: Element
  @Prop({
    default: 0
  }) showDelay!: number
  @Prop({
    default: -12
  }) offsetX!: number

  x:number = 0
  warpperX:number = 0
  y:number = 0
  height:number = 36
  translateX:string = '100%'
  showTipTimer: number | null = null
  removeTimer: number | null = null
  remove: Function

  $refs: {
    'wx-popover-wrapper': Element
  }

  /**
   * @method computedRect 根据目标DOM节点位置信息以及popover的DOM节点信息 计算popover最终需要呈现的屏幕中位置
   * @return { popoverRect }
   */
  computedRect (targetDomRect: rect, popoverRect: rect): popoverRect {
    let offsetHeight = (targetDomRect.height - popoverRect.height) / 2
    return {
      x: targetDomRect.left - popoverRect.width + this.offsetX,
      y: targetDomRect.top + offsetHeight,
      warpperX: popoverRect.width,
      translateX: '0%'
    }
  }
  /**
   * @method showPopover showDelay ms之后展示Popover
   * @return { Promise<Boolean> }
   */
  showPopover (): Promise<Boolean> {
    return new Promise((resolve) => {
      if (this.showTipTimer) resolve(false)
      this.showTipTimer = window.setTimeout(() => {
        let popoverRect = this.$refs['wx-popover-wrapper'].getBoundingClientRect()
        let targetDomRect = this.targetDom.getBoundingClientRect()
        Object.assign(this, this.computedRect(targetDomRect, popoverRect))
        if (this.showTipTimer) clearTimeout(this.showTipTimer)
        resolve(true)
      }, this.showDelay)
    })
  }

  clickoutside (): void {
    this.translateX = '100%'
    if (this.removeTimer) return
    this.removeTimer = window.setTimeout(() => {
      this.remove()
      if (this.removeTimer) clearTimeout(this.removeTimer)
    }, 300)
  }

  get computedPosition (): popoverPosition {
    return {
      left: this.x + 'px',
      top: this.y + 'px'
    }
  }
  get computedWrapperPosition (): popoverWrapperPosition {
    return {
      height: this.height + 'px',
      transform: `translateX(${this.translateX})`
    }
  }

  mounted () {
    this.showPopover()
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
