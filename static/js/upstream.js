var socket = io.connect();

var drop = document.querySelector('#div-file-drop');
console.log(drop);

function cancel(e) {
    console.log('hey');
  if (e.preventDefault) e.preventDefault(); // required by FF + Safari
  e.dataTransfer.dropEffect = 'copy'; // tells the browser what drop effect is allowed here
  return false; // required by IE
}

drop.ondragover = cancel;
drop.ondragenter = cancel;

drop.ondrop = function (e) {
  if (e.preventDefault) e.preventDefault();
  var formData = new FormData();
  var files = e.dataTransfer.files;
  formData.append('file', files[0]);

  var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(e) {
    console.log(xhr.readyState);
    if (xhr.readyState === 4) {
        if (xhr.status === 200) {
            socket.emit('update');
        }
    }
  };

  xhr.open('POST', '/new_file');
  xhr.send(formData);
};
