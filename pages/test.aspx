<%@ Page Language="C#" AutoEventWireup="true" CodeFile="test.aspx.cs" Inherits="pages_test" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
</head>
<body>
    <form id="form1" runat="server">
    <div>
    <%
        List<Users> list = Users.loadAllObjectsByUsers(); 
       
         %>
        
      

        <%= SessionControl.getVar("id")%>
    </div>
    </form>
</body>
</html>
