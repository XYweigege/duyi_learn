const canvas = document.querySelector(".canvas");
// 需要频繁读取像素点就要加上 willReadFrequently
const ctx = canvas.getContext("2d", {
  willReadFrequently: true,
});

// 在canvas上画一个图片 --> 需要用live server打开，不然跨域
const img = new Image();
img.src = "./img/1.png";
img.onload = function () {
  // 设置canvas的宽度和高度
  canvas.width = img.width;
  canvas.height = img.height;
  // 在canvas上画图片
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
};

// 监听点击事件
canvas.addEventListener("click", function (e) {
  const x = e.offsetX;
  const y = e.offsetY;
  // 获取imgdata
  const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  // 获取图片点击地方的rgba值
  const clickColor = getRgba(x, y, imgData);
  const changeColor = [0, 255, 0, 255];
  // 辅助函数，改变点击位置的rgba值
  function _changeColor(x, y) {
    // 超过边界停止
    if (x < 0 || x >= canvas.width || y < 0 || y >= canvas.height) return;
    // 如果旁边的颜色相差太大停止
    const color = getRgba(x, y, imgData);
    if (diffColor(color, clickColor) > 100) return;
    // 如果旁边颜色已经是changeColor停止
    if (diffColor(color, changeColor) === 0) return;
    const index = point2Index(x, y);
    // 简写：从index开始，替换四个值
    imgData.data.set(changeColor, index);
    // 改变周围颜色
    _changeColor(x - 1, y);
    _changeColor(x + 1, y);
    _changeColor(x, y - 1);
    _changeColor(x, y + 1);
  }
  _changeColor(x, y);
  // 改变图片
  ctx.putImageData(imgData, 0, 0);
});

// 点击处的 x,y 和 imgdata 的 index 的对应关系
function point2Index(x, y) {
  return (x + y * canvas.width) * 4;
}

// 获取图片点击地方的rgba值
function getRgba(x, y, imgData) {
  const index = point2Index(x, y);
  return {
    r: imgData.data[index],
    g: imgData.data[index + 1],
    b: imgData.data[index + 2],
    a: imgData.data[index + 3],
  };
}

// 判断两个rgba颜色是否相同
function diffColor(rgba1, rgba2) {
  // 返回 > 0 表示不相同
  return (
    Math.abs(rgba1.r - rgba2.r) +
    Math.abs(rgba1.g - rgba2.g) +
    Math.abs(rgba1.b - rgba2.b) +
    Math.abs(rgba1.a - rgba2.a)
  );
}
