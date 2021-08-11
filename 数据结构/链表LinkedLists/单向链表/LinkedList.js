class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

module.exports = class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }
  // 向尾部追加节点
  push(...values) {
    for (let i = 0; i < values.length; i++) {
      const node = new Node(values[i]);
      // 如果是为空链表
      if (!this.head) {
        this.head = node;
        this.tail = node;
        this.length++;
        continue;
      }
      // 不为空 继续添加
      this.tail.next = node;
      this.tail = node;
      this.length++;
    }
  }
  // 删除尾部节点 并返回
  pop() {
    // 如果为空
    if (this.isEmpty()) {
      return null;
    }
    let tail = this.tail;
    let current = this.head;
    // 如果长度为1
    if (this.length === 1) {
      this.head = null;
      this.tail = null;
      this.length--;
      return tail.data;
    }
    // 长度大于 1
    while (current) {
      if (current.next === tail) {
        break;
      }
      current = current.next;
    }
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
    // 遍历获取
    let current = this.head;
    let i = 0;
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
    while (current) {
      if (current.data === data) {
        return i;
      }
      current = current.next;
      i++;
    }
    // 不存在返回 -1
    return -1;
  }
  // 插入数据
  insert(index, data) {
    // 越界
    if (index < 0 || index > this.length) {
      return false;
    }
    const node = new Node(data);
    let current = this.head;
    let preCurrent = null;
    // 特殊情况
    if (index === 0) {  // 插入头节点
      node.next = this.head;
      this.head = node;
      this.length++;
    } else if (index === this.length) {   // 插入尾结点
      this.tail.next = node;
      this.tail = node;
    } else {    // 正常情况
      let i = 0;
      while (i < index) {
        preCurrent = current;
        current = current.next;
        i++;
      }
      preCurrent.next = node;
      node.next = current;
    }
    this.length++;
    return true;
  }
  // 删除指定位置节点 并返回
  delete(index) {
    // 越界
    if (index < 0 || index > this.length - 1) {
      return null;
    }
    let current = this.head;
    // 特殊情况
    if (index === 0) {
      this.head = current.next;
      this.length--;
      current.next = null;
      return current.data;
    }
    let i = 0;
    let preCurrent = null;
    while (i < index) {
      preCurrent = current;
      current = current.next;
      i++;
    }
    // 如果为最后一个节点
    if (index === this.length - 1) {
      preCurrent.next = null;
      this.tail = preCurrent;
      this.length--;
    } else {
      preCurrent.next = current.next;
      current.next = null;
      this.length--;
    }
    return current.data;
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
    const res = list.join('->');
    console.log(res);
  }
  // 翻转链表, 并返回
  reverse() {
    // 特殊情况
    if (this.length ===0) {
      return null;
    }
    if (this.length === 1) {
      return this;
    }
    // 获取数据
    const list = [];
    const result = new LinkedList();
    let current = this.head;
    while (current) {
      list.push(current.data);
      current = current.next;
    }
    // 倒序后加入新链表
    result.push(...list.reverse());
    return result;
  }

}
