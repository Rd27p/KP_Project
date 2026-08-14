using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading.Tasks;

[ApiController]
[Route("api/[controller]")]
public class ServersController : ControllerBase
{
    private readonly AppDbContext _context;

    public ServersController(AppDbContext context)
    {
        _context = context;
    }

    // GET: api/servers
    [HttpGet]
    public async Task<IActionResult> GetServers()
    {
        var servers = await _context.Servers
            .Include(s => s.Application)
            .ToListAsync();
        return Ok(servers);
    }

    // GET: api/servers/{id}
    [HttpGet("{id}")]
    public async Task<IActionResult> GetServer(Guid id)
    {
        var server = await _context.Servers
            .Include(s => s.Application)
            .FirstOrDefaultAsync(s => s.Id == id);

        if (server == null) return NotFound();
        return Ok(server);
    }

    // POST: api/servers
    [HttpPost]
    public async Task<IActionResult> CreateServer([FromBody] Server server)
    {
        server.Id = Guid.NewGuid();
        server.LastChecked = DateTime.UtcNow;
        _context.Servers.Add(server);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetServer), new { id = server.Id }, server);
    }

    // PUT: api/servers/{id}
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateServer(Guid id, [FromBody] Server server)
    {
        if (id != server.Id) return BadRequest();

        server.LastChecked = DateTime.UtcNow;
        _context.Entry(server).State = EntityState.Modified;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!_context.Servers.Any(s => s.Id == id))
                return NotFound();
            throw;
        }

        return NoContent();
    }

    // DELETE: api/servers/{id}
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteServer(Guid id)
    {
        var server = await _context.Servers.FindAsync(id);
        if (server == null) return NotFound();

        _context.Servers.Remove(server);
        await _context.SaveChangesAsync();

        return NoContent();
    }
}
