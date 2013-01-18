using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;

public class Causes: DatabaseObject
{
    public int Id { set; get; }
    public int UserId { set; get; }
    public string Title { set; get; }
    public string Description { set; get; }
    public string Story { set; get; }
    public double Latitude { set; get; }
    public double Longitude { set; get; }
    public double Need { set; get; }
    public int Scale { set; get; }
    public string Address { set; get; }
    public DateTime Date { set; get; }
    public int Active { set; get; }

    private static Causes instantiate(DataSet ds)
    {
        Causes c = new Causes();

        c.Id = Convert.ToInt16(ds.Tables[0].Rows[0]["id"]);
        c.UserId = Convert.ToInt16(ds.Tables[0].Rows[0]["user_id"]);
        c.Title = ds.Tables[0].Rows[0]["title"].ToString();
        c.Description = ds.Tables[0].Rows[0]["description"].ToString();
        c.Story = ds.Tables[0].Rows[0]["story"].ToString();
        c.Latitude = Convert.ToDouble(ds.Tables[0].Rows[0]["latitude"]);
        c.Longitude = Convert.ToDouble(ds.Tables[0].Rows[0]["longitude"]);
        c.Need = Convert.ToDouble(ds.Tables[0].Rows[0]["need"]);
        c.Scale = Convert.ToInt16(ds.Tables[0].Rows[0]["longitude"]);
        c.Address = ds.Tables[0].Rows[0]["address"].ToString();
        c.Date = Convert.ToDateTime(ds.Tables[0].Rows[0]["date"]);
        c.Active = Convert.ToInt16(ds.Tables[0].Rows[0]["active"]);

        return c;
    }

    public void insert()
    {
        insert(String.Format("INSERT INTO causes VALUES ('{0}', '{1}', '{2}', '{3}', '{4}', '{5}', '{6}', '{7}', '{8}', '{9}', '{10}')", UserId, Title, Description, Story, Latitude, Longitude, Need, Scale, Address, Date, Active));
    }

    public void update()
    {
        update(String.Format("UPDATE causes SET user_id = '{1}', title = '{2}', description = '{3}', story = '{4}', latitude = '{5}', longitude = '{6}', need = '{7}', scale = '{8}', address = '{9}', date = '{10}', active = '{11}' WHERE id = '{0}'", Id, UserId, Title, Description, Story, Latitude, Longitude, Need, Scale, Address, Date, Active));
    }

    public void delete()
    {
        update(String.Format("DELETE FROM causes WHERE id = '{0}'", Id));
    }

    public static DataSet loadAll()
    {
        return query("SELECT * FROM causes");
    }

    public static DataSet loadById(int id)
    {
        DataSet ds = query(String.Format("SELECT * FROM causes WHERE id = '{0}'", id));
        instantiate(ds);
        return ds;
    }

    public static int countAll()
    {
        return Convert.ToInt16(query("SELECT COUNT(*) FROM causes").Tables[0].Rows[0][0]);
    }

    public static DataSet getShortDescriptionCauses()
    {
        return query("SELECT causes.id, causes.title, causes.description, causes.latitude, causes.longitude, " +
                        " CASE WHEN users.type = 0 " +
		                " THEN person.name + ' ' + person.surname " +
		                " ELSE organization.name END AS 'name' " +
                        " FROM causes " + 
                        " LEFT JOIN users ON users.id = causes.user_id " +
                        " LEFT JOIN person ON person.user_id = causes.user_id " +
                        " LEFT JOIN organization ON organization.user_id = causes.user_id" + 
                        " WHERE causes.active = 1");
    }
}