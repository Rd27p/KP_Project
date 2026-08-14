using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Models;
using System.Threading.Tasks;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly AppDbContext _context;

    public AuthController(AppDbContext context)
    {
        _context = context;
    }

    [HttpPost("login")]
    
    public async Task<IActionResult> Login(backend.Models.LoginRequest request)
    {
        var user = await _context.Users
            .FirstOrDefaultAsync(u => u.Username == request.Username && u.Password == request.Password);

        if (user == null)
            return Unauthorized(new { message = "Username atau password salah" });

        // Dummy token (nanti bisa diganti JWT)
        var token = Guid.NewGuid().ToString();

        return Ok(new
        {
            message = "Login berhasil",
            token,
            user = new { user.Id, user.Username, user.Email,user.Nama, user.NIK,user.Telp}
        });
    }
}
