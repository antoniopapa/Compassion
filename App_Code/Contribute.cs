using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;

public class Contributions : DatabaseObject
{
    public int Id { set; get; }
    public int UserId { set; get; }
    public int CauseId { set; get; }
    public string Contribution { set; get; }
    public DateTime Date { set; get; }

    private static Contributions instantiate(DataSet ds)
    {
        Contributions c = new Contributions();

        c.Id = Convert.ToInt16(ds.Tables[0].Rows[0]["id"]);
        c.UserId = Convert.ToInt16(ds.Tables[0].Rows[0]["user_id"]);
        c.CauseId = Convert.ToInt16(ds.Tables[0].Rows[0]["cause_id"]);
        c.Contribution = ds.Tables[0].Rows[0]["contribute"].ToString();
        c.Date = Convert.ToDateTime(ds.Tables[0].Rows[0]["date"]);

        return c;
    }

    public void insert()
    {
        insert(String.Format("INSERT INTO contributes VALUES ('{0}', '{1}', '{2}', '{3}')", UserId, CauseId, Contribution, Date));
    }

    public void update()
    {
        update(String.Format("UPDATE contributes SET user_id = '{1}', cause_id = '{2}', contribution = '{3}', date = '{4}' WHERE id = '{0}'", Id, UserId, CauseId, Contribution, Date));
    }

    public void delete()
    {
        update(String.Format("DELETE FROM contributes WHERE id = '{0}'", Id));
    }

    public static DataSet loadAll()
    {
        return query("SELECT * FROM contributes");
    }

    public static DataSet loadDataSetById(int id)
    {
        return query(String.Format("SELECT * FROM contributes WHERE id = '{0}'", id));
    }

    public static Contributions loadObjectById(int id)
    {
        return instantiate(query(String.Format("SELECT * FROM contributes WHERE id = '{0}'", id)));
    }

    public static int countAll()
    {
        return Convert.ToInt16(query("SELECT COUNT(*) FROM contributes").Tables[0].Rows[0][0]);
    }

    public static Contributions getLastContribute()
    {
        return instantiate(query("SELECT TOP 1 * FROM contributes ORDER BY date DESC"));
    }

    public static DataSet getLastContributeAsDataset()
    {
        return query("SELECT TOP 1 * FROM contributes ORDER BY date DESC");
    }
}