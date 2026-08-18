using System;
using System.ComponentModel.DataAnnotations;

namespace backend.Models
{
    public class Application
    {
        public Guid Id { get; set; }

        [Required(ErrorMessage = "IdPembuat wajib diisi")]
        public Guid IdPembuat { get; set; }

        [Required(ErrorMessage = "IdPemilik wajib diisi")]
        public Guid IdPemilik { get; set; }

        public Guid IdBackupPemilik { get; set; }

        [Required(ErrorMessage = "Kategori wajib diisi")]
        [RegularExpression("Engineering & Deployment|Budgeting & Finance|Operations|Security|Others", ErrorMessage = "Kategori tidak valid")]
        public string Category { get; set; }

        [Required(ErrorMessage = "Status wajib diisi")]
        [RegularExpression("Active|Inactive|Pending", ErrorMessage = "Status tidak valid")]
        public string Status { get; set; }

        [Required(ErrorMessage = "Server wajib diisi")]
        public Guid ServerId { get; set; }

        [Required(ErrorMessage = "Nama aplikasi wajib diisi")]
        [StringLength(100, ErrorMessage = "Nama aplikasi maksimal 100 karakter")]
        public string NamaAplikasi { get; set; }

        [StringLength(500)]
        public string? Description { get; set; }

        [Required(ErrorMessage = "URL aplikasi wajib diisi")]
        [Url(ErrorMessage = "Format URL tidak valid")]
        public string ApplicationUrl { get; set; }

        [Required]
        public string DataClassification { get; set; }

        [Required]
        public string DataSource { get; set; }

        [Required]
        public string DataRetentionPolicy { get; set; }
        
        [Required]
        public string Version { get; set; }
        
        [Required]
        public string Database { get; set; }
       
        [Required]
        public string TechnologyStack { get; set; }
        
        

        public DateTime? LastUpdated { get; set; }
        public DateTime CreatedAt { get; set; }

        // Relasi ke User
        public User Pembuat { get; set; }
        public User Pemilik { get; set; }
        public User BackupPemilik { get; set; }

        // Relasi ke Server
        public Server Server { get; set; }
    }
}
