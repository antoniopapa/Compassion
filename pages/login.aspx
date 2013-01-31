<%@ Page Language="C#" AutoEventWireup="true" CodeFile="login.aspx.cs" Inherits="pages_login"  %>
<%@ Import Namespace="System.Data" %>

<div id="cont" >

        <script type="text/javascript" src="../javascript/jquery-1.8.3.min.js"></script>
 <script type="text/javascript">


 </script>
    <div id="metrobox-login" >
        <div id="metrobox-login-header"><img src="./imgs/icons/Login3.png" /> <span id="metrobox-login-title">LOGIN FORM</span></div>
    <form id="form-login" action="process/login.aspx" method="post" >
        <table>
            <tr>
                <td>
                    <label> Username </label>
                </td>
                <td>
                    <input type="text" name="username" id="input-username" />
                </td>
            </tr>
            <tr>
                 <td>
                    <label> Password </label>
                 </td>
                 <td>
                    <input type="password" name="password" id="input-password"/>
                 </td>
            </tr>  
            <tr>  
                <td> 
                    <input type="submit" value="Go!"/>
                </td>
            </tr>
         </table>
    </form>
        </div>

   

</div>
