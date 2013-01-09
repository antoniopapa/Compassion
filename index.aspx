<%@ Page Language="C#" AutoEventWireup="true" CodeFile="index.aspx.cs" Inherits="index" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html>
<head>
    <title>World Of Love</title>
    <meta name="viewport" content="initial-scale=1.0, user-scalable=no" />
    <link href="css/style.css" rel="Stylesheet" />
    <script type="text/javascript" src="javascript/jquery-1.8.3.min.js"></script>
    <script type="text/javascript" src="http://ecn.dev.virtualearth.net/mapcontrol/mapcontrol.ashx?v=7.0"></script>
    <script type="text/javascript" src="javascript/javascript.js"></script>
</head>
<body>
    <form id="form" runat="server">
    <asp:ScriptManager runat="server" EnablePageMethods="True">
    </asp:ScriptManager>
    </form>
    <header>
        <div id="NavButton">
           <p>Logo</p>
            <span id="MenuBubble">
                <div id="BubbleCon" >
                <form method="post" action="" >
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
    <script type="text/javascript">
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
    <div id="mapDiv" style="position: relative; width: 100%; height: 100%;">
    </div>
    <div style="width: 200px; height: 200px; position: absolute; bottom: 0; right: 0;
        z-index: 999; background-color: White;">
        <h2>
            Komentet:</h2>
        Tani nese shtyp donate do te shikohet zemra nga te gjithe perdoruesit.
    </div>
   
</body>
</html>
