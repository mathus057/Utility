using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Core.Models;


namespace Core.Interfaces
{
    public interface  ICopyFileService
    {
        Task<ResponsModel<CopyFileModel>> Drive2Drive(string fileName);
    }
}
