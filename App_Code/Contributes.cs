using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;

public class Contributes : DatabaseObject
{
    public int Id { set; get; }
    public int UserId { set; get; }
    public int CauseId { set; get; }
    public string Contribute { set; get; }
    public DateTime Date { set; get; }

    private static Contributes instantiate(DataSet ds)
    {
        Contributes c = new Contributes();

        c.Id = Convert.ToInt16(ds.Tables[0].Rows[0]["id"]);
        c.UserId = Convert.ToInt16(ds.Tables[0].Rows[0]["user_id"]);
        c.CauseId = Convert.ToInt16(ds.Tables[0].Rows[0]["cause_id"]);
        c.Contribute = ds.Tables[0].Rows[0]["contribute"].ToString();
        c.Date = Convert.ToDateTime(ds.Tables[0].Rows[0]["date"]);

        return c;
    }

    public void insert()
    {
        insert(String.Format("INSERT INTO contributes VALUES ('{0}', '{1}', '{2}', '{3}')", UserId, CauseId, Contribute, Date));
    }

    public void update()
    {
        update(String.Format("UPDATE contributes SET user_id = '{1}', cause_id = '{2}', contribute = '{3}', date = '{4}' WHERE id = '{0}'", Id, UserId, CauseId, Contribute, Date));
    }

    public void delete()
    {
        update(String.Format("DELETE FROM contributes WHERE id = '{0}'", Id));
    }

    public static DataSet loadAll()
    {
        return query("SELECT * FROM contributes");
    }

    public static DataSet loadById(int id)
    {
        DataSet ds = query(String.Format("SELECT * FROM contrubutes WHERE id = '{0}'", id));
        instantiate(ds);
        return ds;
    }

    public static int countAll()
    {
        return Convert.ToInt16(query("SELECT COUNT(*) FROM contributes").Tables[0].Rows[0][0]);
    }

    public static DataSet getLastContribute()
    {
        return query("SELECT TOP 1 * FROM contributes ORDER BY date DESC");
    }
}