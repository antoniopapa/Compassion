using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;

public class Admin : DatabaseObject
{
    public int Id { set; get; }
    public string Email { set; get; }
    public string Password { set; get; }
    public string Phone { set; get; }
    public string Name { set; get; }
    public string Surname { set; get; }
    public DateTime Date { set; get; }

    private static Admin instantiate(DataSet ds)
    {
        Admin a = new Admin();

        a.Id = Convert.ToInt16(ds.Tables[0].Rows[0]["id"]);
        a.Email = ds.Tables[0].Rows[0]["email"].ToString();
        a.Password = ds.Tables[0].Rows[0]["password"].ToString();
        a.Phone = ds.Tables[0].Rows[0]["phone"].ToString();
        a.Name = ds.Tables[0].Rows[0]["name"].ToString();
        a.Surname = ds.Tables[0].Rows[0]["surname"].ToString();
        a.Date = Convert.ToDateTime(ds.Tables[0].Rows[0]["date"]);

        return a;
    }

    public void insert()
    {
        insert(String.Format("INSERT INTO admin VALUES ('{0}', '{1}', '{2}', '{3}', '{4}', '{5}')", Name, Surname, Email, Password, Phone, Date));
    }

    public void update()
    {
        update(String.Format("UPDATE users SET admin = '{1}', surname = '{2}', email = '{3}', password = '{4}', phone = '{5}', date = '{6}' WHERE id = '{0}'", Id, Name, Surname, Email, Password, Phone, Date));
    }

    public void delete()
    {
        update(String.Format("DELETE FROM admin WHERE id = '{0}'", Id));
    }

    public static DataSet loadAll()
    {
        return query("SELECT * FROM admin");
    }

    public static DataSet loadById(int id)
    {
        DataSet ds = query(String.Format("SELECT * FROM admin WHERE id = '{0}'", id));
        instantiate(ds);
        return ds;
    }

    public static int countAll()
    {
        return Convert.ToInt16(query("SELECT COUNT(*) FROM admin").Tables[0].Rows[0][0]);
    }
}