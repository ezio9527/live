<script>
export default {
  name: 'MsgContent',
  functional: true,
  props: {
    dataParse: {
      type: Object,
      default: () => { }
    }
  },
  render (h, context) {
    const { dataParse } = context.props
    return dataParse
    //   // return h('div',
    //   //   [
    //   //     h('div', {
    //   //       class: {
    //   //         parseView: true
    //   //       },
    //   //       domProps: {
    //   //         innerHTML: newStr
    //   //       }
    //   //     }),
    //   //     h('router-link', {
    //   //       class: {
    //   //         routerBtn: true
    //   //       },
    //   //       props: {
    //   //         to: {
    //   //           path: Url,
    //   //           query: {
    //   //             id: id,
    //   //             recordid: recordID
    //   //           }
    //   //         }
    //   //       },
    //   //       attrs: {
    //   //         target: "_blank"
    //   //       },
    //   //       domProps: {
    //   //         innerHTML: `<span>${menuName}</span>`
    //   //       }
    //   //     })
    //   //   ]
    //   // )
  }
}
</script>
