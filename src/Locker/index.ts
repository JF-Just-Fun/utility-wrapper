export function debounce<F extends (...args: any[]) => any>(func: F, wait: number = 100): F {
  let timeoutID : ReturnType<typeof setTimeout> | null;

  // 使用箭头函数保留this的上下文
  return function(...args: Parameters<F>) {
      clearTimeout(timeoutID!);
      timeoutID = setTimeout(() => func.apply(func, args), wait);
  } as F
}

export function throttle<F extends (...args: any[]) => any>(func: F, limit: number = 100): F {
  let lastFunc : ReturnType<typeof setTimeout> | null;
  let lastRan : number | null;

  return function(...args: Parameters<F>) {
      if (!lastRan) {
          func.apply(func, args);
          lastRan = Date.now();
      } else {
          clearTimeout(lastFunc!);

          lastFunc = setTimeout(() => {
              if ((Date.now() - lastRan!) >= limit) {
                  func.apply(func, args);
                  lastRan = Date.now();
              }
          }, limit - (Date.now() - lastRan));
      }
  } as F
}
