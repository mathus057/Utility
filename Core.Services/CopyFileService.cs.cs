using System;
using System.Collections.Generic;
using System.IO;
using System.Text;
using System.Threading.Tasks;
using Core.Interfaces;
using Core.Models;

namespace Core.Services
{
    public class CopyFileService : ICopyFileService
    {
        public async Task<ResponsModel<CopyFileModel>> Drive2Drive(string fileName)
        {
            ResponsModel<CopyFileModel> res = new ResponsModel<CopyFileModel>() { IsSuccess = true, Result = new CopyFileModel() };
            try
            {
                string sourcePath = @"D:\__TL909340\test\A\";
                string targetPath = @"D:\__TL909340\test\B\";

                string sourceFile = Path.Combine(sourcePath, fileName);
                string destFile = Path.Combine(targetPath, fileName);

                if (!Directory.Exists(targetPath))
                {
                    Directory.CreateDirectory(targetPath);
                }

                //File.Move(sourceFile, destFile);
                System.IO.File.Copy(sourceFile, destFile);
            }
            catch (Exception e)
            {
                res.IsSuccess = false;
                res.Error.Message =new List<string> { e.Message.ToString() } ;
            }

            return res;

            throw new NotImplementedException();
        }

      
    }
}
