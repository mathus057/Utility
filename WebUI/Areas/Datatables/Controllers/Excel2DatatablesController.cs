﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace WebUI.Areas.Datatables.Controllers
{
    public class Excel2DatatablesController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
