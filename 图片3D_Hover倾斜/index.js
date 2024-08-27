const card = document.querySelector(".card");
const yRange = [-10, 10];

/**
 * @param {number} length 鼠标可移动的全长
 * @param {number} value 鼠标所在位置
 * @param {Array} range range取值范围
 * 通过 鼠标所在位置 比上 鼠标可移动的全长 === 返回值 比上 range取值范围
 * 为什么加range[0] 见 问题img
 */
function getRotateDeg(length, value, range) {
  return (value / length) * (range[1] - range[0]) + range[0];
}

card.addEventListener("mousemove", (e) => {
  const { offsetX, offsetY } = e;
  const { offsetWidth, offsetHeight } = card;
  // x 轴旋转靠的是 鼠标的y
  let rx = getRotateDeg(offsetWidth, offsetY, yRange);
  let ry = -getRotateDeg(offsetHeight, offsetX, yRange);
  card.style.setProperty("--rx", `${rx}deg`);
  card.style.setProperty("--ry", `${ry}deg`);
});

// 移出置为0
card.onmouseleave = (e) => {
  card.style.setProperty("--rx", "0deg");
  card.style.setProperty("--ry", "0deg");
};
