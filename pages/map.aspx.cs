﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;

public partial class pages_testajax : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        string s = Request.QueryString["test"];
        Page.Title = s;
    }
}