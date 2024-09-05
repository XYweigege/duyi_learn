const canvas = document.querySelector(".canvas");
const ctx = canvas.getContext("2d");

// 解决清晰度问题
canvas.width = window.innerWidth * devicePixelRatio;
canvas.height = window.innerHeight * devicePixelRatio;

// 生成x,y之间随机数
function getRandom(min, max) {
  return Math.random() * (max - min) + min;
}

// 生成随机点并画出
class Point {
  constructor() {
    this.r = 6;
    this.x = getRandom(this.r / 2, canvas.width - this.r / 2);
    this.y = getRandom(this.r / 2, canvas.height - this.r / 2);
    // 随机速度
    this.xSpeed = getRandom(-50, 50);
    this.ySpeed = getRandom(-50, 50);
    // 记录上一次运动的时间
    this.lastMoveTime = Date.now();
  }

  draw() {
    if (this.lastMoveTime) {
      // 运动时间 --> 换成秒，不然太快
      let time = (Date.now() - this.lastMoveTime) / 1000;
      // 更新球的位置
      this.x += this.xSpeed * time;
      this.y += this.ySpeed * time;
      // 如果点超出了边界，就改变方向
      if (this.x < this.r / 2 || this.x > canvas.width - this.r / 2) {
        this.xSpeed = -this.xSpeed;
      }
      if (this.y < this.r / 2 || this.y > canvas.height - this.r / 2) {
        this.ySpeed = -this.ySpeed;
      }
    }

    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(255, 255, 255)";
    ctx.fill();
    this.lastMoveTime = Date.now();
  }
}

// 生成一个图，随机生成点，并在范围小于500时连线
class Graph {
  constructor(PointNum, maxDis = 300) {
    this.points = new Array(PointNum).fill(0).map(() => new Point());
    this.maxDis = maxDis;
  }

  draw() {
    // 添加动画
    requestAnimationFrame(() => {
      // 如何保证点运动 --> 点的class里面
      this.draw();
    });
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < this.points.length; i++) {
      this.points[i].draw();
      for (let j = i + 1; j < this.points.length; j++) {
        // 计算两点距离
        let dis = Math.sqrt(
          Math.pow(this.points[i].x - this.points[j].x, 2) +
            Math.pow(this.points[i].y - this.points[j].y, 2)
        );
        // 如果距离小于500，连线
        if (dis < this.maxDis) {
          ctx.beginPath();
          ctx.moveTo(this.points[i].x, this.points[i].y);
          ctx.lineTo(this.points[j].x, this.points[j].y);
          // 越远越透明
          ctx.strokeStyle = `rgba(255, 255, 255,${1 - dis / this.maxDis})`;
          ctx.stroke();
        }
      }
    }
  }
}

new Graph(30).draw();
