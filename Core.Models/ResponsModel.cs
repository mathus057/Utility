using System;
using System.Collections.Generic;
using System.Text;

namespace Core.Models
{
    public class ResponsModel<T> where T : class
    {
        public ResponsModel()
        {
            Error = new ErrorModel();
        }

        public ErrorModel Error { get; set; }
        public bool IsSuccess { get; set; }
        public bool IsNotFound { get; set; }
        public T Result { get; set; }
    }
}
