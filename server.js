/**
 * Created by divesh212 on 16/8/16.
 */

const express = require('express');
const http = require('http');
const socketio= require('socket.io');
const bodyParser = require('body-parser');
const db = require('./dbhandler');


const app=express();
const server=http.Server(app);
const io=socketio(server);


app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.set('port',5000);

app.use('/', express.static('./public_html'));


io.on('connection', function (socket) {
    console.log('A user is connected');
    socket.on('chat', function(data) {

        io.emit('chat', data)
    })

});


app.post('/adduser', function (req, res) {
    //console.log(req.body);
    db.adduser({
        userid: req.body.userid,
        username: req.body.username
    }, function(result) {
        res.send(result)
    })
});

app.listen(app.get('port'),function(){
    console.log('Server started on port:'+app.get('port'))
});

