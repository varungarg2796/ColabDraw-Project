/**
 * Created by divesh212 on 19/8/16.
 */

console.log("js included");
function adduser(newuser) {
    $.post('/adduser',
        newuser,
        function (data, status) {
            console.log('status = ' + status);
            console.log('result = ' + data);
            console.log("Added to database");
        }
    )
};

$(document).ready(function () {
    var newuserid=0;

    $('#login').click(function () {
        newuserid++;
        let newuser = {
            userid: newuserid,
            username: $('#name').val()
        };
        adduser(newuser);
    })
});
