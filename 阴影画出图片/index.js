import { downloadTool } from "./utils/tools.js";

// 属性选择器：不懂见 https://juejin.cn/post/7375532797383098377
const fileDom = document.querySelector("input[type=file]");
const btn = document.querySelector(".btn");

// 获取img对象
function lodingImg() {
  // 默认写法 fileDom.files 就是获取文件的 或者 监听change 事件 通过 e.target | this.files 去获取文件
  const file = fileDom.files[0];
  if (!file) {
    return;
  }
  const objUrl = URL.createObjectURL(file);
  const img = new Image();
  return new Promise((resolve, reject) => {
    img.onload = () => {
      resolve(img);
    };
    img.onerror = () => {
      reject(null);
    };
    img.src = objUrl;
  });
}

function creatHtml(w, h, data) {
  const shadowCss = [];
  const shadowCssHover = [];
  // 通用操作
  for (let i = 0; i < w; i++) {
    for (let j = 0; j < h; j++) {
      let index = (i + w * j) * 4;
      const r = data[index];
      const g = data[index + 1];
      const b = data[index + 2];
      // 这里要 / 255 是因为前端写rgba中的a是0-1之间的数，和返回结果 0 - 255不一样
      const a = data[index + 3] / 255;
      // 设置每一个阴影
      // 这里高度+1，是因为.inner有1px高，可以删除这里+1，并解开inner的 background 测试
      shadowCss.push(`${i}px ${j + 1}px rgba(${r},${g},${b},${a})`);
      shadowCssHover.push(
        `${i}px ${j + 1}px rgba(${255 - r},${255 - g},${255 - b},${a})`
      );
    }
  }

  // 生成style插入界面
  const styleElement = document.createElement("style");
  styleElement.textContent = `
  .shadow-img {
    width:${w}px;
    height:${h}px;
  }
  .shadow-img .inner {
    width:1px;
    height:1px;
    /* background: red; */ 
    box-shadow: ${shadowCss.join(",")};
    transtion: all 1s;
  }
  .shadow-img:hover .inner {
    box-shadow: ${shadowCssHover.join(",")};
  }
  `;
  document.head.appendChild(styleElement);

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <style>
    .shadow-img {
      width:${w}px;
      height:${h}px;
    }
    .shadow-img .inner {
      width:1px;
      height:1px;
      box-shadow: ${shadowCss.join(",")};
      transtion: all 1s;
    }
    .shadow-img:hover .inner {
      box-shadow: ${shadowCssHover.join(",")};
    }
  </style>
</head>
<body>
  <div class="shadow-img">
    <div class="inner"></div>
  </div>
</body>
</html>
`;
}

async function generate() {
  const img = await lodingImg();
  if (!img) {
    return;
  }

  // 创建canvas获取像素点颜色
  const canvas = document.createElement("canvas");
  canvas.width = img.width;
  canvas.height = img.height;
  const ctx = canvas.getContext("2d");
  // 图片和canvas一样大，所以省略了后面的
  ctx.drawImage(img, 0, 0);
  const { data } = ctx.getImageData(0, 0, img.width, img.height);
  const html = creatHtml(img.width, img.height, data);
  let blob = new Blob([html], { type: "text/html" });
  let url = window.URL.createObjectURL(blob);
  downloadTool(url);
}

btn.addEventListener("click", (e) => {
  generate();
});
