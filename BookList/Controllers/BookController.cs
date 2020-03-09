using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BookList.Controllers
{
    [Route("api/books")]
    [ApiController]
    public class BookController : Controller
    {
        private readonly Model.ApplicationDbContext _db;
        public BookController(Model.ApplicationDbContext db)
        {
            _db = db;
        }
        [HttpGet]
        public async Task<IActionResult> GetAllBook()
        {
            return Json(new{data= await _db.Books.ToListAsync()});
        }

        [HttpDelete]
        public async Task<IActionResult> Delete(int id)
        {
            var bookFromdb = await _db.Books.FirstOrDefaultAsync(b => b.Id == id);
            if (bookFromdb == null)
            {
                return Json(new { success=false,message="Error in finding the Book"});
            }
            _db.Books.Remove(bookFromdb);
            await _db.SaveChangesAsync();
            return Json(new { success = true, message = "Done" });



        }
    }
}