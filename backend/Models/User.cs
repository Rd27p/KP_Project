using System;
using System.ComponentModel.DataAnnotations;

namespace backend.Models
{
    public class User
    {
        public Guid Id { get; set; }

        public Guid? ApplicationId { get; set; }

        [Required(ErrorMessage = "Username wajib diisi")]
        [StringLength(50, ErrorMessage = "Username maksimal 50 karakter")]
        public string Username { get; set; }

        [Required(ErrorMessage = "NIK wajib diisi")]
        [StringLength(20)]
        public string NIK { get; set; }

        [Required(ErrorMessage = "Nama wajib diisi")]
        [StringLength(100)]
        public string Nama { get; set; }

        [Required(ErrorMessage = "Email wajib diisi")]
        [EmailAddress(ErrorMessage = "Format email tidak valid")]
        public string Email { get; set; }

        [Required(ErrorMessage = "Password wajib diisi")]
        [StringLength(100, MinimumLength = 6, ErrorMessage = "Password minimal 6 karakter")]
        public string Password { get; set; }

        [RegularExpression("Admin|Read Only|Read And Write", ErrorMessage = "Level akses tidak valid")]
        public string? levelAccess { get; set; }

        [Phone(ErrorMessage = "Format nomor telepon tidak valid")]
        public string Telp { get; set; }

        [Required(ErrorMessage = "Department wajib diisi")]
        public string Department { get; set; }

        [Required(ErrorMessage = "Alasan pengajuan wajib diisi")]
        public string AlasanPengajuan { get; set; }

        // Relasi opsional
        public AccessLevel? AccessLevel { get; set; }
        public Application? Application { get; set; }
    }
}
