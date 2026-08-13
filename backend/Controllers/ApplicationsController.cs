using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading.Tasks;

[ApiController]
[Route("api/[controller]")]
public class ApplicationsController : ControllerBase
{
    private readonly AppDbContext _context;

    public ApplicationsController(AppDbContext context)
    {
        _context = context;
    }

    // GET: api/applications
    [HttpGet]
    public async Task<IActionResult> GetApplications()
    {
        var apps = await _context.Applications
            .Include(a => a.Category)
            .Include(a => a.Status)
            .Include(a => a.Pemilik)
            .Include(a => a.Pembuat)
            .Include(a => a.ApplicationUrl)
            .Include(a => a.server)
            .Include(a => a.Database)
            .Include(a => a.Version)
            .Include(a => a.BackupPemilik)
            .ToListAsync();

        return Ok(apps);
    }

    // GET: api/applications/{id}
    [HttpGet("{id}")]
    public async Task<IActionResult> GetApplication(Guid id)
    {
        var app = await _context.Applications
            .Include(a => a.Category)
            .Include(a => a.Status)
            .Include(a => a.Pemilik)
            .Include(a => a.Pembuat)
            .Include(a => a.ApplicationUrl)
            .Include(a => a.server)
            .Include(a => a.Database)
            .Include(a => a.Version)
            .Include(a => a.BackupPemilik)
            .FirstOrDefaultAsync(a => a.Id == id);

        if (app == null) return NotFound();
        return Ok(app);
    }

    // POST: api/applications
    [HttpPost]
    public async Task<IActionResult> CreateApplication([FromBody] Application application)
    {
        application.Id = Guid.NewGuid();
        application.CreatedAt = DateTime.UtcNow; 
        _context.Applications.Add(application);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetApplication), new { id = application.Id }, application);
    }

    // PUT: api/applications/{id}
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateApplication(Guid id, [FromBody] Application application)
    {
        if (id != application.Id) return BadRequest();

        application.LastUpdated = DateTime.UtcNow; // set waktu update
        _context.Entry(application).State = EntityState.Modified;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!_context.Applications.Any(a => a.Id == id))
                return NotFound();
            throw;
        }

        return NoContent();
    }

    // DELETE: api/applications/{id}
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteApplication(Guid id)
    {
        var app = await _context.Applications.FindAsync(id);
        if (app == null) return NotFound();

        _context.Applications.Remove(app);
        await _context.SaveChangesAsync();

        return NoContent();
    }
}
