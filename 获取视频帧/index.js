import { captureFrame } from "./captureFrame.js";
import { downloadTool } from "./utils/tools.js";

const fileEl = document.querySelector(".FileInp");

fileEl.onchange = async (e) => {
  console.log(e);
  let file = e.target.files[0];
  // 多出现几秒就直接循环就行！
  let res = await captureFrame(file, 4);
  downloadTool(res.imgurl, "帧图片");
};
