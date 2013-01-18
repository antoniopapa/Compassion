using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;
using System.Configuration;
using System.Data.SqlClient;
using System.Reflection;

/// <summary>
/// Summary description for DatabaseObject
/// </summary>
public class DatabaseObject
{
    private static string connectionString = ConfigurationManager.ConnectionStrings["connection"].ConnectionString;

    public DatabaseObject() { }

    public static DataSet query(string sql)
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

    public static bool update(string sql)
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

    public static object insert(string sql)
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