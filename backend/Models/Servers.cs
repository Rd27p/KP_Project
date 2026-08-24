using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace backend.Models
{
    public class Server
    {
        public Guid Id { get; set; }

        [Required]
        public string ServerName { get; set; } = string.Empty;

        [Required]
        public string IpAddress { get; set; } = string.Empty;

        [Required]
        public string Region { get; set; } = string.Empty;

        [Required]
        [RegularExpression(
            "Online|Offline|Maintenance",
            ErrorMessage = "Status server tidak valid"
        )]
        public string Status { get; set; } = "Online";

        public double CpuUsage { get; set; }

        public double MemoryUsage { get; set; }

        public double DiskUsage { get; set; }

        public double Availability { get; set; }

        public int ResponseTimeMs { get; set; }

        public bool IsCritical { get; set; }

        public DateTime LastChecked { get; set; }

        public string? AlertLevel { get; set; }

        public string? Description { get; set; }

        // 1 Server -> Banyak Application
        public ICollection<Application> Applications { get; set; }
            = new List<Application>();
    }
}