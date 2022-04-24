using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using System.Data.SqlClient;
using System.Data;
using WebAPI.Models;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderrController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public OrderrController(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        [HttpGet]
        public JsonResult Get()
        {
            string query = @"
                            select OrderId, Patient_No, P_User, P_Drug, P_Route_Of_Admin,
                            convert(varchar(10),DateOfJoining,120) as DateOfJoining
                            from
                            dbo.Orderr
                            ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("OrderAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult(table);
        }

        [HttpPost]
        public JsonResult Post(Orderr ord)
        {
            string query = @"
                           insert into dbo.Orderr
                           (Patient_No, P_User, P_Drug, P_Route_Of_Admin, DateOfJoining)
                    values (@Patient_No,@P_User,@P_Drug,@P_Route_Of_Admin,@DateOfJoining)";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("OrderAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@Patient_No", ord.Patient_No);
                    myCommand.Parameters.AddWithValue("@P_User", ord.P_User);
                    myCommand.Parameters.AddWithValue("@P_Drug", ord.P_Drug);
                    myCommand.Parameters.AddWithValue("@P_Route_Of_Admin", ord.P_Route_Of_Admin);
                    myCommand.Parameters.AddWithValue("@DateOfJoining", ord.DateOfJoining);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult("Added Successfully");
        }


        [HttpPut]
        public JsonResult Put(Orderr ord)
        {
            string query = @"
                           update dbo.Orderr
                        set Patient_No= @Patient_No,
                            P_User=@P_User,
                            P_Drug=@P_Drug,
                            P_Route_Of_Admin=@P_Route_Of_Admin,
                            DateOfJoining=@DateOfJoining
                            where OrderId=@OrderId
                            ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("OrderAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@OrderId", ord.OrderId);
                    myCommand.Parameters.AddWithValue("@Patient_No", ord.Patient_No);
                    myCommand.Parameters.AddWithValue("@P_User", ord.P_User);
                    myCommand.Parameters.AddWithValue("@P_Drug", ord.P_Drug);
                    myCommand.Parameters.AddWithValue("@P_Route_Of_Admin", ord.P_Route_Of_Admin);
                    myCommand.Parameters.AddWithValue("@DateOfJoining", ord.DateOfJoining);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult("Updated Successfully");
        }

        [HttpDelete("{id}")]
        public JsonResult Delete(int id)
        {
            string query = @"
                           delete from dbo.Orderr
                            where OrderId=@OrderId
                            ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("OrderAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@OrderId", id);

                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult("Deleted Successfully");
        }

    }
}
