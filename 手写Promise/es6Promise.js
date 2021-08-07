module.exports = class MyPromise {
  // 构造方法
  constructor(executor) {
    // 添加属性
    this.PromiseState = 'pending';
    this.PromiseResult = null;
    // 回调
    this.callback = [];

    // resolve
    const resolve = (data) => {
      // 判断状态
      if (this.PromiseState !== 'pending') return;
      // 1. 修改对象的状态
      this.PromiseState = 'fulfilled';  // resolved
      // 2. 设置对象结果值
      this.PromiseResult = data;
      // 执行回调
      setTimeout(() => {
        for (let i = 0; i < this.callback.length; i++) {
          this.callback[i].onResolved(data);
        }
      });
    }
    // reject
    const reject = (data) => {
      // 判断状态
      if (this.PromiseState !== 'pending') return;
      // 1. 修改对象的状态
      this.PromiseState = 'rejected';  // resolved
      // 2. 设置对象结果值
      this.PromiseResult = data;
      // 执行回调
      setTimeout(() => {
        for (let i = 0; i < this.callback.length; i++) {
          this.callback[i].onRejected(data);
        }
      });
    }

    try {
      // 同步调用 执行器函数
      executor(resolve, reject);
    } catch (error) {
      reject(error)
    }
  }
  // then 方法
  then(onResolved, onRejected) {
    if (typeof onResolved !== 'function') {
      onResolved = value => value;
    }
    if (typeof onRejected !== 'function') {
      onRejected = reason => {
        throw reason;
      }
    }
    return new MyPromise((resolve, reject) => {
      // 封装函数
      const callback = (type) => {
        try {
          // 获取回调函数的执行结果
          let result = type(this.PromiseResult);
          // 判断
          if (result instanceof MyPromise) {
            // 如果是自定义Promise类型对象
            result.then(v => {
              resolve(v);
            }, r => {
              reject(r)
            })
          } else {
            // 返回结果非 Promise对象 状态都为成功
            resolve(result);
          }
        } catch (error) {
          // 结果状态为 rejected
          reject(error)
        }

      }
      // 判断结果 调用回调
      if (this.PromiseState === 'fulfilled') {
        setTimeout(() => {
          callback(onResolved);
        });
      } else if (this.PromiseState === 'rejected') {
        setTimeout(() => {
          callback(onRejected);
        });
      } else {
        this.callback.push({
          onResolved: () => {
            callback(onResolved);
          },
          onRejected: () => {
            callback(onRejected);
          }
        })
      }
    })
  }
  // catch 方法
  catch(onRejected) {
    return this.then(undefined, onRejected);
  }
  // resolve 方法
  static resolve(value) {
    // 返回 Promise对象
    return new MyPromise((resolve, reject) => {
      if (value instanceof MyPromise) {
        value.then(v => {
          resolve(v);
        }, r => {
          reject(r);
        })
      } else {
        // 状态为成功
        resolve(value)
      }
    })
  }
  // reject 方法
  static reject(reason) {
    return new MyPromise((resolve, reject) => {
      reject(reason)
    })
  }
  // all 方法
  static all(promises) {
    // 返回结果为Promise 对象
    return new MyPromise((resolve, reject) => {
      // 声明变量
      let count = 0;
      // 存放成功后的结果
      let arr = [];
      // 遍历
      for (let i = 0; i < promises.length; i++) {
        promises[i].then(v => {
          count++;
          // 保证结果顺序
          arr[i] = v;
          // 每个promise对象都成功, 返回promise状态为成功
          if (count === promises.length) {
            // 修改状态
            resolve(arr);
          }
        }, r => {
          reject(r)
        })
      }
    })
  }
  // race 方法
  static race(promises) {
    return new MyPromise((resolve, reject) => {
      for (let i = 0; i < promises.length; i++) {
        promises[i].then(v => {
          resolve(v);
        }, r => {
          reject(r);
        })

      }
    })
  }
}