class Node {
  constructor(data, left, right) {
    this.data = data;
    this.left = left;
    this.right = right;
  }
}

module.exports = class BinaryTree {
  constructor() {
    this.root = null;
    this.length = 0;
  }
  // 动态插入数据
  insert(...values) {
    for (let i = 0; i < values.length; i++) {
      // 创建节点
      let node = new Node(values[i], null, null);
      // 如果插入的为空树, 直接放在根节点
      if (!this.root) {
        this.root = node;
        this.length++;
        continue;
        // return;
      }
      // 获取根节点
      let current = this.root;
      let parent = null;
      while (current) {
        parent = current;
        if (values[i] < parent.data) {   // 如果插入的数据小于比较节点数据
          current = current.left;   // 获取其左子树
          if (!current) {   // 若其左子树为空, 将新建节点插入
            parent.left = node;
            this.length++;
            // return;
          }
        } else {    // 如果插入的数据大于等于比较节点数据
          current = current.right;    // 获取其右子树
          if (!current) {   // 若其右子树为空, 将新建节点插入
            parent.right = node;
            this.length++;
            // return;
          }
        }
      }
    }
  }
  // 前序遍历
  preOrder(node) {
    // if (node) {
    //   node.show();
    //   this.preOrder(node.left);
    //   this.preOrder(node.right);
    // }

    // 非递归实现
    let current = node;
    let parents = [];
    let res = [];
    while (current || parents.length > 0) {
      while (current) {
        parents.push(current);
        res.push(current.data)
        current = current.left;
      }
      current = parents.pop();
      current = current.right;
    }
    console.log(res);
    return res;
  }
  // 中序遍历
  middleOrder(node) {
    // if (node) {
    //   this.middleOrder(node.left);
    //   node.show();
    //   this.middleOrder(node.right);
    // }

    let current = node;
    let parents = [];
    let res = [];
    while (current || parents.length > 0) {
      while (current) {
        parents.push(current);
        current = current.left;
      }
      current = parents.pop();
      res.push(current.data);
      current = current.right;
    }
    console.log(res);
    return res;
  }
  // 后序遍历
  laterOrder(node) {
    // if (node) {
    //   this.laterOrder(node.left);
    //   this.laterOrder(node.right);
    //   node.show();
    // }

    let current = node;
    let parents = [];
    let res = [];
    let temp = null;  // 用来存放上一次访问的节点
    while (current || parents.length > 0) {
      while (current) {
        parents.push(current);
        current = current.left;
      }
      current = parents[parents.length - 1];
      if (!current.right || current.right === temp) { // 右子树不存在获这右子树等于上一次访问的节点
        current = parents.pop();
        res.push(current.data);
        temp = current;
        current = null;
      } else {
        current = current.right;
      }
    }
    console.log(res);
    return res;
  }
  // 获取最小值节点
  getMin() {
    // 获取根节点
    let current = this.root;
    while (current) {
      if (!current.left) {    // 若其左子树为空, 将其返回
        return current;
      }
      // 获取其左子树
      current = current.left;
    }
  }
  // 获取最大值节点
  getMax() {
    // 获取根节点
    let current = this.root;
    while (current) {
      if (!current.right) {   // 若其右子树为空, 将其返回
        return current;
      }
      // 获取其右子树
      current = current.right;
    }
  }
  // 获取深度(最大)
  getDepth(node, deep) {
    deep = deep || 0;   // 不传 默认为0
    if (!node) {  // 如果节点为空
      return deep;
    }
    deep++;   // 深度加 1
    // 递归调用 求左子树和右子树深度
    let dleft = this.getDepth(node.left, deep);
    let dright = this.getDepth(node.right, deep);
    // 返回最大深度
    return Math.max(dleft, dright);
  }
  // 获取最小深度
  getMinDepth(node, deep) {
    deep = deep || 0;
    if (!node) {
      return deep;
    }
    deep++;
    // 左子树为空 返回右子树的最小深度
    if (!node.left) {
      return this.getMinDepth(node.right, deep);
    }
    // 右子树为空 返回左字数最小深度
    if (!node.right) {
      return this.getMinDepth(node.left, deep);
    }
    // 左右子树都不为空, 返回最小深度
    return Math.min(this.getMinDepth(node.left, deep), this.getMinDepth(node.right, deep));
  }
  // 获取节点个数
  getNodeNum() {
    return this.length;
  }
  // 是否为空树
  isEmpty() {
    return this.length < 1;
  }
}
