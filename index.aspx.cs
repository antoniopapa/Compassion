using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;

public partial class index : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        
    }

    [WebMethod]
    public static string getLastContribute()
    {
        return Contributions.getLastContributeAsDataset().GetXml();
    }

    [WebMethod]
    public static string getImages(string id)
    {
        return Images.getCauseProfilePicture(id);
    }

    [WebMethod]
    public static string getCauses()
    {
        return Causes.getMapCauses().GetXml();
    }

    [WebMethod]
    public static string getSearchCauses(string search)
    {
        return Causes.getShortDescriptionCausesBySearch(search).GetXml();
    }

}