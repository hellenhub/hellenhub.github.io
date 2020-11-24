window.onload = function () {
  var oBtn = document.getElementById("btnBackToTop");
    // 获取文档的高度
    var clientHeight = document.documentElement.clientHeight;
    var time = null;
    var isTop = true;
    var cancelScroll = false;
    window.onscroll = function () {
      // 浏览器窗口滚动时执行
      // 获取浏览器距离顶部滚动距离
      var scrollHeight = document.documentElement.scrollTop || document.body.scrollTop;
      if (scrollHeight >= clientHeight) {
        oBtn.style.display = 'block';
      }else{
        oBtn.style.display = 'none';
      }
      if (!isTop) {
        clearInterval(time);
      }
      isTop = false;
    };
    oBtn.onclick = function () {
    // 绑定按钮的点击事件
    if (cancelScroll === false) {
        // 设置定时器，使按钮点击返回顶部时的效果更顺滑
        time = setInterval(function (){
        var scrollHeight = document.documentElement.scrollTop || document.body.scrollTop;
        var isSpeed = Math.floor(-scrollHeight / 10);
        document.documentElement.scrollTop = document.body.scrollTop = scrollHeight + isSpeed;
        isTop = true;
        if (scrollHeight === 0){
          clearInterval(time);
        }
      }, 30);
    } else {
      clearInterval(time);
      cancelScroll = true;
    }
  }
}
