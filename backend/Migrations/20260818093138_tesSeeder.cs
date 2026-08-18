using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AppHub2.Migrations
{
    /// <inheritdoc />
    public partial class tesSeeder : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Applications_CategoriesApp_IdCategory",
                table: "Applications");

            migrationBuilder.DropForeignKey(
                name: "FK_Applications_StatusApp_IdStatus",
                table: "Applications");

            migrationBuilder.DropForeignKey(
                name: "FK_Servers_Applications_ApplicationId",
                table: "Servers");

            migrationBuilder.DropForeignKey(
                name: "FK_Users_Applications_ApplicationId",
                table: "Users");

            migrationBuilder.DropTable(
                name: "CategoriesApp");

            migrationBuilder.DropIndex(
                name: "IX_Servers_ApplicationId",
                table: "Servers");

            migrationBuilder.DropIndex(
                name: "IX_Applications_IdCategory",
                table: "Applications");

            migrationBuilder.DropColumn(
                name: "IdAccessLevel",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "IdCategory",
                table: "Applications");

            migrationBuilder.RenameColumn(
                name: "alasanPengajuan",
                table: "Users",
                newName: "AlasanPengajuan");

            migrationBuilder.RenameColumn(
                name: "Name",
                table: "LevelAcces",
                newName: "NamaLevel");

            migrationBuilder.RenameColumn(
                name: "server",
                table: "Applications",
                newName: "Status");

            migrationBuilder.RenameColumn(
                name: "IdStatus",
                table: "Applications",
                newName: "ServerId");

            migrationBuilder.RenameIndex(
                name: "IX_Applications_IdStatus",
                table: "Applications",
                newName: "IX_Applications_ServerId");

            migrationBuilder.AlterColumn<string>(
                name: "Username",
                table: "Users",
                type: "character varying(50)",
                maxLength: 50,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.AlterColumn<string>(
                name: "Password",
                table: "Users",
                type: "character varying(100)",
                maxLength: 100,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.AlterColumn<string>(
                name: "Nama",
                table: "Users",
                type: "character varying(100)",
                maxLength: 100,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.AlterColumn<string>(
                name: "NIK",
                table: "Users",
                type: "character varying(20)",
                maxLength: 20,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.AddColumn<string>(
                name: "levelAccess",
                table: "Users",
                type: "text",
                nullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "ServerName",
                table: "Servers",
                type: "character varying(100)",
                maxLength: 100,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.AlterColumn<string>(
                name: "Regional",
                table: "Complaints",
                type: "character varying(50)",
                maxLength: 50,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.AlterColumn<string>(
                name: "IssueType",
                table: "Complaints",
                type: "character varying(50)",
                maxLength: 50,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.AlterColumn<string>(
                name: "Description",
                table: "Complaints",
                type: "character varying(1000)",
                maxLength: 1000,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.AlterColumn<string>(
                name: "CategoryMasalah",
                table: "Complaints",
                type: "character varying(100)",
                maxLength: 100,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.AlterColumn<string>(
                name: "NamaAplikasi",
                table: "Applications",
                type: "character varying(100)",
                maxLength: 100,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.AlterColumn<string>(
                name: "Description",
                table: "Applications",
                type: "character varying(500)",
                maxLength: 500,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "text",
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Category",
                table: "Applications",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<Guid>(
                name: "ServerId1",
                table: "Applications",
                type: "uuid",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Applications_ServerId1",
                table: "Applications",
                column: "ServerId1");

            migrationBuilder.AddForeignKey(
                name: "FK_Applications_Servers_ServerId",
                table: "Applications",
                column: "ServerId",
                principalTable: "Servers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Applications_Servers_ServerId1",
                table: "Applications",
                column: "ServerId1",
                principalTable: "Servers",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Users_Applications_ApplicationId",
                table: "Users",
                column: "ApplicationId",
                principalTable: "Applications",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Applications_Servers_ServerId",
                table: "Applications");

            migrationBuilder.DropForeignKey(
                name: "FK_Applications_Servers_ServerId1",
                table: "Applications");

            migrationBuilder.DropForeignKey(
                name: "FK_Users_Applications_ApplicationId",
                table: "Users");

            migrationBuilder.DropIndex(
                name: "IX_Applications_ServerId1",
                table: "Applications");

            migrationBuilder.DropColumn(
                name: "levelAccess",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "Category",
                table: "Applications");

            migrationBuilder.DropColumn(
                name: "ServerId1",
                table: "Applications");

            migrationBuilder.RenameColumn(
                name: "AlasanPengajuan",
                table: "Users",
                newName: "alasanPengajuan");

            migrationBuilder.RenameColumn(
                name: "NamaLevel",
                table: "LevelAcces",
                newName: "Name");

            migrationBuilder.RenameColumn(
                name: "Status",
                table: "Applications",
                newName: "server");

            migrationBuilder.RenameColumn(
                name: "ServerId",
                table: "Applications",
                newName: "IdStatus");

            migrationBuilder.RenameIndex(
                name: "IX_Applications_ServerId",
                table: "Applications",
                newName: "IX_Applications_IdStatus");

            migrationBuilder.AlterColumn<string>(
                name: "Username",
                table: "Users",
                type: "text",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "character varying(50)",
                oldMaxLength: 50);

            migrationBuilder.AlterColumn<string>(
                name: "Password",
                table: "Users",
                type: "text",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "character varying(100)",
                oldMaxLength: 100);

            migrationBuilder.AlterColumn<string>(
                name: "Nama",
                table: "Users",
                type: "text",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "character varying(100)",
                oldMaxLength: 100);

            migrationBuilder.AlterColumn<string>(
                name: "NIK",
                table: "Users",
                type: "text",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "character varying(20)",
                oldMaxLength: 20);

            migrationBuilder.AddColumn<Guid>(
                name: "IdAccessLevel",
                table: "Users",
                type: "uuid",
                nullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "ServerName",
                table: "Servers",
                type: "text",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "character varying(100)",
                oldMaxLength: 100);

            migrationBuilder.AlterColumn<string>(
                name: "Regional",
                table: "Complaints",
                type: "text",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "character varying(50)",
                oldMaxLength: 50);

            migrationBuilder.AlterColumn<string>(
                name: "IssueType",
                table: "Complaints",
                type: "text",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "character varying(50)",
                oldMaxLength: 50);

            migrationBuilder.AlterColumn<string>(
                name: "Description",
                table: "Complaints",
                type: "text",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "character varying(1000)",
                oldMaxLength: 1000);

            migrationBuilder.AlterColumn<string>(
                name: "CategoryMasalah",
                table: "Complaints",
                type: "text",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "character varying(100)",
                oldMaxLength: 100);

            migrationBuilder.AlterColumn<string>(
                name: "NamaAplikasi",
                table: "Applications",
                type: "text",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "character varying(100)",
                oldMaxLength: 100);

            migrationBuilder.AlterColumn<string>(
                name: "Description",
                table: "Applications",
                type: "text",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "character varying(500)",
                oldMaxLength: 500,
                oldNullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "IdCategory",
                table: "Applications",
                type: "uuid",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

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

            migrationBuilder.CreateIndex(
                name: "IX_Servers_ApplicationId",
                table: "Servers",
                column: "ApplicationId");

            migrationBuilder.CreateIndex(
                name: "IX_Applications_IdCategory",
                table: "Applications",
                column: "IdCategory");

            migrationBuilder.AddForeignKey(
                name: "FK_Applications_CategoriesApp_IdCategory",
                table: "Applications",
                column: "IdCategory",
                principalTable: "CategoriesApp",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Applications_StatusApp_IdStatus",
                table: "Applications",
                column: "IdStatus",
                principalTable: "StatusApp",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Servers_Applications_ApplicationId",
                table: "Servers",
                column: "ApplicationId",
                principalTable: "Applications",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Users_Applications_ApplicationId",
                table: "Users",
                column: "ApplicationId",
                principalTable: "Applications",
                principalColumn: "Id");
        }
    }
}
