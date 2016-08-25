/**
 * Created by divesh212 on 20/8/16.
 */
console.log("main3 included");
const socket = io();

$(function () {

    const username = prompt("Enter username");

    $('#submitchat').click(function () {
        console.log("Clicked on sent");
        socket.emit('chat',
            {
                user: username,
                msg: $('#chatmessage').val()
            })
    });

    socket.on('chat', function (data) {
        console.log("chat sent");
        $('#chatbox').append(data.user
            + ': ' + data.msg + '<br>')
    })
});
