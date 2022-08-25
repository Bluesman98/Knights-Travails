class Node {
  constructor(data = null, ancestor = null, links = []) {
    this.data = data;
    this.links = links;
    this.ancestor = ancestor;
  }
}

class Gameboard {
  constructor() {
    this.knight = new Node([3, 3]);
    this.board = [
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
    ];
  }

  possibleMoves(node, key = [-1, -1], board) {
    let y = node.data[0];
    let x = node.data[1];
    let links = [];
    let moves = [
      [y + 2, x - 1],
      [y + 2, x + 1],
      [y + 1, x - 2],
      [y + 1, x + 2],
      [y - 1, x - 2],
      [y - 1, x + 2],
      [y - 2, x - 1],
      [y - 2, x + 1],
    ];
    for (let item in moves) {
      let y = moves[item][0];
      let x = moves[item][1];
      if (y === key[0] && x === key[1]) {
        links.push(new Node(moves[item], node));
        node.links = links;
        return 1;
      }
      if (y >= 0 && x >= 0 && y <= 7 && x <= 7) {
        if (board[7 - y][x] == 0) {
          links.push(new Node(moves[item], node));
        }
      }
    }
    node.links = links;
    return 0;
  }

  levelOrder(root = this.root, key, board = this.board) {
    let stack = [root];
    let data_array = [];
    while (stack.length) {
      let y = 7 - stack[0].data[0];
      let x = stack[0].data[1];
      if (stack[0] != null) {
        if (board[y][x] == 0) {
          board[y][x] = 1;
          if (stack[0].data[1] == key[1] && stack[0].data[0] == key[0])
            return stack[0];
          this.possibleMoves(stack[0], key, board);
          data_array.push(stack[0].data);
          for (let item in stack[0].links) {
            stack.push(stack[0].links[item]);
          }
        }
        stack.shift();
      }
    }
    return data_array;
  }

  knightMoves(start, key) {
    this.knight.data = start;
    let key_node = this.levelOrder(this.knight, key);
    return this.path(key_node);
  }

  find(data, node = this.root) {
    if (node != null) {
      if (data[0] === node.data[0] && data[1] == node.data[1]) {
        return node;
      }
      for (let item in node.links) {
        let x = this.find(data, node.links[item]);
        if (x != undefined) return x;
      }
    } else return null;
  }

  path(node) {
    let path = [];
    while (node != null) {
      path.push(node.data);
      node = node.ancestor;
    }
    return path.reverse();
  }

  printLinks(node) {
    if (!node.links.length) {
      console.log(null);
      return 0;
    }
    for (let item in node.links) {
      console.log(node.links[item].data);
    }
  }
}
