using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading.Tasks;

[ApiController]
[Route("api/[controller]")]
public class ComplaintsController : ControllerBase
{
    private readonly AppDbContext _context;

    public ComplaintsController(AppDbContext context)
    {
        _context = context;
    }

    // GET: api/complaints
    [HttpGet]
    public async Task<IActionResult> GetComplaints()
    {
        var complaints = await _context.Complaints
            .Include(c => c.Application) // relasi ke aplikasi bermasalah
            .ToListAsync();
        return Ok(complaints);
    }

    // GET: api/complaints/{id}
    [HttpGet("{id}")]
    public async Task<IActionResult> GetComplaint(Guid id)
    {
        var complaint = await _context.Complaints
            .Include(c => c.Application)
            .FirstOrDefaultAsync(c => c.Id == id);

        if (complaint == null) return NotFound();
        return Ok(complaint);
    }

    // POST: api/complaints
    [HttpPost]
    public async Task<IActionResult> CreateComplaint([FromBody] Complaint complaint)
    {
        complaint.Id = Guid.NewGuid();
        complaint.CreatedAt = DateTime.UtcNow;

        _context.Complaints.Add(complaint);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetComplaint), new { id = complaint.Id }, complaint);
    }

    // PUT: api/complaints/{id}
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateComplaint(Guid id, [FromBody] Complaint complaint)
    {
        if (id != complaint.Id) return BadRequest();

        _context.Entry(complaint).State = EntityState.Modified;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!_context.Complaints.Any(c => c.Id == id))
                return NotFound();
            throw;
        }

        return NoContent();
    }

    // DELETE: api/complaints/{id}
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteComplaint(Guid id)
    {
        var complaint = await _context.Complaints.FindAsync(id);
        if (complaint == null) return NotFound();

        _context.Complaints.Remove(complaint);
        await _context.SaveChangesAsync();

        return NoContent();
    }
}
