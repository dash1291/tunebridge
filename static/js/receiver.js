var socket = io.connect();

socket.on('changetrack', function (data) {
	console.log('wahstup');
    var trackName = data.name;

    var audio = document.querySelector('#player');
    audio.load();
 	audio.play();
});

document.querySelector('#btn-play').onclick = function(e) {
	document.querySelector('#player').play();
};
