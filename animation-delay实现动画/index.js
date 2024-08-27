const range = document.querySelector(".range");
const aniBox = document.querySelector(".aniBox");

// 这样一开始没有跟随滑块！
// range.oninput = () => {
//   aniBox.style.setProperty("--delay", `-${range.value}s`);
// };

// 避免js进行复杂计算，不管实现什么延时实现动画，基本上都是这个js就行！
const calc = () => {
  aniBox.style.setProperty("--delay", `-${range.value}s`);
};
range.oninput = calc;
calc();
