//创建图片懒加载
/**
 *
 * @param {*} imageRef 被观察元素ref
 * @param {*} address 需要修改的内容
 * @param {*} value 需要修改的值 离开后默认修改为 ''
 * @param {*} nullVlue 指定被清除的值
 *
 */
export function imageIntersectionObserver(imageRef, address, value, nullVlue) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          address.value = value;
          //   observer.unobserve(entry.target); // 停止观察（如果只想触发一次）
        } else {
          if (nullVlue) {
            address.value = nullVlue;
          } else {
            address.value = "";
          }
        }
      });
    },
    {
      root: null, // 视口（null 表示使用默认视口）
      rootMargin: "55px", // 触发边距
      threshold: 0, // 触发阈值（0.1 表示 10% 可见时触发）
    }
  );
  if (imageRef) {
    observer.observe(imageRef);
  }
}

//防抖
/**
 * 
 * @param {*} func 触发内容
 * @param {*} delay 触发间隔
 * @returns 
 */
export function debounce(func, delay) {
  let timer;
  return function () {
    const context = this;
    const args = arguments;
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(context, args);
    }, delay);
  };
}
