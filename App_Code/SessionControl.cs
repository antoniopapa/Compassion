using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public class SessionControl
{
   
    public static object getVar(string varName){
        return HttpContext.Current.Session[varName];
    }

    public static void setVar(string varName, object varValue)
    {
        HttpContext.Current.Session[varName] = varValue;
    }


}