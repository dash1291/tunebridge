var socket = io.connect();
var state;

socket.on('changetrack', function (data) {
    console.log('wahstup');
    var trackName = data.name;

    var audio = document.querySelector('#player');
    audio.load();
    audio.play();
    state = true;
});

socket.on('volume', function(vol) {
    document.querySelector('#player').volume = vol / 100;
});

socket.on('toggleState', function(vol) {
    if (!state) {
        state = true;
        document.querySelector('#player').play();
    } else {
        state = false;
        document.querySelector('#player').pause();
    }
});

document.querySelector('#btn-play').onclick = function(e) {
    document.querySelector('#player').play();
};
