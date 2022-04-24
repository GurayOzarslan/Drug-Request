using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPI.Models
{
    public class Orderr
    {
        public int OrderId { get; set; }
        public string Patient_No { get; set; }
        public string P_User { get; set; }
        public string P_Drug { get; set; }
        public string P_Route_Of_Admin { get; set; }
        public string DateOfJoining { get; set; }

    }
}
