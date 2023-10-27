
import { DirectiveBinding } from "vue"
const ob = new ResizeObserver((entries) => {
  console.log(entries)
})

export default {
  mounted(el:HTMLElement,binding: DirectiveBinding) {
    ob.observe(el)
    console.log('binding',binding)
  },
  unmounted(el:HTMLElement) {
   ob.unobserve(el)
  },
}