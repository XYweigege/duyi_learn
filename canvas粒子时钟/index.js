const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d", {
  willReadFrequently: true,
});

// 设置宽高
// 解决清晰度问题
function initCanvasSize() {
  canvas.width = window.innerWidth * devicePixelRatio;
  canvas.height = window.innerHeight * devicePixelRatio;
}
initCanvasSize();

/**
 * GPT 生成
 * 获取指定范围内的随机数
 * @param {number} min - 随机数的最小值（包含）
 * @param {number} max - 随机数的最大值（包含）
 * @returns {number} - 返回在min和max范围内的随机数
 */
function getRandomInRange(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

// 生成颗粒
class PartCircle {
  constructor() {
    // 半径
    const radius = Math.min(canvas.width, canvas.height) / 2;
    // 圆心x
    const roundx = canvas.width / 2;
    // 圆心y
    const roundy = canvas.height / 2;
    // 角度
    const range = (getRandomInRange(0, 360) * Math.PI) / 180;
    // 生成的颗粒的坐标
    this.x = roundx + radius * Math.cos(range);
    this.y = roundy + radius * Math.sin(range);
    // 粒子半径
    this.r = getRandomInRange(2 * devicePixelRatio, 7 * devicePixelRatio);
  }

  draw() {
    // 见 问题img
    ctx.beginPath();
    ctx.fillStyle = "#5445544d";
    ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
    ctx.fill();
  }

  /**
   * @param {number} mtx - 移动后的x位置
   * @param {number} mty - 移动后的y位置
   */
  moveTo(mtx, mty) {
    // 移动时间
    const duration = 500;
    // 这里必须用变量接收，不然效果不对，因为_move中使用的话，会让x、y不断增加！
    const sx = this.x,
      sy = this.y;
    const speedx = (mtx - sx) / duration;
    const speedy = (mty - sy) / duration;
    const startTime = Date.now();
    const _move = () => {
      const moveTime = Date.now() - startTime;
      const x = sx + speedx * moveTime;
      const y = sy + speedy * moveTime;
      this.x = x;
      this.y = y;
      if (moveTime >= duration) {
        this.x = mtx;
        this.y = mty;
        return;
      }
      // 慢慢移动
      requestAnimationFrame(_move);
    };
    _move();
  }
}

// PartCircle数组
const PartCircles = [];
let text = null;
// 清空画布
function clear() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}
// 画所有点
function drowAll() {
  clear();
  drawTxt();
  PartCircles.forEach((e) => e.draw());
  requestAnimationFrame(drowAll);
}

drowAll();

// 获取画的文字
function getDrawTxt() {
  return new Date().toTimeString().substring(0, 8);
}
// 画文字 --> 获取要生成多少的颗粒
function drawTxt() {
  const newText = getDrawTxt();
  if (text === newText) {
    return;
  }
  text = newText;

  // canvas画居中文字
  ctx.fillStyle = "#000";
  ctx.textBaseline = "middle";
  // 必须指定字体，不然大小不生效！！！
  ctx.font = `${140 * devicePixelRatio}px 'Arial'`;
  // 获取以上文字画入canvas后的全部属性
  // console.log(ctx.measureText(text));
  let w = ctx.measureText(text).width;
  ctx.fillText(text, (canvas.width - w) / 2, canvas.height / 2);

  // 拿到所有黑色像素点
  const points = getPoints();
  // 不是为了画文字，所以要清空
  clear();
  let len = points.length;
  for (let i = 0; i < len; i++) {
    let p = PartCircles[i];
    // 缺少就新建
    if (!p) {
      p = new PartCircle();
      PartCircles.push(p);
    }
    // 多了删除
    if (len < PartCircles.length) {
      PartCircles.splice(len);
    }
    // 拿到像素点的x,y
    const [x, y] = points[i];
    // 粒子移动过去
    p.moveTo(x, y);
  }
}

function getPoints() {
  const { width, height, data } = ctx.getImageData(
    0,
    0,
    canvas.width,
    canvas.height
  );
  const points = [];
  // 不需要取太多，跨越几个像素取
  const dep = 6;
  // 固定套路 --> 两层循环
  for (let i = 0; i < canvas.width; i += dep) {
    for (let j = 0; j < canvas.height; j += dep) {
      let index = (i + canvas.width * j) * 4;
      const r = data[index];
      const g = data[index + 1];
      const b = data[index + 2];
      const a = data[index + 3];
      if (r === 0 && g === 0 && b === 0 && a === 255) {
        points.push([i, j]);
      }
    }
  }
  return points;
}
