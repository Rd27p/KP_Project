using System;
using System.ComponentModel.DataAnnotations;

namespace backend.Models
{
    public class Complaint
    {
        public Guid Id { get; set; }

        [Required(ErrorMessage = "Regional wajib diisi")]
        [StringLength(50, ErrorMessage = "Regional maksimal 50 karakter")]
        public string Regional { get; set; } = string.Empty;

        [Required(ErrorMessage = "Jenis masalah wajib diisi")]
        [StringLength(50)]
        public string IssueType { get; set; } = string.Empty;

        [Required(ErrorMessage = "ApplicationId wajib diisi")]
        public Guid ApplicationId { get; set; }

        [Required(ErrorMessage = "Aplikasi bermasalah wajib diisi")]
        public Application Application { get; set; }

        [Required(ErrorMessage = "Kategori masalah wajib diisi")]
        [StringLength(100)]
        public string CategoryMasalah { get; set; } = string.Empty;

        [Required(ErrorMessage = "UsernameLDAP wajib diisi")]
        public string UsernameLDAP { get; set; } = string.Empty;

        [Required(ErrorMessage = "Role/jabatan wajib diisi")]
        public string Role { get; set; } = string.Empty;

        [Required(ErrorMessage = "Deskripsi masalah wajib diisi")]
        [StringLength(1000, ErrorMessage = "Deskripsi maksimal 1000 karakter")]
        public string Description { get; set; } = string.Empty;

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
