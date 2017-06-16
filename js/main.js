window.onload = function () {
  console.log(document.documentElement.clientWidth);
  
  window.onresize = function () {
    if(document.documentElement.clientWidth <= 980) {
      var nav = document.getElementsByTagName('nav')[0];
      
    }
  }
}
