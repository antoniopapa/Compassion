using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;

public class Videos : DatabaseObject
{
    public int Id { set; get; }
    public int CauseId { set; get; }
    public string Name { set; get; }
    public string Url { set; get; }
    public DateTime Date { set; get; }

    private static Videos instantiate(DataSet ds)
    {
        Videos v = new Videos();

        v.Id = Convert.ToInt16(ds.Tables[0].Rows[0]["id"]);
        v.CauseId = Convert.ToInt16(ds.Tables[0].Rows[0]["cause_id"]);
        v.Name = ds.Tables[0].Rows[0]["name"].ToString();
        v.Url = ds.Tables[0].Rows[0]["url"].ToString();
        v.Date = Convert.ToDateTime(ds.Tables[0].Rows[0]["date"]);

        return v;
    }

    public void insert()
    {
        insert(String.Format("INSERT INTO videos VALUES ('{0}', '{1}', '{2}', '{3}')", CauseId, Name, Url, Date));
    }

    public void update()
    {
        update(String.Format("UPDATE videos SET cause_id = '{1}', name = '{2}', url = '{3}', date = '{4}' WHERE id = '{0}'", Id, CauseId, Name, Url, Date));
    }

    public void delete()
    {
        update(String.Format("DELETE FROM videos WHERE id = '{0}'", Id));
    }

    public static DataSet loadAll()
    {
        return query("SELECT * FROM videos");
    }

    public static DataSet loadById(int id)
    {
        DataSet ds = query(String.Format("SELECT * FROM videos WHERE id = '{0}'", id));
        instantiate(ds);
        return ds;
    }

    public static int countAll()
    {
        return Convert.ToInt16(query("SELECT COUNT(*) FROM videos").Tables[0].Rows[0][0]);
    }

    public static DataSet loadByCauseId(string causeId)
    {
        return query(String.Format("SELECT * FROM videos WHERE cause_id = {0}", causeId));
    }
}