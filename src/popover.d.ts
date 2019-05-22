// 自定义 d.ts 扩展通过api创建的方法
import Vue, { VueConstructor } from 'vue'
import { createFunction } from 'vue-create-api';

export declare class UIComponent extends Vue {
  show ():void
  hide ():void
}

declare module 'vue/types/vue' {
  interface Vue {
    /** create Dialog instance */
    $createWXPopover: createFunction<UIComponent>
  }
}