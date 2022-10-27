/*
 * @Author: liuzhihao
 * @email: liuzhihao@hatech.com.cn
 * @Date: 2022-09-01 11:48:47
 * @LastEditors: liuzhihao
 * @LastEditTime: 2022-09-05 17:21:37
 */
export default {
  name: 'LoopComponent',

  props: {
    treeData: {
      type: Array,
      default: () => {
        return []
      },
    },
  },
  methods: {
    loopH(h, treeData) {
      console.log(this.$slots)
      return h(
        'div',
        {
          attrs: {
            class: 'list-item',
          },
          style: {
            color: '#000',
          },
          props: {
            treeData: treeData,
          },
          scopedSlots: {
            default: (props) => h('span', props.text),
          },
          slot: 'test-slot',
        },
        [
          // h('span', this.$slots.default),
          // h(
          //   'div',
          //   this.$scopedSlots.content({
          //     title: '刘志豪',
          //   })
          // ),
          (() => {
            return treeData.map((v) => {
              return this.loopChildren(h, v)
            })
          })(),
        ]
      )
    },
    loopChildren(h, data) {
      return h(
        'div',
        {
          class: {
            tree: true,
            notree: true,
          },
          attrs: {
            class: 'item-name',
          },
        },
        [
          h('span', data.name),
          (() => {
            if (data.children && data.children.length) {
              return data.children.map((v) => {
                return this.loopChildren(h, v)
              })
            }
          })(),
        ]
      )
    },
  },
  render(h) {
    return this.loopH(h, this.treeData)
  },
}
