using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AppHub2.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
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
                name: "Users",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    Username = table.Column<string>(type: "text", nullable: false),
                    NIK = table.Column<string>(type: "text", nullable: false),
                    Nama = table.Column<string>(type: "text", nullable: false),
                    Email = table.Column<string>(type: "text", nullable: false),
                    Password = table.Column<string>(type: "text", nullable: false),
                    Telp = table.Column<string>(type: "text", nullable: false),
                    Department = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
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
                    TechnologyStack = table.Column<string>(type: "text", nullable: false)
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
                    table.ForeignKey(
                        name: "FK_Applications_Users_IdBackupPemilik",
                        column: x => x.IdBackupPemilik,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Applications_Users_IdPembuat",
                        column: x => x.IdPembuat,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Applications_Users_IdPemilik",
                        column: x => x.IdPemilik,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
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
                name: "IX_Users_Email",
                table: "Users",
                column: "Email",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Applications");

            migrationBuilder.DropTable(
                name: "CategoriesApp");

            migrationBuilder.DropTable(
                name: "StatusApp");

            migrationBuilder.DropTable(
                name: "Users");
        }
    }
}
