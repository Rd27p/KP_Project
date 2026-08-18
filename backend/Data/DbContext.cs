using Microsoft.EntityFrameworkCore;
using backend.Models;


public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<Application> Applications { get; set; }
    public DbSet<User> Users { get; set; }
    public DbSet<StatusApplication> StatusApp { get; set; }
    public DbSet<Server> Servers { get; set; }
    public DbSet<Complaint> Complaints { get; set; }
    public DbSet<AccessLevel> LevelAcces { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        // Relasi Application ↔ User (Pembuat, Pemilik, Backup)
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

        // Relasi Application ↔ Status

        modelBuilder.Entity<Application>()
            .HasOne(a => a.Server)
            .WithMany()
            .HasForeignKey(a => a.ServerId)
            .OnDelete(DeleteBehavior.Restrict);

        // Unique Email untuk User
        modelBuilder.Entity<User>()
            .HasIndex(u => u.Email)
            .IsUnique();

        modelBuilder.Entity<User>()
            .HasOne(u => u.Application)
            .WithMany()
            .HasForeignKey(u => u.ApplicationId)
            .OnDelete(DeleteBehavior.Restrict);

        // // ✅ Seeder StatusApplication
        // var statusActiveId = Guid.NewGuid();
        // var statusInactiveId = Guid.NewGuid();
        // var statusPendingId = Guid.NewGuid();

        // modelBuilder.Entity<StatusApplication>().HasData(
        //     new StatusApplication { Id = statusActiveId, NamaStatus = "Active" },
        //     new StatusApplication { Id = statusInactiveId, NamaStatus = "Inactive" },
        //     new StatusApplication { Id = statusPendingId, NamaStatus = "Pending" }
        // );

        // // ✅ AccessLevel
        // var accessAdminId = Guid.NewGuid();
        // var accessRWId = Guid.NewGuid();
        // var accessROId = Guid.NewGuid();

        // modelBuilder.Entity<AccessLevel>().HasData(
        //     new AccessLevel { Id = accessAdminId, NamaLevel = "Admin" },
        //     new AccessLevel { Id = accessRWId, NamaLevel = "Read And Write" },
        //     new AccessLevel { Id = accessROId, NamaLevel = "Read Only" }
        // );

        // // ✅ CategoryApplication
        // var catEngId = Guid.NewGuid();
        // var catFinId = Guid.NewGuid();
        // var catOpsId = Guid.NewGuid();
        // var catSecId = Guid.NewGuid();
        // var catOtherId = Guid.NewGuid();

        // modelBuilder.Entity<CategoryApplication>().HasData(
        //     new CategoryApplication { Id = catEngId, NamaCategory = "Engineering & Deployment" },
        //     new CategoryApplication { Id = catFinId, NamaCategory = "Budgeting & Finance" },
        //     new CategoryApplication { Id = catOpsId, NamaCategory = "Operations" },
        //     new CategoryApplication { Id = catSecId, NamaCategory = "Security" },
        //     new CategoryApplication { Id = catOtherId, NamaCategory = "Others" }
        // );

        // var adminId = Guid.NewGuid();
        // var userId = Guid.NewGuid();

        // _ = modelBuilder.Entity<User>().HasData(
        //     new User
        //     {
        //         Id = adminId,
        //         Username = "admin",
        //         NIK = "1234567890",
        //         Nama = "Administrator",
        //         Email = "admin@example.com",
        //         Password = "admin123", // ⚠️ plain text, nanti ganti hashing
        //         Telp = "08123456789",
        //         Department = "IT",
        //         AlasanPengajuan = "Seeder default admin",
        //         AccessLevel = "Admin", // optional
        //         ApplicationId = null  // optional
        //     },
        //     new User
        //     {
        //         Id = userId,
        //         Username = "user1",
        //         NIK = "9876543210",
        //         Nama = "User Satu",
        //         Email = "user1@example.com",
        //         Password = "user123",
        //         Telp = "08987654321",
        //         Department = "Finance",
        //         AlasanPengajuan = "Seeder default user",
        //         AccessLevel = "Read Only",
        //         ApplicationId = null
        //     }
        // );

        // // ✅ Servers
        // modelBuilder.Entity<Server>().HasData(
        //     new Server
        //     {
        //         Id = Guid.NewGuid(),
        //         ServerName = "Server Jakarta",
        //         IpAddress = "192.168.1.10",
        //         Region = "Sumagabut",
        //         Status = "Online",
        //         CpuUsage = 20,
        //         MemoryUsage = 40,
        //         DiskUsage = 50,
        //         Availability = 99.9,
        //         ResponseTimeMs = 120,
        //         IsCritical = false,
        //         LastChecked = DateTime.UtcNow,
        //         AlertLevel = "Info",
        //         Description = "Main server Jakarta",
        //         ApplicationId = null
        //     }
        // );

        // // ✅ Applications
        // var appId = Guid.NewGuid();
        // modelBuilder.Entity<Application>().HasData(
        //     new Application
        //     {
        //         Id = appId,
        //         NamaAplikasi = "HRIS",
        //         CreatedAt = DateTime.UtcNow,
        //         Category = "Others", // bisa diisi sesuai CategoryApplication
        //         Status = "Active",   // bisa diisi sesuai StatusApplication
        //         IdPemilik = adminId,
        //         IdPembuat = adminId,
        //         IdBackupPemilik = userId
        //     }
        // );

        // ✅ Complaints
        // modelBuilder.Entity<Complaint>().HasData(
        //     new Complaint
        //     {
        //         Id = Guid.NewGuid(),
        //         Regional = "Jakarta",
        //         IssueType = "Bug",
        //         ApplicationId = appId,
        //         Deskripsi = "Tidak bisa login",
        //         CreatedAt = DateTime.UtcNow,
        //         ApplicationId = appId,
        //         UserId = userId
        //     }
        // );
    }

}