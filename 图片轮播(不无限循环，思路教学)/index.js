// 思路：按照最简单的轮播来
// 1、获取轮播的图片
const items = document.querySelectorAll(".swiperItem");
const len = items.length;
// 2、设置一个变量记录当前图片索引（表示当前显示的第几张）
let index = 2;
// 3、根据当前的索引设置布局（暂不写，整个轮播就是完成这个函数）--> 除了这个基本都是通用的
function layout() {
  // 第8步提出来的东西
  const offsetStep = 200;
  const scaleStep = 0.6;
  const opacityStep = 0.5;
  // 7、针对每个图片设置样式
  for (let i = 0; i < len; i++) {
    // 第8步提出来的东西
    const dis = Math.abs(i - index);
    // 获取符号
    const sign = Math.sign(i - index);
    const item = items[i];
    // 8、设置样式
    // transfrom
    // translateX
    let offsetX = (i - index) * offsetStep;
    if (i !== index) {
      offsetX = offsetX + 100 * sign;
    }
    // scale
    const scale = scaleStep ** dis;
    // rotateY
    const rotate = 45 * -sign;

    // opacity
    const opacity = opacityStep ** dis;

    // z-index
    const zIndex = len - dis;

    item.style.transform = `perspective(2000px) translateX(${offsetX}px) scale(${scale}) rotateY(${rotate}deg)`;
    item.style.zIndex = `${zIndex}`;
    item.style.opacity = `${opacity}`;
  }
}
// 开始时调用
layout();
// 4、获取两个按钮
const prev = document.querySelector(".prevBtn");
const next = document.querySelector(".nextBtn");
// 5、按钮添加事件
prev.onclick = () => {
  index--;
  if (index < 0) {
    index = 0;
  }
  layout();
};
next.onclick = () => {
  index++;
  if (index > len - 1) {
    index = len - 1;
  }
  layout();
};
// 6、添加点击轮播图事件
items.forEach((item, i) => {
  item.onclick = () => {
    index = i;
    layout;
  };
});
