
// Sidebar variables.

var sidebar_visible     = 18;     // amount of pixels visible when sidebar is inactive ( hidden from view ).
var sidebar_active_t    = 700;    // mouse hoverIn animation time.
var sidebar_inactive_t  = 300;    // mouse hoverOut animation time.
var sidebar_timeout     = 700;    // time to wait to execute close animation after mouse hoves out of sidebar.
var sidebar_width       = 350;    // width of the full sidebar.

// Sets sidebar to default position.
$(function () {
    $("#sidebar").css("width", sidebar_width);
    $("#sidebar").animate({ left: ($(window).width() - sidebar_visible) }, sidebar_active_t , 'swing');
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
         //   $("#sidebar").animate({ left: ($(window).width() - sidebar_visible) }, sidebar_inactive_t, 'swing');
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
