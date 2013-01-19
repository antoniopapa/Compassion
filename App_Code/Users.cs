using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;

public class Users : DatabaseObject
{
    public int Id { set; get; }
    public string Email { set; get; }
    public string Password { set; get; }
    public string Phone { set; get; }
    public string City { set; get; }
    public string Country { set; get; }
    public int Type { set; get; }
    public DateTime Date { set; get; }
    public int Active { set; get; }

    private static Users instantiate(DataSet ds)
    {
        Users u = new Users();

        u.Id = Convert.ToInt16(ds.Tables[0].Rows[0]["id"]);
        u.Email = ds.Tables[0].Rows[0]["email"].ToString();
        u.Password = ds.Tables[0].Rows[0]["password"].ToString();
        u.Phone = ds.Tables[0].Rows[0]["phone"].ToString();
        u.City = ds.Tables[0].Rows[0]["city"].ToString();
        u.Country = ds.Tables[0].Rows[0]["country"].ToString();
        u.Type = Convert.ToInt16(ds.Tables[0].Rows[0]["type"]);
        u.Date = Convert.ToDateTime(ds.Tables[0].Rows[0]["date"]);
        u.Active = Convert.ToInt16(ds.Tables[0].Rows[0]["active"]);

        return u;
    }

    public void insert()
    {
        insert(String.Format("INSERT INTO users VALUES ('{0}', '{1}', '{2}', '{3}', '{4}', '{5}', '{6}', '{7}')", Email, Password, Phone, City, Country, Type, Date, Active));
    }

    public void update()
    {
        update(String.Format("UPDATE users SET email = '{1}', password = '{2}', phone = '{3}', city = '{4}', country = '{5}', type = '{6}', date = '{7}', active = '{8}' WHERE id = '{0}'", Id, Email, Password, Phone, City, Country, Type, Date, Active));
    }

    public void delete()
    {
        update(String.Format("DELETE FROM users WHERE id = '{0}'", Id));
    }

    public static DataSet loadAll()
    {
        return query("SELECT * FROM users");
    }

    public static DataSet loadById(int id)
    {
        DataSet ds = query(String.Format("SELECT * FROM users WHERE id = '{0}'", id));
        instantiate(ds);
        return ds;
    }

    public static int countAll()
    {
        return Convert.ToInt16(query("SELECT COUNT(*) FROM users").Tables[0].Rows[0][0]);
    }
}