//ajax
function ajax(options, res) {
  let xhr = new XMLHttpRequest();
  xhr.open(options.type, options.url);
  if (cookie.get('token')) {
    xhr.setRequestHeader('token', cookie.get('token'));
  }
  xhr.setRequestHeader('Content-Type', "application/json; charset=utf-8");
  if(options.data) {
    xhr.send(options.data);
  } else {
    xhr.send();
  }
  xhr.onload = function() {
      res(xhr.responseText);
  }
}