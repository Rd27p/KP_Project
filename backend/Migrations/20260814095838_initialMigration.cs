using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AppHub2.Migrations
{
    /// <inheritdoc />
    public partial class initialMigration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "CategoriesApp",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    NamaCategory = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CategoriesApp", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "LevelAcces",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    Name = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LevelAcces", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "StatusApp",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    NamaStatus = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_StatusApp", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Applications",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    IdPembuat = table.Column<Guid>(type: "uuid", nullable: false),
                    IdPemilik = table.Column<Guid>(type: "uuid", nullable: false),
                    IdBackupPemilik = table.Column<Guid>(type: "uuid", nullable: false),
                    IdCategory = table.Column<Guid>(type: "uuid", nullable: false),
                    IdStatus = table.Column<Guid>(type: "uuid", nullable: false),
                    NamaAplikasi = table.Column<string>(type: "text", nullable: false),
                    Description = table.Column<string>(type: "text", nullable: true),
                    ApplicationUrl = table.Column<string>(type: "text", nullable: false),
                    DataClassification = table.Column<string>(type: "text", nullable: false),
                    DataSource = table.Column<string>(type: "text", nullable: false),
                    DataRetentionPolicy = table.Column<string>(type: "text", nullable: false),
                    Version = table.Column<string>(type: "text", nullable: false),
                    Database = table.Column<string>(type: "text", nullable: false),
                    TechnologyStack = table.Column<string>(type: "text", nullable: false),
                    server = table.Column<string>(type: "text", nullable: false),
                    LastUpdated = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Applications", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Applications_CategoriesApp_IdCategory",
                        column: x => x.IdCategory,
                        principalTable: "CategoriesApp",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Applications_StatusApp_IdStatus",
                        column: x => x.IdStatus,
                        principalTable: "StatusApp",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Complaints",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    Regional = table.Column<string>(type: "text", nullable: false),
                    IssueType = table.Column<string>(type: "text", nullable: false),
                    ApplicationId = table.Column<Guid>(type: "uuid", nullable: false),
                    CategoryMasalah = table.Column<string>(type: "text", nullable: false),
                    UsernameLDAP = table.Column<string>(type: "text", nullable: false),
                    Role = table.Column<string>(type: "text", nullable: false),
                    Description = table.Column<string>(type: "text", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Complaints", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Complaints_Applications_ApplicationId",
                        column: x => x.ApplicationId,
                        principalTable: "Applications",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Servers",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    ServerName = table.Column<string>(type: "text", nullable: false),
                    IpAddress = table.Column<string>(type: "text", nullable: false),
                    Region = table.Column<string>(type: "text", nullable: false),
                    Status = table.Column<string>(type: "text", nullable: false),
                    CpuUsage = table.Column<double>(type: "double precision", nullable: false),
                    MemoryUsage = table.Column<double>(type: "double precision", nullable: false),
                    DiskUsage = table.Column<double>(type: "double precision", nullable: false),
                    Availability = table.Column<double>(type: "double precision", nullable: false),
                    ResponseTimeMs = table.Column<int>(type: "integer", nullable: false),
                    IsCritical = table.Column<bool>(type: "boolean", nullable: false),
                    LastChecked = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    AlertLevel = table.Column<string>(type: "text", nullable: true),
                    Description = table.Column<string>(type: "text", nullable: true),
                    ApplicationId = table.Column<Guid>(type: "uuid", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Servers", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Servers_Applications_ApplicationId",
                        column: x => x.ApplicationId,
                        principalTable: "Applications",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    IdAccessLevel = table.Column<Guid>(type: "uuid", nullable: true),
                    ApplicationId = table.Column<Guid>(type: "uuid", nullable: true),
                    Username = table.Column<string>(type: "text", nullable: false),
                    NIK = table.Column<string>(type: "text", nullable: false),
                    Nama = table.Column<string>(type: "text", nullable: false),
                    Email = table.Column<string>(type: "text", nullable: false),
                    Password = table.Column<string>(type: "text", nullable: false),
                    Telp = table.Column<string>(type: "text", nullable: false),
                    Department = table.Column<string>(type: "text", nullable: false),
                    alasanPengajuan = table.Column<string>(type: "text", nullable: false),
                    AccessLevelId = table.Column<Guid>(type: "uuid", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Users_Applications_ApplicationId",
                        column: x => x.ApplicationId,
                        principalTable: "Applications",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Users_LevelAcces_AccessLevelId",
                        column: x => x.AccessLevelId,
                        principalTable: "LevelAcces",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_Applications_IdBackupPemilik",
                table: "Applications",
                column: "IdBackupPemilik");

            migrationBuilder.CreateIndex(
                name: "IX_Applications_IdCategory",
                table: "Applications",
                column: "IdCategory");

            migrationBuilder.CreateIndex(
                name: "IX_Applications_IdPembuat",
                table: "Applications",
                column: "IdPembuat");

            migrationBuilder.CreateIndex(
                name: "IX_Applications_IdPemilik",
                table: "Applications",
                column: "IdPemilik");

            migrationBuilder.CreateIndex(
                name: "IX_Applications_IdStatus",
                table: "Applications",
                column: "IdStatus");

            migrationBuilder.CreateIndex(
                name: "IX_Complaints_ApplicationId",
                table: "Complaints",
                column: "ApplicationId");

            migrationBuilder.CreateIndex(
                name: "IX_Servers_ApplicationId",
                table: "Servers",
                column: "ApplicationId");

            migrationBuilder.CreateIndex(
                name: "IX_Users_AccessLevelId",
                table: "Users",
                column: "AccessLevelId");

            migrationBuilder.CreateIndex(
                name: "IX_Users_ApplicationId",
                table: "Users",
                column: "ApplicationId");

            migrationBuilder.CreateIndex(
                name: "IX_Users_Email",
                table: "Users",
                column: "Email",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Applications_Users_IdBackupPemilik",
                table: "Applications",
                column: "IdBackupPemilik",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Applications_Users_IdPembuat",
                table: "Applications",
                column: "IdPembuat",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Applications_Users_IdPemilik",
                table: "Applications",
                column: "IdPemilik",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Applications_CategoriesApp_IdCategory",
                table: "Applications");

            migrationBuilder.DropForeignKey(
                name: "FK_Applications_StatusApp_IdStatus",
                table: "Applications");

            migrationBuilder.DropForeignKey(
                name: "FK_Applications_Users_IdBackupPemilik",
                table: "Applications");

            migrationBuilder.DropForeignKey(
                name: "FK_Applications_Users_IdPembuat",
                table: "Applications");

            migrationBuilder.DropForeignKey(
                name: "FK_Applications_Users_IdPemilik",
                table: "Applications");

            migrationBuilder.DropTable(
                name: "Complaints");

            migrationBuilder.DropTable(
                name: "Servers");

            migrationBuilder.DropTable(
                name: "CategoriesApp");

            migrationBuilder.DropTable(
                name: "StatusApp");

            migrationBuilder.DropTable(
                name: "Users");

            migrationBuilder.DropTable(
                name: "Applications");

            migrationBuilder.DropTable(
                name: "LevelAcces");
        }
    }
}
