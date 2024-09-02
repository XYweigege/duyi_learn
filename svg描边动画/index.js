const path = document.querySelectorAll(".p");
for (let i of path) {
  // 获取 svg 的长度
  const l = i.getTotalLength();
  i.style.setProperty("--l", `${l}`);
}
