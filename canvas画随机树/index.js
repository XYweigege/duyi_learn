const canvas = document.querySelector(".canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth * devicePixelRatio;
canvas.height = window.innerHeight * devicePixelRatio;

// 今后可以用这种方式重置坐标系！
// 对画布进行变形，让画布原点在底部中心位置
ctx.translate(canvas.width / 2, canvas.height);
// 此时的y轴指向下，反向一下
ctx.scale(1, -1);

// 画线段的函数，传入线段起始x坐标、起始y坐标、粗细、长度、角度转弧度
function drawLine(x, y, w, l, a) {
  // 通过粗细判断是否继续画
  if (w < 5 && Math.random() < 0.3) {
    return;
  }
  if (w < 2) {
    // 画一些白色圆圈
    // 开始一条新的路径
    ctx.beginPath();
    ctx.arc(x, y, Math.random() * 5, 0, Math.PI * 2);
    ctx.fillStyle = "#fff";
    ctx.fill();
    return;
  }
  // 开始一条新的路径
  ctx.beginPath();
  // 移动到起始点
  ctx.moveTo(x, y);
  // 连线（角度转弧度）
  let v1 = [
    x + l * Math.cos((a * Math.PI) / 180),
    y + l * Math.sin((a * Math.PI) / 180),
  ];
  ctx.lineTo(...v1);
  // 颜色
  ctx.strokeStyle = "#333";
  // 宽度
  ctx.lineWidth = w;
  // 设置线帽
  ctx.lineCap = "round";
  // 画线段
  ctx.stroke();
  // 左分支
  drawLine(...v1, w * 0.8, l * 0.8, a + Math.random() * 30);

  // 右分支
  drawLine(...v1, w * 0.8, l * 0.8, a - Math.random() * 30);
}

drawLine(0, 0, 10, 100, 90);
