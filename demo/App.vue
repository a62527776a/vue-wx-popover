<template lang="pug">
  <div class="wrapper">
    ul.list-group
      li.list-group-item(v-for="(value, key, idx) in list")
        a.text-primary {{key}}:{{value}}
        button.pull-right.btn.btn-info.btn-xs(
          @click="e => handleTip(idx, e)"
        ) 菜单
    </ul>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      actions: [{
        icon: 'icon-zengjia',
        text: '分享'
      }, {
        icon: 'icon-xialajiantouxiao',
        text: '不感兴趣'
      }, {
        icon: 'icon-gengduo',
        text: '举报'
      }],
      list: {
        "babel": "^6.23.0",
        "babel-core": "^6.26.0",
        "babel-eslint": "^8.2.2",
        "babel-loader": "^7.1.3",
        "babel-plugin-istanbul": "^4.1.5",
        "babel-plugin-transform": "^6.22.0",
        "babel-plugin-transform": "^6.23.0",
        "babel-preset-env": "^1.6.1",
        "babel-preset-es2015": "^6.24.1",
        "babel-preset-stage-2": "^6.24.1",
        "css-loader": "^0.28.10",
        "eslint": "^4.18.1",
        "eslint-config-standard": "^11.0.0",
        "eslint-friendly-formatter": "^3.0.0",
        "eslint-loader": "^2.0.0",
        "eslint-plugin-html": "^4.0.2",
        "eslint-plugin-import": "^2.9.0",
        "eslint-plugin-node": "^6.0.1",
        "eslint-plugin-promise": "^3.6.0",
        "eslint-plugin-standard": "^3.0.1",
        "html-webpack-plugin": "^2.30.1",
        "jasmine-core": "^3.1.0",
        "karma": "^2.0.0",
        "karma-babel-preprocessor": "^7.0.0",
        "karma-coverage": "^1.1.1",
        "karma-jasmine": "^1.1.1",
        "karma-phantomjs-launcher": "^1.0.4",
        "karma-webpack": "^2.0.13",
        "less": "^2.7.3",
        "less-loader": "^4.0.5",
        "style-loader": "^0.20.2",
        "transform-runtime": "^0.0.0",
        "vue": "^2.5.13",
        "vue-loader": "^14.1.1",
        "vue-template-compiler": "^2.5.13",
        "vue-test-utils": "^1.0.0-beta.11",
        "webpack": "^3.10.0",
        "webpack-dev-server": "^2.11.1"
      }
    }
  },
  methods: {
    handleTip: function (idx, event) {
      let wxTip = this.$createWxPopover({
        $props: {
          actions: this.actions,
          dom: event.target
        }
      }).$on('select', e => {
          window.alert('点击下标' + e)
          wxTip.clickoutside()
        })
    },
  }
}
</script>

<style lang="sass">
body
  font-family: -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif
.wrapper
  padding: 12px
</style>
