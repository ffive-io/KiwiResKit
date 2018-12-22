using Microsoft.EntityFrameworkCore.Migrations;

namespace FFive.Data.Migrations
{
    public partial class NewDtoChange : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_resourceDtos",
                table: "resourceDtos");

            migrationBuilder.RenameTable(
                name: "resourceDtos",
                newName: "ResourceSpResult");

            migrationBuilder.RenameColumn(
                name: "TotalAllocPercent",
                table: "ResourceSpResult",
                newName: "TotalAllocationPerc");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ResourceSpResult",
                table: "ResourceSpResult",
                column: "ResourceId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_ResourceSpResult",
                table: "ResourceSpResult");

            migrationBuilder.RenameTable(
                name: "ResourceSpResult",
                newName: "resourceDtos");

            migrationBuilder.RenameColumn(
                name: "TotalAllocationPerc",
                table: "resourceDtos",
                newName: "TotalAllocPercent");

            migrationBuilder.AddPrimaryKey(
                name: "PK_resourceDtos",
                table: "resourceDtos",
                column: "ResourceId");
        }
    }
}
