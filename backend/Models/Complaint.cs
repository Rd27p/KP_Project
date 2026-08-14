using System;

namespace backend.Models
{
    public class Complaint
    {
        public Guid Id { get; set; }

        // Lokasi/regional
        public string Regional { get; set; } = string.Empty;

        // Jenis masalah (lebih baik pakai IssueType biar konsisten)
        public string IssueType { get; set; } = string.Empty;

        // Relasi ke aplikasi bermasalah
        public Guid ApplicationId { get; set; }
        public Application Application { get; set; }

        // Kategori masalah (misalnya: Infrastruktur, Database, UI, dll)
        public string CategoryMasalah { get; set; } = string.Empty;

        // Identitas user
        public string UsernameLDAP { get; set; } = string.Empty;
        public string Role { get; set; } = string.Empty; // jabatan/posisi

        // Deskripsi masalah
        public string Description { get; set; } = string.Empty;

        // Waktu dibuat
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
