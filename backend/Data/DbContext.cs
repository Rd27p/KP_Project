using Microsoft.EntityFrameworkCore;
using backend.Models;


public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }
    public DbSet<Application> Applications { get; set; }
    public DbSet<User> Users { get; set; }
    public DbSet<CategoryApplication> CategoriesApp{ get; set; }

    public DbSet<StatusApplication> StatusApp { get; set; }





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