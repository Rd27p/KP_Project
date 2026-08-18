using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace backend.Models
{
    public class Server
    {
        public Guid Id { get; set; }

        [Required(ErrorMessage = "Nama server wajib diisi")]
        [StringLength(100)]
        public string ServerName { get; set; } = string.Empty;

        [Required(ErrorMessage = "IP Address wajib diisi")]
        [RegularExpression(@"^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$", ErrorMessage = "Format IP tidak valid")]
        public string IpAddress { get; set; } = string.Empty;

        [Required(ErrorMessage = "Region wajib diisi")]
        public string Region { get; set; } = string.Empty;

        [Required]
        [RegularExpression("Online|Warning|Critical|Offline", ErrorMessage = "Status harus Online, Warning, Critical, atau Offline")]
        public string Status { get; set; } = "Online";

        public Guid? ApplicationId { get; set; } 
        
        [Range(0, 100)]
        public double CpuUsage { get; set; }

        [Range(0, 100)]
        public double MemoryUsage { get; set; }

        [Range(0, 100)]
        public double DiskUsage { get; set; }

        [Range(0, 100)]
        public double Availability { get; set; }

        public int ResponseTimeMs { get; set; }

        // Monitoring tambahan
        public bool IsCritical { get; set; }
        public DateTime LastChecked { get; set; } = DateTime.UtcNow;

        public string? AlertLevel { get; set; }
        public string? Description { get; set; }

        // ✅ Relasi ke banyak aplikasi (1:N)
        public ICollection<Application> Applications { get; set; } = new List<Application>();
    }
}
