using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;

public class Person : DatabaseObject
{
    public int Id { set; get; }
    public string Name { set; get; }
    public string Surname { set; get; }
    public int Age { set; get; }
    public string Description { set; get; }
    public int UserId { set; get; }

    private static Person instantiate(DataSet ds)
    {
        Person p = new Person();

        p.Id = Convert.ToInt16(ds.Tables[0].Rows[0]["id"]);
        p.Name = ds.Tables[0].Rows[0]["name"].ToString();
        p.Surname = ds.Tables[0].Rows[0]["surname"].ToString();
        p.Age = Convert.ToInt16(ds.Tables[0].Rows[0]["age"]);
        p.UserId = Convert.ToInt16(ds.Tables[0].Rows[0]["user_id"]);
        p.Description = ds.Tables[0].Rows[0]["description"].ToString();

        return p;
    }

    public void insert()
    {
        insert(String.Format("INSERT INTO Person VALUES ('{0}', '{1}', '{2}', '{3}', '{4}')", UserId, Name, Surname, Age, Description));
    }

    public void update()
    {
        update(String.Format("UPDATE person SET user_id = '{1}', name = '{2}', surname = '{3}', age = '{4}', description = '{5}' WHERE id = '{0}'", Id, Name, Surname, Age, Description));
    }

    public void delete()
    {
        update(String.Format("DELETE FROM person WHERE id = '{0}'", Id));
    }

    public static DataSet loadAll()
    {
        return query("SELECT * FROM person");
    }

    public static DataSet loadById(int id)
    {
        DataSet ds = query(String.Format("SELECT * FROM users WHERE id = '{0}'", id));
        instantiate(ds);
        return ds;
    }

    public static int countAll()
    {
        return Convert.ToInt16(query("SELECT COUNT(*) FROM person").Tables[0].Rows[0][0]);
    }

    public static DataSet loadAllByUserId(int userId)
    {
        return query(String.Format("SELECT * FROM person WHERE user_id = '{0}'", userId));
    }
}