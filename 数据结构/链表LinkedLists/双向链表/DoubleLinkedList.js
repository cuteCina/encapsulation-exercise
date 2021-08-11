class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
    this.prev = null;
  }
}

module.exports = class DoubleLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }
  // 依次添加数据
  push(...values) {
    for (let i = 0; i < values.length; i++) {
      // 创建节点
      const node = new Node(values[i]);
      // 特殊情况
      if (this.length === 0) {
        this.head = node;
        this.tail = node;
        this.length++;
        continue;
      }
      // 添加节点
      this.tail.next = node;
      node.prev = this.tail;
      this.tail = node;
      this.length++;
    }
  }
  // 删除尾部节点 并返回
  pop() {
    // 特殊情况
    if (this.length === 0) {
      return null;
    }
    let tail = this.tail;
    if (this.length === 1) {
      this.head = null;
      this.tail = null;
      this.length--;
      return tail.data;
    }
    let current = this.head;
    // 获取倒数第二个节点
    while (current) {
      if (current.next === tail) break;
      current = current.next;
    }
    // 删除操作
    current.next = null;
    this.tail = current;
    this.length--;
    return tail.data;
  }
  // 返回指定位置节点数据
  get(index) {
    // 越界
    if (index < 0 || index > this.length - 1) {
      return null;
    }
    // 特殊情况
    if (index === 0) {
      return this.head.data;
    }
    if (index === this.length - 1) {
      return this.tail.data;
    }
    let current = this.head.next;
    let i = 1;
    while (i < index) {
      current = current.next;
      i++;
    }
    return current.data;
  }
  // 返回索引
  indexOf(data) {
    let current = this.head;
    let i = 0;
    while (i < this.length) {
      if (current.data === data) {
        return i;
      }
      current = current.next;
      i++;
    }
    return -1;
  }
  // 插入数据
  insert(index, data) {
    // 越界
    if (index < 0 || index > this.length) {
      return false;
    }
    const node = new Node(data);
    // 特殊情况
    if (index === 0) {  // 头节点
      node.next = this.head;
      this.head.prev = node;
      this.head = node;
    } else if (index === this.length) { // 尾结点
      node.prev = this.tail;
      this.tail.next = node;
      this.tail = node;
    } else {
      // 获取插入节点前后的节点
      let current = this.head.next;
      let preCurrent = this.head;
      let i = 1;
      while (i < index) {
        preCurrent = current;
        current = current.next;
        i++;
      }
      // 插入
      preCurrent.next = node;
      node.prev = preCurrent;
      node.next = current;
      current.prev = node;
    }
    this.length++;
    return true;
  }
  // 删除数据
  delete(index) {
    // 越界
    if (index < 0 || index > this.length - 1) {
      return null;
    }
    let current = this.head.next;
    let preCurrent = this.head;
    if (index === 0) {  // 删除头节点
      current.prev = null;
      this.head = current;
      preCurrent.next = null;
      this.length--;
      return preCurrent.data;
    }
    let i = 1;
    while (i < index) {
      preCurrent = current;
      current = current.next;
      i++;
    }
    if (index === this.length - 1) {  // 删除尾结点
      preCurrent.next = null;
      this.tail = preCurrent;
      current.prev = null;
    } else {
      preCurrent.next = current.next;
      current.next.prev = preCurrent;
      current.prev = null;
      current.next = null;
    }
    this.length--;
    return current.data;
  }
  // 翻转链表, 并返回
  reverse() {
    const list = [];
    const result = new DoubleLinkedList();
    let current = this.head;
    while (current) {
      list.push(current.data);
      current = current.next;
    }
    result.push(...list.reverse());
    return result;
  }
  // 是否为空
  isEmpty() {
    return this.length < 1;
  }
  // 打印
  print() {
    const list = [];
    let current = this.head;
    while (current) {
      list.push(current.data);
      current = current.next;
    }
    console.log(list.join('<->'));
  }
}