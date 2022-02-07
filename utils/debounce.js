// immediate 是否立即执行，默认为 false
export default function debounce(fn, delay, immediate = false) {
  let timer = null
  // 在动态控制状态的时候，尽量不要去改变用户传进来的数据，尽量使用函数内部的变量
  // 用于动态的控制什么时候要立即执行
  let isInvoke = false

  let _debounce = function (...args) {
    if (timer) clearTimeout(timer)

    // 当用户传入的 immediate 为 true 时立即执行 fn
    if (immediate && !isInvoke) {
      fn.apply(this, args)
      // 在立即执行之后，就不让下一次输入立即执行
      isInvoke = true
    } else {
      // 在立即执行之后，开始防抖工作
      timer = setTimeout(() => {
        fn.apply(this, args)
        // 在 delay 过后发送了一次网络请求之后，下一次输入的第一个字符再一次立即执行
        isInvoke = false
      }, delay);
    }

  }

  _debounce.cancel = function () {
    if (timer) clearTimeout(timer)
    timer = null
  }

  return _debounce
}