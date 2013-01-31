using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class pages_test : System.Web.UI.Page
{
    public string session_id;
    public bool session_e;

    protected void Page_Load(object sender, EventArgs e)
    {
       

        if (Session["id"] == null)
        {
            session_id = "0";
            session_e = false;
        }
        else
        {
            session_id = (String)Session["id"].ToString();
            session_e = true;
        }
    }
}