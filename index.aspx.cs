using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Runtime.Serialization.Json;
using System.IO;
using System.Text;
using System.Data;
using System.Data.SqlClient;
using System.Web.Services;

public partial class index : System.Web.UI.Page
{
    public static string connectionString = "Data Source=ANTONIO-PC\\SQLSERVER;Initial Catalog=worldoflove;Integrated Security=True";

    protected void Page_Load(object sender, EventArgs e)
    {

    }

    [WebMethod]
    public static string getAllPersonsAsXml()
    {
        return sql("SELECT * FROM person").GetXml();
    }

    [WebMethod]
    public static void insertPath(string slat, string slong, string elat, string elogn)
    {
        sqlinsert(String.Format("INSERT INTO path VALUES({0}, {1}, {2}, {3}, GETDATE())", slat, slong, elat, elogn));
    }

    [WebMethod]
    public static string getPathAsXml()
    {
        return sql("SELECT TOP 1 * FROM path ORDER BY date DESC").GetXml();
    }

    [WebMethod]
    public static void deletePath()
    {
        sql("DELETE FROM path;");
    }

    [WebMethod]
    public static string getImages(string id)
    {
        return sql(String.Format("SELECT * FROM images WHERE person_id = {0}", id)).GetXml();
    }

    [WebMethod]
    public static string getVideos(string id)
    {
        return sql(String.Format("SELECT * FROM video WHERE person_id = {0}", id)).GetXml();
    }

    public static string Serialize<T>(T obj)
    {
        DataContractJsonSerializer serializer = new DataContractJsonSerializer(obj.GetType());
        using (MemoryStream ms = new MemoryStream())
        {
            serializer.WriteObject(ms, obj);
            return Encoding.Default.GetString(ms.ToArray());
        }
    }

    public static T Deserialise<T>(string json)
    {
        T obj = Activator.CreateInstance<T>();
        using (MemoryStream ms = new MemoryStream(Encoding.Unicode.GetBytes(json)))
        {
            DataContractJsonSerializer serializer = new DataContractJsonSerializer(obj.GetType());
            obj = (T)serializer.ReadObject(ms); // <== Your missing line
            return obj;
        }
    }

    public static DataSet sql(string sql)
    {
        using (SqlConnection connection = new SqlConnection(connectionString))
        {
            using (SqlDataAdapter da = new SqlDataAdapter(sql, connection))
            {
                try
                {
                    connection.Open();
                    DataSet ds = new DataSet();
                    da.Fill(ds);
                    return ds;
                }
                catch (Exception)
                {
                    return new DataSet();
                }
                finally
                {
                    connection.Close();
                }
            }
        }
    }

    public static bool sqlexecute(string sql)
    {
        using (SqlConnection connection = new SqlConnection(connectionString))
        {
            using (SqlCommand da = new SqlCommand(sql, connection))
            {
                try
                {
                    connection.Open();
                    da.ExecuteNonQuery();
                    return true;
                }
                catch (Exception)
                {
                    return false;
                }
                finally
                {
                    connection.Close();
                }
            }
        }
    }

    public static object sqlinsert(string sql)
    {
        using (SqlConnection connection = new SqlConnection(connectionString))
        {
            using (SqlCommand command = new SqlCommand(sql, connection))
            {
                try
                {
                    connection.Open();
                    return command.ExecuteScalar();
                }
                catch (Exception)
                {
                    return 0;
                }
                finally
                {
                    connection.Close();
                }
            }
        }
    }
}