using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class pages_header : System.Web.UI.Page
{
    public string _html;
    public Users user;

    protected void Page_Load(object sender, EventArgs e)
    {
        if (SessionControl.getVar("id") != null)
        {
            user = Users.loadObjectById(Convert.ToInt16(SessionControl.getVar("id")));
            _html = userhtml();
        }
        else
        {
            _html = defaulthtml();

        }
    }

    public string defaulthtml()
    {
        string h = "<img id=\"testtest\" src=\"./imgs/icons/Login_User.png\" />"
    + "<div id=\"message\" ><h3>Hello Guest</h3><p>You're missing out, log in to explore!</p>"
   +  "<div id=\"login-button\">Log in</div><div id=\"register-button\">Register</div></div>";

        return h;
    }

    public string userhtml()
    {
        string h = "<img id=\"testtest\" src=\"./photos/Funny-Animals-animal-humor-29016374-1600-1200.jpg\" />"
            + "<div id=\"message\" ><h3>Hello " + user.Email + "</h3><p>You are ready to explore our site!</p>"
            + "<div id=\"logout-button\">Log out</div>";

        return h;
    }
}