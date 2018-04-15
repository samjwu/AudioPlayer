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

$("#volumeslider").change(function() {
    audioobj.volume = parseFloat(this.value / 100);
});

$("#prevbtn").click(function() {
    audioobj.pause();
    var prevsong = $("#playlist li.active").prev();
    //if at start, go to end
    if(!$(prevsong).is("li")) {
        prevsong = $("#playlist li:last-child");
    }
    getsong(prevsong);
    audioobj.play();
    showprogresslength();
});

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

$("#nextbtn").click(function() {
    audioobj.pause();
    var nextsong = $("#playlist li.active").next();
    //if at end, go back to start
    if(!$(nextsong).is("li")) {
        nextsong = $("#playlist li:first-child");
    }
    getsong(nextsong);
    audioobj.play();
    showprogresslength();
});

//change current time of song by clicking on progress bar
$("#progressbar").click(function(clickevent) {
    var start = $("#progressbar").offset().left;
    var clickposition = clickevent.pageX - start;
    audioobj.currentTime = (clickposition / $("#progressbar").width()) * audioobj.duration;
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
        //autoplay next song when current song ends
        if(audioobj.currentTime >= audioobj.duration) {
            $("#nextbtn").trigger("click");
        }
    });
}

//choose song from playlist by clicking
$("#playlist li").click(function() {
    //do nothing if current song is clicked
    if(this == $("#playlist li.active")["0"]) {
        return;
    }
    $("#playbtn").hide();
    $("#pausebtn").show();
    audioobj.pause();
    getsong($(this) );
    audioobj.play();
    $("#progresslength").fadeIn(250);
    showprogresslength();
});