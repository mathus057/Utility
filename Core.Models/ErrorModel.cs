using System;
using System.Collections.Generic;
using System.Text;

namespace Core.Models
{
    public class ErrorModel
    {
        public ErrorModel()
        {
            Message = new List<string>();
        }

        public List<string> Message { get; set; }
    }
}
