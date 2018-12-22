using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace FFive.Data.Migrations
{
    public partial class NewDto : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "resourceDtos",
                columns: table => new
                {
                    ResourceId = table.Column<Guid>(nullable: false),
                    ResourceName = table.Column<string>(nullable: true),
                    Designation = table.Column<string>(nullable: true),
                    Skillset = table.Column<string>(nullable: true),
                    ReportingManager = table.Column<string>(nullable: true),
                    ResourceOwner = table.Column<string>(nullable: true),
                    TotalDays = table.Column<int>(nullable: false),
                    Available100Days = table.Column<int>(nullable: false),
                    TotalAllocPercent = table.Column<double>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_resourceDtos", x => x.ResourceId);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "resourceDtos");
        }
    }
}
