$(document).ready(function(){
    var h2s = $("body").find("h2");
    var h3s = $("body").find("h3");
    var h4s = $("body").find("h4");

    // 在新标签页打开链接
    var links = document.links;
    for (var i = 0; i < links.length; i++) {
        if (!links[i].target) {
            if (links[i].hostname !== window.location.hostname || 
                /\.(?!html?)([a-z]{0,3}|[a-zt]{0,4})$/.test(links[i].pathname)) {
                links[i].target = '_blank';
            } 
        }
    }
    
    var headCounts = [h2s.length, h3s.length, h4s.length];
    var vH1Tag = null;
    var vH2Tag = null;
    for(var i = 0; i < headCounts.length; i++){
        if(headCounts[i] > 0){
            if(vH1Tag == null) vH1Tag = 'h' + (i + 1 + 1);
            else if(vH2Tag == null) vH2Tag = 'h' + (i + 1 + 1);
            else vH3Tag = 'h' + (i + 1 + 1);
        }
    }
    if(vH1Tag == null) return;

    console.log(vH1Tag, vH2Tag)
    $("body").prepend('<div class="BlogAnchor">' + 
        '<p class="html_header">' + 
            '<span></span>' + 
        '</p>' + 
        '<div class="AnchorContent" id="AnchorContent"> </div>' + 
    '</div>' );

    var vH1Index = 0, vH2Index = 0, vH3Index = 0;
    $("body").find("h2,h3,h4").each(function(i,item){
        var id = '';
        var name = '';
        var tag = $(item).get(0).tagName.toLowerCase();
        var className = '';
        if(tag == vH1Tag){
            id = name = ++vH1Index;
            name = id;
            vH2Index = 0;
            className = 'item_h1';
        }
        else if(tag == vH2Tag){
            id = vH1Index + '_' + ++vH2Index;
            name = vH1Index + '.' + vH2Index;
            className = 'item_h2';
        }
        else if(tag == vH3Tag){
            id = vH1Index + '_' + ++vH2Index + ++vH3Index;
            name = vH1Index + '.' + vH2Index + '.' + vH3Index;
            className = 'item_h3';
        }
        $(item).attr("id", "wow" + id);
        $(item).addClass("wow_head");
        $("#AnchorContent").css('max-height', ($(window).height() - 80) + 'px');
        $("#AnchorContent").append('<li><a class="nav_item ' + className + ' anchor-link" onclick="return false;" href="#" link="#wow' + id + '">' + "" + "" + $(this).text() + '</a></li>');
    });
    
    $(".anchor-link").click(function(){
        $("html,body").animate({scrollTop: $($(this).attr("link")).offset().top}, 500);
    });

    var headerNavs = $(".BlogAnchor li .nav_item");
    var headerTops = [];
    $(".wow_head").each(function(i, n){
        headerTops.push($(n).offset().top);
    });
    $(window).scroll(function(){
        var scrollTop = $(window).scrollTop();
        $.each(headerTops, function(i, n){
            var distance = n - scrollTop;
            if(distance >= 0){
                $(".BlogAnchor li .nav_item.current").removeClass('current');
                $(headerNavs[i]).addClass('current');
                return false;
            }
        });
    });
});

$(window).resize(function() {
    $("#AnchorContent").css('max-height', ($(window).height() - 80) + 'px');
});

// 插入 title 的 ico 图标  
var ico_link = "<link rel=icon type=image/png href=outline/favicon.ico>";
$("head").prepend(ico_link);