module.exports = class Queue {
  constructor(...item) {
    // 是否颠倒
    this.reverse = false;
    this.queue = [...item];
  }
  // 入队
  enqueue(...item) {
    return this.reverse ? this.queue.push(...item) : this.queue.unshift(...item);
  }
  // 出队
  dequeue() {
    return this.reverse ? this.queue.shift() : this.queue.pop();
  }
  // 是否为空队
  isEmpty() {
    return this.queue.length < 1;
  }
  // 返回队长
  getLength() {
    return this.queue.length;
  }
}