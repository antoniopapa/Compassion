<%@ Page Language="C#" AutoEventWireup="true" CodeFile="testajax.aspx.cs" Inherits="pages_testajax" %>
<%@ Import Namespace="System.Data" %>
<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
</head>
<body>
    <form id="form1" runat="server">
    <div>

    <p id="xxt">Hello</p>
        <%
          //  DataSet d = Organization.loadById(1);
            Users user = new Users();
            user.City = "Tirana";
            user.Country = "Albania";
            user.Date = DateTime.Now;
            user.Email = "test@test.com";
            user.Password = "pass";
            user.Phone = "069333333";
            user.Type = 1;

            user.insert();
        %>
    </div>
    </form>
</body>
</html>
