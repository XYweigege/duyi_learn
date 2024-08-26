/**
 *  获取视频某一帧的画面
 *  @param {File} videoFile
 *  @param {Number} time
 *  @returns {{imgurl: string, blob: Blob}} - 返回一个对象，包含帧图像的URL和Blob对象
 *  @property {string} imgurl - 帧图像的URL
 *  @property {Blob} blob - 帧图像的Blob对象
 */
export function captureFrame(videoFile, time = 0) {
  return new Promise((resolve, reject) => {
    const video = document.createElement("video");

    // 跳转到指定时间（秒）
    video.currentTime = time;
    // 设置静音，避免不让播放(浏览器自动播放策略)
    video.muted = true;
    // 自动播放(不会继续往后，没渲染到界面就只会跳到那一帧)
    video.autoplay = true;

    video.src = URL.createObjectURL(videoFile);

    // 画canvas，不能直接画，加载需要时间
    video.oncanplay = () => {
      const canvas = document.createElement("canvas");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      // 测试是否成功
      // document.body.appendChild(canvas);

      // 异步，所以放Promise里面
      canvas.toBlob((blob) => {
        let imgurl = URL.createObjectURL(blob);
        resolve({ blob, imgurl });
      });
    };
  });
}
