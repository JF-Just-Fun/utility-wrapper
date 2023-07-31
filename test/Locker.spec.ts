import { throttle, debounce } from '../src/Locker'; // 根据实际路径进行修改
jest.useFakeTimers();

describe('debounce', () => {
  it('should invoke function after wait time', () => {
    const func = jest.fn();
    const debouncedFunc = debounce(func, 1000);

    debouncedFunc();

    // 在这个时间点，我们的函数还没有被调用
    expect(func).not.toBeCalled();

    // 快进时间使得所有定时器回调都被执行
    jest.runAllTimers();

    // 现在函数已经被调用了
    expect(func).toBeCalled();
    expect(func).toHaveBeenCalledTimes(1);
  });

  it('execute function only once within wait time', () => {
    const func = jest.fn();
    const debouncedFunc = debounce(func, 1000);

    debouncedFunc();
    debouncedFunc();

    // 快进时间使得所有定时器回调都被执行
    jest.runAllTimers();

    expect(func).toBeCalled();
    expect(func).toHaveBeenCalledTimes(1);
  });

  it('only after function has been executed can it be executed again', () => {
    const func = jest.fn();
    const debouncedFunc = debounce(func, 1000);

    debouncedFunc();
    jest.runAllTimers();

    expect(func).toBeCalled();
    expect(func).toHaveBeenCalledTimes(1);

    debouncedFunc();
    jest.runAllTimers();

    expect(func).toBeCalled();
    expect(func).toHaveBeenCalledTimes(2);
  });

});

describe('throttle', () => {
  it('should not invoke function during the throttling duration', () => {
    const func = jest.fn();
    const throttledFunc = throttle(func, 1000);

    throttledFunc();
    throttledFunc();

    // 在这个时间点，函数只应该被调用一次
    expect(func).toBeCalledTimes(1);

    jest.runOnlyPendingTimers();

    throttledFunc();
    // 这个时间点，可以再次被调用
    expect(func).toBeCalledTimes(2);
  });
});
