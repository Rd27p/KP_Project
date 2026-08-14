using System;

namespace backend.Models
{
    public class Server
    {
        public Guid Id { get; set; }

        // Identitas server
        public string ServerName { get; set; } = string.Empty;
        public string IpAddress { get; set; } = string.Empty;
        public string Region { get; set; } = string.Empty; // contoh: Sumagabut, Sumagsel, dll

        // Status dan performa
        public string Status { get; set; } = "Online"; // Online, Warning, Critical, Offline
        public double CpuUsage { get; set; } // dalam persen
        public double MemoryUsage { get; set; } // dalam persen
        public double DiskUsage { get; set; } // dalam persen
        public double Availability { get; set; } // rata-rata uptime (misal 99.98)
        public int ResponseTimeMs { get; set; } // waktu respon API (ms)

        // Monitoring tambahan
        public bool IsCritical { get; set; } // true kalau status Critical
        public DateTime LastChecked { get; set; } // waktu terakhir monitoring
        public string? AlertLevel { get; set; } // Critical, Warning, Info
        public string? Description { get; set; } // opsional: deskripsi server

        // Relasi ke aplikasi (opsional)
        public Guid? ApplicationId { get; set; }
        public Application? Application { get; set; }
    }
}
    