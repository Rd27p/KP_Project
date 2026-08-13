using Microsoft.EntityFrameworkCore;


public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }
    public DbSet<Application> Applications { get; set; }
    public DbSet<User> Users { get; set; }
    public DbSet<CategoryApplication> CategoriesApp{ get; set; }

    public DbSet<StatusApplication> StatusApp { get; set; }




    public class LoginRequest
    {
        public string Username { get; set; }
        public string Password { get; set; }
    }

    public class User
    {
        public Guid Id { get; set; }
        public string Username { get; set; }
        public string NIK { get; set; }
        public string Nama { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string Telp { get; set; }

        public string Department { get; set; }

    }


    public class CategoryApplication
    {
        public Guid Id { get; set; }
        public string NamaCategory { get; set; }

        // Relasi ke Applications
        public ICollection<Application> Applications { get; set; }
    }

    public class StatusApplication
    {
        public Guid Id { get; set; }
        public string NamaStatus { get; set; }

        public ICollection<Application> Applications { get; set; }
    }

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

        // Relasi ke User
        public User Pembuat { get; set; }
        public User Pemilik { get; set; }
        public User BackupPemilik { get; set; }

        // Relasi ke Category
        public CategoryApplication Category { get; set; }

        // Relasi ke Status
        public StatusApplication Status { get; set; }
    }


    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Application>()
            .HasOne(a => a.Category)
            .WithMany(c => c.Applications)
            .HasForeignKey(a => a.IdCategory);

        modelBuilder.Entity<Application>()
            .HasOne(a => a.Pembuat)
            .WithMany()
            .HasForeignKey(a => a.IdPembuat)
            .OnDelete(DeleteBehavior.Restrict);

        modelBuilder.Entity<Application>()
            .HasOne(a => a.Pemilik)
            .WithMany()
            .HasForeignKey(a => a.IdPemilik)
            .OnDelete(DeleteBehavior.Restrict);

        modelBuilder.Entity<Application>()
            .HasOne(a => a.BackupPemilik)
            .WithMany()
            .HasForeignKey(a => a.IdBackupPemilik)
            .OnDelete(DeleteBehavior.Restrict);


        modelBuilder.Entity<Application>()
            .HasOne(a => a.Status)
            .WithMany(s => s.Applications)
            .HasForeignKey(a => a.IdStatus);

        modelBuilder.Entity<User>()
            .HasIndex(u => u.Email)
            .IsUnique();


    }
}