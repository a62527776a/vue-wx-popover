import Vue from 'vue'
import { mergeOptions } from '../../../src/index.ts'
import WXPopover from '../../../src/wx-popover.vue'

describe('mergeOptions', () => {
  let propOptions = {
    actions: [{
      icon: 'icon-text',
      text: 'text'
    }],
    offsetX: 18,
    showDelay: 200
  }
  it('props', () => {
    let mergeComponent = mergeOptions(propOptions, WXPopover)
    expect(mergeComponent.options.offsetX).toBe(18)
  })
})