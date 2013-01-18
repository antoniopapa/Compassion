using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.IO;
using System.Runtime.Serialization.Json;
using System.Text;
using System.Data;
using System.Data.SqlClient;
using System.Configuration;

public class Functions
{
    private static string connectionString = ConfigurationManager.ConnectionStrings["connection"].ConnectionString;

	public Functions()
	{

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

    public static string Serialize<T>(T obj)
    {
        DataContractJsonSerializer serializer = new DataContractJsonSerializer(obj.GetType());
        using (MemoryStream ms = new MemoryStream())
        {
            serializer.WriteObject(ms, obj);
            return Encoding.Default.GetString(ms.ToArray());
        }
    }
}