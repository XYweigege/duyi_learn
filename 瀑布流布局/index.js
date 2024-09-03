const container = document.querySelector(".container");
const imgWidth = 220;

// 1、创建图片元素
function createImg() {
  for (let i = 0; i <= 40; i++) {
    let src = "./imgs/" + i + ".jpg";
    let img = document.createElement("img");
    // 设置图片加载完后调用setPosition
    // 这样就可以保证图片加载完后设置位置
    img.onload = setPosition;
    img.src = src;
    container.appendChild(img);
  }
}
createImg();

// 2、设置图片位置
function setPosition() {
  let { columns, gap } = cal();
  const nextTops = new Array(columns).fill(0);
  for (let i = 0; i < container.children.length; i++) {
    let img = container.children[i];
    // 找到nextTops最小值的index计算top（一开始都是0）
    let minTop = Math.min(...nextTops);
    img.style.top = minTop + "px";
    // 重新设置这个index的下一个top
    let index = nextTops.indexOf(minTop);
    nextTops[index] += img.height + gap;
    // left
    img.style.left = index * imgWidth + (index + 1) * gap + "px";
  }
  // 求最大值，设置容器高度（因为子元素绝对定位了，不会撑大父元素）
  let maxTop = Math.max(...nextTops);
  container.style.height = maxTop + "px";
}

// 计算一共多少列，以及每一列的间隙
function cal() {
  let containerwidth = container.clientWidth;
  // 列数
  let columns = Math.floor(containerwidth / imgWidth);
  // 间隙数
  let spacenum = columns + 1;
  let space = containerwidth - imgWidth * columns;
  // 间隙大小
  let gap = space / spacenum;
  return {
    columns,
    gap,
  };
}

// 监听窗口尺寸变化调用setPosition，防抖
let timeId = null;
window.onresize = function () {
  if (timeId) {
    clearTimeout(timeId);
  }
  timeId = setTimeout(setPosition, 300);
};
