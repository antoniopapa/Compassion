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
    <script type="text/javascript" src="javascript/navigation.js"></script>
    <script type="text/javascript" src="javascript/jquery-ui-1.10.0.custom.min.js"></script>
</head>

<body>

    <form id="form" runat="server">
    <asp:ScriptManager ID="ScriptManager1" runat="server" EnablePageMethods="True">
    </asp:ScriptManager>
    </form>

    <div id ="sidebar">

        <form id="form-search" >
            <div id="search-box">
                <input type="text" class="input-metro"  />
                <input type="button" class="button-metro" />
            </div>
        </form>

        <div id="sidebar-menu" >
            <div class="menu-item" id="item-data" >
                <img src="imgs/icons/Data.png" />
                <span>Data List</span>
            </div>
            <div class="menu-item" id="item-login">
                <img src="imgs/icons/Login3.png" />
                <span>Log in</span>
            </div>
            <div class="menu-item" id="item-about">
                <img src="imgs/icons/About.png" />
                <span>About</span>
            </div>
            <div class="menu-item" id="item-bug" >
                <img src="imgs/icons/Ant.png" />
                <span>Report bug</span>
            </div>
            <div class="menu-item" id="item-banner" >
                <img src="imgs/icons/Banner.png" />
                <span>Causes</span>
            </div>
        </div>  
         
    </div>

    <div id="container" >

        <div id="header" >
        </div>

        <div id ="content" >
            <div id="mapDiv" style="position: relative; width: 100%; height: 100%;"> </div>    
        </div>
    </div>
</body>
</html>
