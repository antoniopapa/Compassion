using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

public class Session
{
    private static Session _session;

	private Session()
	{

	}

    public static Session getInstance()
    {
        if (_session == null)
        {
            _session = new Session();
        }

        return _session;
    }

    public static object getVar(string varName){
        return HttpContext.Current.Session[varName];
    }

    public static void setVar(string varName, object varValue)
    {
        HttpContext.Current.Session[varName] = varValue;
    }
}