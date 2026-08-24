using Microsoft.EntityFrameworkCore;
using backend.Models;


public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<Application> Applications { get; set; }
    public DbSet<User> Users { get; set; }
    public DbSet<Server> Servers { get; set; }
    public DbSet<Complaint> Complaints { get; set; }
    
    public DbSet<UserApplicationAccess> UserApplicationAccesses { get; set; }

protected override void OnModelCreating(ModelBuilder modelBuilder)
{
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<UserApplicationAccess>(entity =>
        {
            // Satu user tidak boleh mendapat akses ke aplikasi yang sama dua kali
            entity.HasKey(access => new
            {
                access.UserId,
                access.ApplicationId
            });

            entity.HasOne(access => access.User)
                .WithMany(user => user.ApplicationAccesses)
                .HasForeignKey(access => access.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            entity.HasOne(access => access.Application)
                .WithMany(application => application.UserAccesses)
                .HasForeignKey(access => access.ApplicationId)
                .OnDelete(DeleteBehavior.Cascade);

            entity.Property(access => access.AccessLevel)
                .IsRequired()
                .HasMaxLength(50);
        });
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


        modelBuilder.Entity<Application>()
            .HasOne(a => a.Server)
            .WithMany(s => s.Applications)
            .HasForeignKey(a => a.ServerId)
            .OnDelete(DeleteBehavior.Restrict);

        // Unique Email untuk User
        modelBuilder.Entity<User>()
            .HasIndex(u => u.Email)
            .IsUnique();

        modelBuilder.Entity<User>()
            .HasOne(u => u.Application)
            .WithMany(a => a.Users)
            .HasForeignKey(u => u.ApplicationId)
            .OnDelete(DeleteBehavior.Restrict);

    

    // ======================================================
    //                  DUMMY DATA
    //
    // 5 Users
    // 3 Servers
    // 10 Applications
    // ======================================================



    // ======================================================
    // IDS
    // ======================================================


    // =========================
    // USER IDS
    // =========================

    var adminId = Guid.Parse(
        "10000000-0000-0000-0000-000000000001"
    );

    var budiId = Guid.Parse(
        "10000000-0000-0000-0000-000000000002"
    );

    var sitiId = Guid.Parse(
        "10000000-0000-0000-0000-000000000003"
    );

    var andikaId = Guid.Parse(
        "10000000-0000-0000-0000-000000000004"
    );

    var rinaId = Guid.Parse(
        "10000000-0000-0000-0000-000000000005"
    );


    // =========================
    // SERVER IDS
    // =========================

    var serverJakartaId = Guid.Parse(
        "30000000-0000-0000-0000-000000000001"
    );

    var serverFinanceId = Guid.Parse(
        "30000000-0000-0000-0000-000000000002"
    );

    var serverSecurityId = Guid.Parse(
        "30000000-0000-0000-0000-000000000003"
    );


    // =========================
    // APPLICATION IDS
    // =========================

    var appCatalogId = Guid.Parse(
        "20000000-0000-0000-0000-000000000001"
    );

    var financeId = Guid.Parse(
        "20000000-0000-0000-0000-000000000002"
    );

    var networkId = Guid.Parse(
        "20000000-0000-0000-0000-000000000003"
    );

    var securityId = Guid.Parse(
        "20000000-0000-0000-0000-000000000004"
    );

    var deploymentId = Guid.Parse(
        "20000000-0000-0000-0000-000000000005"
    );

    var inventoryId = Guid.Parse(
        "20000000-0000-0000-0000-000000000006"
    );

    var budgetId = Guid.Parse(
        "20000000-0000-0000-0000-000000000007"
    );

    var employeePortalId = Guid.Parse(
        "20000000-0000-0000-0000-000000000008"
    );

    var apiGatewayId = Guid.Parse(
        "20000000-0000-0000-0000-000000000009"
    );

    var logManagementId = Guid.Parse(
        "20000000-0000-0000-0000-000000000010"
    );



    // ======================================================
    // 1. ADMIN
    // ======================================================
    //
    // Admin dibuat terlebih dahulu karena Application
    // membutuhkan IdPembuat / Pemilik.
    //
    // Admin tidak dibatasi ke Application tertentu.
    // ======================================================

    modelBuilder.Entity<User>().HasData(
        new User
        {
            Id = adminId,

            ApplicationId = null,

            Username = "admin",
            NIK = "1234567890",
            Nama = "Administrator",

            Email = "admin@example.com",
            Password = "admin123",

            LevelAccess = "Admin",

            Telp = "081234567890",
            Department = "Others",

            AlasanPengajuan =
                "Administrator aplikasi monitoring internal"
        }
    );



    // ======================================================
    // 2. SERVERS
    // ======================================================

    modelBuilder.Entity<Server>().HasData(

        // --------------------------------------------------
        // SERVER 1
        // Kondisi normal
        // --------------------------------------------------

        new Server
        {
            Id = serverJakartaId,

            ServerName = "Production Server Jakarta",
            IpAddress = "192.168.1.10",
            Region = "Jakarta",

            Status = "Online",

            CpuUsage = 32,
            MemoryUsage = 48,
            DiskUsage = 55,

            Availability = 99.9,
            ResponseTimeMs = 85,

            IsCritical = false,

            LastChecked = new DateTime(
                2026,
                8,
                20,
                8,
                0,
                0,
                DateTimeKind.Utc
            ),

            AlertLevel = "Info",

            Description =
                "Main production server untuk aplikasi internal"
        },


        // --------------------------------------------------
        // SERVER 2
        // Kondisi Warning
        // --------------------------------------------------

        new Server
        {
            Id = serverFinanceId,

            ServerName = "Finance & Operation Server",
            IpAddress = "192.168.1.20",
            Region = "Jakarta",

            Status = "Warning",

            CpuUsage = 72,
            MemoryUsage = 78,
            DiskUsage = 68,

            Availability = 98.7,
            ResponseTimeMs = 230,

            IsCritical = false,

            LastChecked = new DateTime(
                2026,
                8,
                20,
                8,
                0,
                0,
                DateTimeKind.Utc
            ),

            AlertLevel = "Warning",

            Description =
                "Server untuk aplikasi finance dan operation"
        },


        // --------------------------------------------------
        // SERVER 3
        // Kondisi Critical
        // --------------------------------------------------

        new Server
        {
            Id = serverSecurityId,

            ServerName = "Security & Network Server",
            IpAddress = "192.168.1.30",
            Region = "Surabaya",

            Status = "Critical",

            CpuUsage = 94,
            MemoryUsage = 91,
            DiskUsage = 84,

            Availability = 94.5,
            ResponseTimeMs = 760,

            IsCritical = true,

            LastChecked = new DateTime(
                2026,
                8,
                20,
                8,
                0,
                0,
                DateTimeKind.Utc
            ),

            AlertLevel = "Critical",

            Description =
                "Server network dan security dengan resource tinggi"
        }
    );



    // ======================================================
    // 3. APPLICATIONS
    // ======================================================
    //
    // Semua application dibuat oleh Admin.
    //
    // Untuk dummy awal Pemilik dan BackupPemilik juga
    // menggunakan admin agar tidak terjadi circular FK
    // antara User.ApplicationId dan Application.IdPemilik.
    // ======================================================

    modelBuilder.Entity<Application>().HasData(


        // ==================================================
        // APP 1 - APP CATALOG
        // SERVER JAKARTA
        // ==================================================

        new Application
        {
            Id = appCatalogId,

            ServerId = serverJakartaId,

            NamaAplikasi = "App Catalog SSO",

            Description =
                "Portal katalog dan akses aplikasi internal perusahaan.",

            ApplicationUrl =
                "https://appcatalog.internal",

            Category = "Operations",
            Status = "Active",

            DataClassification = "Internal",
            DataSource = "Internal Application Database",
            DataRetentionPolicy = "5 Years",

            Version = "2.5.0",
            Database = "PostgreSQL",

            TechnologyStack =
                ".NET, React, PostgreSQL",

            IdPembuat = adminId,
            IdPemilik = adminId,
            IdBackupPemilik = adminId,

            CreatedAt = new DateTime(
                2026,
                1,
                10,
                0,
                0,
                0,
                DateTimeKind.Utc
            ),

            LastUpdated = new DateTime(
                2026,
                8,
                1,
                0,
                0,
                0,
                DateTimeKind.Utc
            )
        },


        // ==================================================
        // APP 2 - FINANCE
        // SERVER FINANCE
        // ==================================================

        new Application
        {
            Id = financeId,

            ServerId = serverFinanceId,

            NamaAplikasi = "Finance Management System",

            Description =
                "Aplikasi internal untuk pengelolaan keuangan dan budgeting.",

            ApplicationUrl =
                "https://finance.internal",

            Category = "Budgeting & Finance",
            Status = "Active",

            DataClassification = "Confidential",
            DataSource = "Finance Database",
            DataRetentionPolicy = "7 Years",

            Version = "3.2.1",
            Database = "PostgreSQL",

            TechnologyStack =
                ".NET, Angular, PostgreSQL",

            IdPembuat = adminId,
            IdPemilik = adminId,
            IdBackupPemilik = adminId,

            CreatedAt = new DateTime(
                2026,
                1,
                15,
                0,
                0,
                0,
                DateTimeKind.Utc
            ),

            LastUpdated = new DateTime(
                2026,
                7,
                28,
                0,
                0,
                0,
                DateTimeKind.Utc
            )
        },


        // ==================================================
        // APP 3 - NETWORK MONITORING
        // SERVER SECURITY
        // ==================================================

        new Application
        {
            Id = networkId,

            ServerId = serverSecurityId,

            NamaAplikasi = "Network Monitoring",

            Description =
                "Monitoring kondisi jaringan dan layanan internal.",

            ApplicationUrl =
                "https://network-monitor.internal",

            Category = "Operations",
            Status = "Active",

            DataClassification = "Internal",
            DataSource = "Network Monitoring API",
            DataRetentionPolicy = "1 Year",

            Version = "4.1.0",
            Database = "PostgreSQL",

            TechnologyStack =
                ".NET, React, Prometheus",

            IdPembuat = adminId,
            IdPemilik = adminId,
            IdBackupPemilik = adminId,

            CreatedAt = new DateTime(
                2026,
                2,
                1,
                0,
                0,
                0,
                DateTimeKind.Utc
            ),

            LastUpdated = new DateTime(
                2026,
                8,
                10,
                0,
                0,
                0,
                DateTimeKind.Utc
            )
        },


        // ==================================================
        // APP 4 - SECURITY DASHBOARD
        // SERVER SECURITY
        // ==================================================

        new Application
        {
            Id = securityId,

            ServerId = serverSecurityId,

            NamaAplikasi = "Security Dashboard",

            Description =
                "Dashboard monitoring event dan security internal.",

            ApplicationUrl =
                "https://security.internal",

            Category = "Security",
            Status = "Active",

            DataClassification = "Restricted",
            DataSource = "Security Event Logs",
            DataRetentionPolicy = "3 Years",

            Version = "2.8.0",
            Database = "PostgreSQL",

            TechnologyStack =
                ".NET, React, Elasticsearch",

            IdPembuat = adminId,
            IdPemilik = adminId,
            IdBackupPemilik = adminId,

            CreatedAt = new DateTime(
                2026,
                2,
                10,
                0,
                0,
                0,
                DateTimeKind.Utc
            ),

            LastUpdated = new DateTime(
                2026,
                8,
                15,
                0,
                0,
                0,
                DateTimeKind.Utc
            )
        },


        // ==================================================
        // APP 5 - DEPLOYMENT MANAGER
        // SERVER JAKARTA
        // ==================================================

        new Application
        {
            Id = deploymentId,

            ServerId = serverJakartaId,

            NamaAplikasi = "Deployment Manager",

            Description =
                "Aplikasi internal untuk pengelolaan deployment.",

            ApplicationUrl =
                "https://deployment.internal",

            Category = "Engineering & Deployment",
            Status = "Active",

            DataClassification = "Internal",
            DataSource = "CI/CD Platform",
            DataRetentionPolicy = "1 Year",

            Version = "1.9.4",
            Database = "PostgreSQL",

            TechnologyStack =
                ".NET, Vue, PostgreSQL",

            IdPembuat = adminId,
            IdPemilik = adminId,
            IdBackupPemilik = adminId,

            CreatedAt = new DateTime(
                2026,
                3,
                1,
                0,
                0,
                0,
                DateTimeKind.Utc
            ),

            LastUpdated = new DateTime(
                2026,
                7,
                21,
                0,
                0,
                0,
                DateTimeKind.Utc
            )
        },


        // ==================================================
        // APP 6 - INVENTORY
        // SERVER FINANCE
        // ==================================================

        new Application
        {
            Id = inventoryId,

            ServerId = serverFinanceId,

            NamaAplikasi = "Inventory System",

            Description =
                "Aplikasi pengelolaan inventory internal.",

            ApplicationUrl =
                "https://inventory.internal",

            Category = "Operations",
            Status = "Inactive",

            DataClassification = "Internal",
            DataSource = "Inventory Database",
            DataRetentionPolicy = "3 Years",

            Version = "1.4.2",
            Database = "MySQL",

            TechnologyStack =
                "Laravel, MySQL, Bootstrap",

            IdPembuat = adminId,
            IdPemilik = adminId,
            IdBackupPemilik = adminId,

            CreatedAt = new DateTime(
                2026,
                3,
                10,
                0,
                0,
                0,
                DateTimeKind.Utc
            ),

            LastUpdated = new DateTime(
                2026,
                6,
                20,
                0,
                0,
                0,
                DateTimeKind.Utc
            )
        },


        // ==================================================
        // APP 7 - BUDGET PLANNING
        // SERVER FINANCE
        // ==================================================

        new Application
        {
            Id = budgetId,

            ServerId = serverFinanceId,

            NamaAplikasi = "Budget Planning",

            Description =
                "Perencanaan dan monitoring budget internal.",

            ApplicationUrl =
                "https://budget.internal",

            Category = "Budgeting & Finance",
            Status = "Pending",

            DataClassification = "Confidential",
            DataSource = "Finance Database",
            DataRetentionPolicy = "7 Years",

            Version = "1.0.0",
            Database = "PostgreSQL",

            TechnologyStack =
                ".NET, React, PostgreSQL",

            IdPembuat = adminId,
            IdPemilik = adminId,
            IdBackupPemilik = adminId,

            CreatedAt = new DateTime(
                2026,
                4,
                1,
                0,
                0,
                0,
                DateTimeKind.Utc
            ),

            LastUpdated = null
        },


        // ==================================================
        // APP 8 - EMPLOYEE PORTAL
        // SERVER JAKARTA
        // ==================================================

        new Application
        {
            Id = employeePortalId,

            ServerId = serverJakartaId,

            NamaAplikasi = "Employee Portal",

            Description =
                "Portal layanan internal untuk employee.",

            ApplicationUrl =
                "https://employee.internal",

            Category = "Others",
            Status = "Active",

            DataClassification = "Internal",
            DataSource = "Employee Database",
            DataRetentionPolicy = "5 Years",

            Version = "3.0.5",
            Database = "PostgreSQL",

            TechnologyStack =
                ".NET, React, PostgreSQL",

            IdPembuat = adminId,
            IdPemilik = adminId,
            IdBackupPemilik = adminId,

            CreatedAt = new DateTime(
                2026,
                4,
                12,
                0,
                0,
                0,
                DateTimeKind.Utc
            ),

            LastUpdated = new DateTime(
                2026,
                8,
                5,
                0,
                0,
                0,
                DateTimeKind.Utc
            )
        },


        // ==================================================
        // APP 9 - API GATEWAY
        // SERVER JAKARTA
        // ==================================================

        new Application
        {
            Id = apiGatewayId,

            ServerId = serverJakartaId,

            NamaAplikasi = "API Gateway",

            Description =
                "Gateway untuk integrasi berbagai API internal.",

            ApplicationUrl =
                "https://gateway.internal",

            Category = "Engineering & Deployment",
            Status = "Active",

            DataClassification = "Internal",
            DataSource = "Internal APIs",
            DataRetentionPolicy = "1 Year",

            Version = "5.3.0",
            Database = "PostgreSQL",

            TechnologyStack =
                ".NET, Redis, PostgreSQL",

            IdPembuat = adminId,
            IdPemilik = adminId,
            IdBackupPemilik = adminId,

            CreatedAt = new DateTime(
                2026,
                5,
                1,
                0,
                0,
                0,
                DateTimeKind.Utc
            ),

            LastUpdated = new DateTime(
                2026,
                8,
                12,
                0,
                0,
                0,
                DateTimeKind.Utc
            )
        },


        // ==================================================
        // APP 10 - LOG MANAGEMENT
        // SERVER SECURITY
        // ==================================================

        new Application
        {
            Id = logManagementId,

            ServerId = serverSecurityId,

            NamaAplikasi = "Log Management",

            Description =
                "Centralized log management untuk aplikasi internal.",

            ApplicationUrl =
                "https://logs.internal",

            Category = "Security",
            Status = "Pending",

            DataClassification = "Restricted",
            DataSource = "Application Logs",
            DataRetentionPolicy = "2 Years",

            Version = "1.1.0",
            Database = "Elasticsearch",

            TechnologyStack =
                ".NET, Elasticsearch, Kibana",

            IdPembuat = adminId,
            IdPemilik = adminId,
            IdBackupPemilik = adminId,

            CreatedAt = new DateTime(
                2026,
                5,
                20,
                0,
                0,
                0,
                DateTimeKind.Utc
            ),

            LastUpdated = null
        }
    );



    // ======================================================
    // 4. USER BIASA
    // ======================================================
    //
    // Dibuat setelah application.
    //
    // Setiap akun hanya diberi akses ke SATU application.
    // ======================================================

    modelBuilder.Entity<User>().HasData(

        // --------------------------------------------------
        // BUDI -> FINANCE
        // --------------------------------------------------

        new User
        {
            Id = budiId,

            ApplicationId = financeId,

            Username = "budi",
            NIK = "1234567891",
            Nama = "Budi Santoso",

            Email = "budi@example.com",
            Password = "user123",

            LevelAccess = "Read Only",

            Telp = "081234567891",
            Department = "Budgeting & Finance",

            AlasanPengajuan =
                "Akses monitoring Finance Management System"
        },


        // --------------------------------------------------
        // SITI -> APP CATALOG
        // --------------------------------------------------

        new User
        {
            Id = sitiId,

            ApplicationId = appCatalogId,

            Username = "siti",
            NIK = "1234567892",
            Nama = "Siti Rahma",

            Email = "siti@example.com",
            Password = "user123",

            LevelAccess = "Read And Write",

            Telp = "081234567892",
            Department = "Operations",

            AlasanPengajuan =
                "Akses pengelolaan App Catalog SSO"
        },


        // --------------------------------------------------
        // ANDIKA -> NETWORK MONITORING
        // --------------------------------------------------

        new User
        {
            Id = andikaId,

            ApplicationId = networkId,

            Username = "andika",
            NIK = "1234567893",
            Nama = "Andika Putra",

            Email = "andika@example.com",
            Password = "user123",

            LevelAccess = "Read And Write",

            Telp = "081234567893",
            Department = "Operations",

            AlasanPengajuan =
                "Akses monitoring Network Monitoring"
        },


        // --------------------------------------------------
        // RINA -> SECURITY DASHBOARD
        // --------------------------------------------------

        new User
        {
            Id = rinaId,

            ApplicationId = securityId,

            Username = "rina",
            NIK = "1234567894",
            Nama = "Rina Wijaya",

            Email = "rina@example.com",
            Password = "user123",

            LevelAccess = "Read Only",

            Telp = "081234567894",
            Department = "Security",

            AlasanPengajuan =
                "Akses monitoring Security Dashboard"
        }
    );
}

}