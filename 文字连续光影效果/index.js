const p = document.querySelector(".title");

// 将 p 转成 span 通用函数
p.innerHTML = p.textContent
  .split("")
  .map((e, i, arr) => `<span style="--delay:${i * 0.2}s">${e}</span>`)
  .join("");
