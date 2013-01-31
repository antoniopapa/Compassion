using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class proc_login : System.Web.UI.Page
{
    public string info = "";

    protected void Page_Load(object sender, EventArgs e)
    {
       // string id = Request.QueryString["id"];
       // if (id != null)
         //   SessionControl.setVar("id", id);
        Users u = new Users();
        bool Error = false;
       

        if (!string.IsNullOrEmpty(Request.Form["name"]))
            u.Email = Request.Form["name"];
        else
            Error = true;

        if (!string.IsNullOrEmpty(Request.Form["pass"]))
            u.Password = Request.Form["pass"];
        else
            Error = true;

        if ( !Error)
        {
            u = Users.checkExixts(Request.Form["name"],Request.Form["pass"]);

            if (u == null)
                info = "Error";
            else
            {
                info = "OK";
                SessionControl.setVar("id", u.Id);
            }
        }


      
        

    }
}