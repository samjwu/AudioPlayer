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
    $(audioobj).bind("timeupdate", function() {
        var seconds = parseInt(audioobj.currentTime) % 60;
        var minutes = parseInt((audioobj.currentTime / 60)) % 60;
        //time formatting (eg: 0:01)
        if(seconds < 10) {
            seconds = "0" + seconds;
        }
        $("#progresslength").html(minutes + ":" + seconds);
        //calculate percentage of progress bar to fill
        var progressbarcompletion = 0;
        if(audioobj.currentTime > 0) {
            progressbarcompletion = Math.floor((audioobj.currentTime / audioobj.duration) * 100);
        }
        $("#fullprogress").css("width", progressbarcompletion + "%");
    });
}