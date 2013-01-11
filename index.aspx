<%@ Page Language="C#" AutoEventWireup="true" CodeFile="index.aspx.cs" Inherits="index" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html>
<head>
    <title>World Of Love</title>
    <meta name="viewport" content="initial-scale=1.0, user-scalable=no" />
    <link href="css/style.css" rel="Stylesheet" />
    <link href="css/jquery.lightbox-0.5.css" rel="stylesheet" type="text/css" />
    <link href="css/bootstrap.min.css" rel="stylesheet" type="text/css" />
</head>
<body>
    <div id ="sidebar">
    </div>
     <header>
        <div id="NavButton">   
            <span id="MenuBubble">
                <div id="BubbleCon" >
                <form method="post" action="/" >
                    <label>Username</label>
                    <br />
                    <input type="text" />
                    <br />
                    <label>Password</label>
                    <br />
                    <input type="password"/>
                    <br />
                    <input type="submit" value="Log in"/> or Register
                </form>
                    <br />
                 <p>About Us</p>
                </div>
            </span>
        </div>  
    </header>
    <div id="mapDiv" style="position: relative; width: 100%; height: 100%;">
    </div>
  
    <form id="form" runat="server" style="display: none;">
    <asp:ScriptManager ID="ScriptManager1" runat="server" EnablePageMethods="True">
    </asp:ScriptManager>
    </form>
</body>
<script type="text/javascript" src="http://ecn.dev.virtualearth.net/mapcontrol/mapcontrol.ashx?v=7.0"></script>
<script src="javascript/jquery-1.8.3.min.js"></script>
<script src="javascript/jquery.livequery.js" type="text/javascript"></script>
<script src="javascript/jquery.lightbox-0.5.pack.js"></script>
<script type="text/javascript" src="javascript/javascript.js"></script>
<script>
    $('a.gallery').live('mouseover', function () { $('a.gallery').lightBox(); });
    $(function () {
        $("#sidebar").animate({ left: "100%" }).fadeOut("Fast");
    });

    $(function () {
        $("#NavButton").hover(function () {
            $("#sidebar").fadeIn("Slow").animate({ left: "84%" });
        }, function () {
            $("#sidebar").animate({ left: "100%" }).fadeOut("Fast");
        });
    });

    $(function () {
        $("#MenuBubble").fadeOut("Slow");
    });
    $(function () {
        $("#NavButton").hover(function () {
            $("#MenuBubble").fadeIn("Slow");
        }, function () {
            $("#MenuBubble").fadeOut("Fast");
        });
    });
</script>
</html>
