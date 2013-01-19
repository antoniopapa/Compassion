using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;

public class Tags : DatabaseObject
{
    public int Id { set; get; }
    public string Tag { set; get; }

    private static Tags instantiate(DataSet ds)
    {
        Tags t = new Tags();

        t.Id = Convert.ToInt16(ds.Tables[0].Rows[0]["id"]);
        t.Tag = ds.Tables[0].Rows[0]["tag"].ToString();

        return t;
    }

    public void insert()
    {
        insert(String.Format("INSERT INTO tags VALUES ('{0}')", Tag));
    }

    public void update()
    {
        update(String.Format("UPDATE tags SET tag = '{1}' WHERE id = '{0}'", Id, Tag));
    }

    public void delete()
    {
        update(String.Format("DELETE FROM tags WHERE id = '{0}'", Id));
    }

    public static DataSet loadAll()
    {
        return query("SELECT * FROM tags");
    }

    public static DataSet loadById(int id)
    {
        DataSet ds = query(String.Format("SELECT * FROM tags WHERE id = '{0}'", id));
        instantiate(ds);
        return ds;
    }

    public static int countAll()
    {
        return Convert.ToInt16(query("SELECT COUNT(*) FROM tags").Tables[0].Rows[0][0]);
    }

    public static DataSet loadByCauseId(string causeId)
    {
        return query(String.Format("SELECT * FROM tags WHERE cause_id = {0}", causeId));
    }
}