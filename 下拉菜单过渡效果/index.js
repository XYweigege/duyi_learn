const input = document.querySelector(".text");
const select = document.querySelector(".select");

input.onfocus = function () {
  select.style.height = "auto";
  // 获取设置自动高度后的select的高度
  const selectHeight = select.offsetHeight;
  // 这两句必须有，不然过渡效果有问题
  select.style.height = 0;
  select.offsetHeight; // --> 强制触发重排
  // 将值赋值给select的style
  select.style.height = selectHeight + "px";
};

input.onblur = function () {
  select.style.height = 0;
};
