//导出字符串为csv文件
function exportCsv(fileName, text) {
  let link = document.createElement('a');
  link.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  link.setAttribute('download', fileName);
  link.style.display = 'none';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

//读取文件内容
function readFile(file, callBack) {
  let reader = new FileReader();
  reader.onload = function(){
    callBack(this.result);
  };
  reader.readAsText(file);
}

//封装cookie操作
const cookie = {
  //设置cookie
  set: function(key, value, exHours) {
    let text = `${key}=${value};`;
    if (exHours && typeof exHours == 'number') {
      let d = new Date();
      d.setTime(d.getTime() + (exHours * 60 * 60 * 1000));
      let expires = `expires=${d.toGMTString()}`;
      text = text + expires;
    }
    document.cookie = text;
    return text;
  },

  //读取cookie
  get: function(key) {
    let list = document.cookie.split(/;|=|\s/);
    for (let i = 0; i < list.length; i++) {
      if (list[i] == key) {
        return list[i + 1];
      }
    }
  },

  //删除cookie
  del: function(key) {
    let text = `${key}=;expires=Thu, 01 Jan 1970 00:00:00 GMT`;
    document.cookie = text;
    return text;
  }
}