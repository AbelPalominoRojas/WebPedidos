using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using apr.Entities;
using apr.Business;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;

namespace apr.WebMVC.Controllers
{
    public class PedidoController : Controller
    {
        // GET: Pedido
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Create()
        {
            return View();
        }

        public JsonResult findAll()
        {
            List<Pedidos> pedidos = new List<Pedidos>();
            try
            {
                pedidos = new PedidosBll().findAll();
            }
            catch (Exception ex)
            {

                //throw;
            }

            return Json(pedidos, JsonRequestBehavior.AllowGet);
        }
    }
}