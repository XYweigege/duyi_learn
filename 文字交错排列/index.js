const text = document.querySelector(".overlap");
// 不能用 outerHTML --> 有标签+class之类的东西
text.innerHTML = text.textContent
  .split("")
  .map((t, i, arr) => `<span style="z-index:${arr.length - i}">${t}</span>`)
  .join("");
