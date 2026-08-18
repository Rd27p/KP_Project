using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Models;
using Microsoft.AspNetCore.Authorization;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class ApplicationsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ApplicationsController(AppDbContext context)
        {
            _context = context;
        }

        // ✅ GET semua aplikasi
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Application>>> GetApplications()
        {
            return await _context.Applications
                .Include(a => a.Category)
                .Include(a => a.Status)
                .Include(a => a.Pemilik)
                .Include(a => a.Pembuat)
                .Include(a => a.BackupPemilik)
                .ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Application>> GetApplication(Guid id)
        {
            var app = await _context.Applications
                .Include(a => a.Category)
                .Include(a => a.Status)
                .Include(a => a.Pemilik)
                .Include(a => a.Pembuat)
                .Include(a => a.BackupPemilik)
                .FirstOrDefaultAsync(a => a.Id == id);

            if (app == null)
                return NotFound();

            return app;
        }

        [HttpPost]
        public async Task<ActionResult<Application>> PostApplication(Application application)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            application.Id = Guid.NewGuid();
            application.CreatedAt = DateTime.UtcNow;
            application.IdPembuat = Guid.Parse(User.FindFirst("Id")?.Value ?? throw new InvalidOperationException("User ID not found in claims")    );
            _context.Applications.Add(application);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetApplication), new { id = application.Id }, application);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutApplication(Guid id, Application application)
        {
            if (id != application.Id)
                return BadRequest("Id tidak cocok");

            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            
            application.LastUpdated = DateTime.UtcNow;

            _context.Entry(application).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_context.Applications.Any(a => a.Id == id))
                    return NotFound();
                else
                    throw;
            }

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteApplication(Guid id)
        {
            var app = await _context.Applications.FindAsync(id);
            if (app == null)
                return NotFound();

            _context.Applications.Remove(app);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
