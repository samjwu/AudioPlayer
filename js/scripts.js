var audio;

$("#pausebtn").hide();

getsong($("#playlist li:first-child"));

function getsong(song) {
    var file = song.attr("file");
    var title = song.text();
    var image = song.attr("image");
    var artist = song.attr("artist");

    audioobj = new Audio("aud/" + file);
    
    if(!audioobj.currentTime) {
        $("#progresslength").html("0:00");
    }
    $("#audioinfo .title").text(title);
    $("#audioinfo .artist").text(artist);
    $("img.songimage").attr("src","img/" + image);

    $("#playlist li").removeClass("active");
    song.addClass("active");
}

$("#playbtn").click(function() {
    audioobj.play();
    $("#playbtn").hide();
    $("#pausebtn").show();
    $("#progresslength").fadeIn(250);
    showprogresslength();
});

$("#pausebtn").click(function() {
    audioobj.pause();
    $("#pausebtn").hide();
    $("#playbtn").show();
});

$("#stopbtn").click(function() {
    audioobj.pause();
    audioobj.currentTime = 0;
    $("#pausebtn").hide();
    $("#playbtn").show();
    $("#progresslength").fadeIn(250);
    showprogresslength();
});

function showprogresslength() {
    $(audioobj).bind();
}