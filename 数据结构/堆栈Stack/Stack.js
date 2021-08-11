module.exports = class Stack {
  constructor(...items) {
    // 是否颠倒
    this.reverse = false;
    this.stack = [...items];
  }
  // 入栈
  push(...items) {
    return this.reverse
      ? this.stack.unshift(...items)
      : this.stack.push(...items);
  }
  // 出栈
  pop() {
    return this.reverse ? this.stack.shift() : this.stack.pop();
  }
  // 是否为空栈
  isEmpty() {
    return this.stack.length < 1;
  }
  // 栈长
  getLength() {
    return this.stack.length;
  }
}