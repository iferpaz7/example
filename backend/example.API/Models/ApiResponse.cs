using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace example.API.Models
{
    public class ApiResponse
    {
        public string Code { get; set; }
        public string Message { get; set; }
        public dynamic Payload { get; set; }
    }
}