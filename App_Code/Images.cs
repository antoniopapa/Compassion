using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;

public class Images : DatabaseObject
{
    public int Id { set; get; }
    public int CauseId { set; get; }
    public string Name { set; get; }
    public string Path { set; get; }
    public int Profile { set; get; }
    public DateTime Date { set; get; }

    private static Images instantiate(DataSet ds)
    {
        Images i = new Images();

        i.Id = Convert.ToInt16(ds.Tables[0].Rows[0]["id"]);
        i.Profile = Convert.ToInt16(ds.Tables[0].Rows[0]["profile"]);
        i.CauseId = Convert.ToInt16(ds.Tables[0].Rows[0]["cause_id"]);
        i.Name = ds.Tables[0].Rows[0]["name"].ToString();
        i.Path = ds.Tables[0].Rows[0]["path"].ToString();
        i.Date = Convert.ToDateTime(ds.Tables[0].Rows[0]["date"]);

        return i;
    }

    public void insert()
    {
        insert(String.Format("INSERT INTO images VALUES ('{0}', '{1}', '{2}', '{3}', '{4}')", CauseId, Name, Path, Profile, Date));
    }

    public void update()
    {
        update(String.Format("UPDATE images SET cause_id = '{1}', name = '{2}', path = '{3}', profile = '{4}', date = '{5}' WHERE id = '{0}'", Id, CauseId, Name, Path, Profile, Date));
    }

    public void delete()
    {
        update(String.Format("DELETE FROM images WHERE id = '{0}'", Id));
    }

    public static DataSet loadAll()
    {
        return query("SELECT * FROM images");
    }

    public static DataSet loadById(int id)
    {
        DataSet ds = query(String.Format("SELECT * FROM images WHERE id = '{0}'", id));
        instantiate(ds);
        return ds;
    }

    public static int countAll()
    {
        return Convert.ToInt16(query("SELECT COUNT(*) FROM images").Tables[0].Rows[0][0]);
    }

    public static DataSet loadByCauseId(string causeId)
    {
        return query(String.Format("SELECT * FROM images WHERE cause_id = {0}", causeId));
    }

    public static string getRandomImagePath()
    {
        DataSet ds = loadAll();
        int imageCount = ds.Tables[0].Rows.Count;
        int randomNumber = new Random().Next(0, imageCount);
        return ds.Tables[0].Rows[randomNumber]["path"].ToString() + ds.Tables[0].Rows[randomNumber]["name"].ToString();
    }

    public static string getCauseProfilePicture(string causeId)
    {
        DataSet ds = query(String.Format("SELECT * FROM images WHERE cause_id = {0} AND profile = 1", causeId));
        if (ds.Tables[0].Rows.Count > 0)
        {
            return ds.Tables[0].Rows[0]["path"].ToString() + ds.Tables[0].Rows[0]["name"].ToString();
        }

        return getRandomImagePath();
    }
}