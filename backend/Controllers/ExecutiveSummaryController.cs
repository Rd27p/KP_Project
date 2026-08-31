using backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/executive-summary")]
    [Authorize]
    public class ExecutiveSummaryController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ExecutiveSummaryController(
            AppDbContext context)
        {
            _context = context;
        }

        // GET: api/executive-summary
        [HttpGet]
        public async Task<IActionResult> GetExecutiveSummary()
        {
            // 1. Total aplikasi yang terdaftar
            var totalApplications =
                await _context.Applications.CountAsync();

            // 2. Total alarm kritis yang aktif
            var activeCriticalAlarms =
                await _context.Complaints.CountAsync(complaint =>(
                        complaint.IssueType == "Application Error" ||
                        complaint.IssueType == "Application Error"
                    )
                    && complaint.Status != ComplaintStatuses.Resolved
                    && complaint.Status != ComplaintStatuses.Closed
                );

            // 3. Rata-rata kesehatan berdasarkan availability
            var averageHealthValue =
                await _context.Servers
                    .Select(server =>
                        (double?)server.Availability
                    )
                    .AverageAsync();

            var averageHealth = Math.Round(
                averageHealthValue ?? 0,
                1
            );

            return Ok(new
            {
                totalApplications,
                activeCriticalAlarms,
                averageHealth
            });
        }
    }
}