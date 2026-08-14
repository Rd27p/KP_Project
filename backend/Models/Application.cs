namespace backend.Models
{
    public class Application
    {
        public Guid Id { get; set; }
        public Guid IdPembuat { get; set; }
        public Guid IdPemilik { get; set; }
        public Guid IdBackupPemilik { get; set; }
        public Guid IdCategory { get; set; }
        public Guid IdStatus { get; set; }

        public string NamaAplikasi { get; set; }
        public string? Description { get; set; }
        public string ApplicationUrl { get; set; }
        public string DataClassification { get; set; }
        public string DataSource { get; set; }
        public string DataRetentionPolicy { get; set; }
        public string Version { get; set; }
        public string Database { get; set; }
        public string TechnologyStack { get; set; }
        public string server { get; set; }

        public DateTime? LastUpdated { get; set; }
        public DateTime CreatedAt { get; set; }

        // Relasi ke User
        public User Pembuat { get; set; }
        public User Pemilik { get; set; }
        public User BackupPemilik { get; set; }
        

        // Relasi ke Category
        public CategoryApplication Category { get; set; }

        // Relasi ke Status
        public StatusApplication Status { get; set; }


       
    }

}
