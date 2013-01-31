
// Sidebar variables.

var sidebar_visible     = 18;     // amount of pixels visible when sidebar is inactive ( hidden from view ).
var sidebar_active_t    = 700;    // mouse hoverIn animation time.
var sidebar_inactive_t  = 300;    // mouse hoverOut animation time.
var sidebar_timeout     = 700;    // time to wait to execute close animation after mouse hoves out of sidebar.
var sidebar_width       = 350;    // width of the full sidebar.

// Sets sidebar to default position.
$(function () {
    $("#sidebar").css("width", sidebar_width); 
    $("#sidebar").animate({ left: ($(window).width() - sidebar_visible) }, sidebar_active_t, 'swing');
});


// Sidebar hover animations.
$(function () {
    $("#sidebar").hover(function () {
        // hoverIn
        clearTimeout($(this).data('timeout'));
        $("#sidebar").animate({ left: ($(window).width() - sidebar_width) }, { duration: sidebar_active_t, queue: false } , 'swing');
    }, function () {
        // hoverOut
        var t = setTimeout(function () {
            $("#sidebar").animate({ left: ($(window).width() - sidebar_visible) }, sidebar_inactive_t, 'swing');
        }, sidebar_timeout);
        $(this).data('timeout', t);
       });
});


// Menu items hover animations

function createItem(name,active,passive)
{

    $(function ()
    {

        $(name + " img").css("background-color", passive);

        $(name).hover
        (
            function ()
            {
                $(name + " img").css("background-color", active);
                $(name).css("background-color", passive);
            },
            function ()
            {
                $(name + " img").css("background-color", passive);
                $(name).css("background-color", "");
            }
        );

    });

}


createItem("#item-data", "#090", "#0F0");
createItem("#item-bug", "#900", "#F00");
createItem("#item-about", "#777", "#ccc");
createItem("#item-login", "#479", "#58f");
createItem("#item-banner", "#990", "#bb0");
createItem("#item-add", "#990", "#bb0");
createItem("#item-delete", "#099", "#0aa");
createItem("#item-map", "#009", "#00b");


// Ajax Requests

var timer_fadein = 800;
var timer_fadeout = 400;
var ajaxTimeout = 1200;

function ItemAjaxRequest(itemname, url,complete)
{
    $(itemname).click(function () {
        $("#content").fadeOut( timer_fadeout, function () {
            $("#content").empty();
            $("#content").fadeIn(timer_fadein);
            $("#content").append('<img src="imgs/ajax-loader.gif" id="ajaxgif" />');
            setTimeout(function () {
                $("#content").hide();
                $("#content").load(url + " #cont", function () {
                    $("#content").fadeIn(timer_fadein);
                    //clearTimeout();
                    setTimeout(complete(),timer_fadein + 500);
                });
            },ajaxTimeout);
        });
    });
}


function implementButtons()
{
    /////////////////////
    $("#login-button").click(function () {
        $("#content").fadeOut(timer_fadeout, function () {
            $("#content").empty();
            $("#content").fadeIn(timer_fadein);
            $("#content").append('<img src="imgs/ajax-loader.gif" id="ajaxgif" />');
            setTimeout(function () {
                $("#content").hide();
                $("#content").load("./pages/login.aspx" + " #cont", function () {
                    $("#content").fadeIn(timer_fadein);
                    //clearTimeout();
                    setTimeout(afterreq(), timer_fadein + 500);
                });
            }, ajaxTimeout);
        });
    });
    //////////////
    $("#logout-button").click(function () {
        $.ajax({
            url: "./proc/logout.aspx",
            type: "get"
        });

        refreshHeader();
    });
}

function refreshHeader()
{
    //$("#header-cont").slideUp(timer_fadeout, function () {
   // $("#header-cont").css({ "top": "" });
    $("#header-cont").animate( { "bottom" : 201}, function() {
        $("#header-cont").empty();
        setTimeout(function () {

            $("#header-cont").load("pages/header.aspx .cont", function () {
                //  $("#header-cont").slideDown(timer_fadein);
                implementButtons();
                $("#header-cont").animate({ "bottom": "-15px" }, 400);           
              //  $("#header-cont").css({ "top": "10px" });
            });
        }, ajaxTimeout);
    });
}

// Sets header ready
$(function () {
    $("#header-cont").load("pages/header.aspx .cont", function () {
 implementButtons();
    });
   
  //  refreshHeader();
});


function afterreq()
{
  //  alert("hi");
    $("#form-login").submit(function (event) {
        // alert("sdfsdf");
      
   //     $("#form-login input").css("padding", 77);

        var username = $("#input-username").val();
        var password = $("#input-password").val();

        var request = $.ajax({
            url: "proc/login.aspx?id=7",
            type: "post",
            data: { "name": username, "pass": password }
        });

        request.done(function (response, textStatus, jqXHR) {
            console.log(response);
            if (response == "Error")
                alert("Username pr Password is incorrect");
            else {
                refreshHeader();
                afterlogin();
                   }

        });


         event.preventDefault();
        

    });
}

function afterlogin() {

    $("#content").fadeOut(timer_fadeout, function () {
        $("#content").empty();
        $("#content").fadeIn(timer_fadein);
        $("#content").append('<img src="imgs/ajax-loader.gif" id="ajaxgif" />');
        setTimeout(function () {
            $("#content").hide();
            $("#content").load("./pages/map.aspx" + " #cont", function () {
                $("#content").fadeIn(timer_fadein);
                //clearTimeout();
                load_the_map();
            });
        }, ajaxTimeout);
    });
}




$(function () {
      ItemAjaxRequest("#item-login", "pages/login.aspx",afterreq);
      ItemAjaxRequest("#item-map", "pages/map.aspx", load_the_map);
});
