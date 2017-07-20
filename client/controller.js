/**
 * Created by konoe_mario on 2017/07/19.
 */
var socket = io.connect('http://192.168.1.12:5000/legocar');

$(function() {
    socket.on('connect', function () {
    });

    socket.on('test',function(data){
        render(data)
    });

});

function render(data) {
    $("#controller").text(data);
}


//キー入力に関しては、以下を参考にした。
// http://hakuhin.jp/js/key_board.html

//キーが押された場合のイベント
document.onkeydown = function(e){
    isSendMessage(e.keyCode,"keydown");
};

//キーが離された場合のイベント
document.onkeyup = function(e){
    isSendMessage(e.keyCode,"keyup");
};

//Windowが非アクティブになったら、エンジンが止まるように決め打ちで送信する。
window.onblur = function () {
    isSendMessage(87,"keyup");
};



//socket通信をするかどうか制御する関数
function isSendMessage(key_code,keykind){

    switch(key_code){
        //前へ進む:W
        case 87:
            if(keykind === "keydown"){
                sendMessage("w");
            }else{
                sendMessage("f");
            };
            break;
        //後ろ:S
        case 83:
            if(keykind === "keydown"){
                sendMessage("s");
            }else{
                sendMessage("f");
            };
            break;
        //右へ曲がる:D
        case 68:
            sendMessage("d");
            break;
        //左へ曲がる:A
        case 65:
            sendMessage("a");
            break;
        default:
            break;

    }

}


//socket通信
function  sendMessage(message)  {
    socket.emit("sendMessage",message);
}


