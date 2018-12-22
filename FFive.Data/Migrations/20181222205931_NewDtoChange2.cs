using Microsoft.EntityFrameworkCore.Migrations;

namespace FFive.Data.Migrations
{
    public partial class NewDtoChange2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<decimal>(
                name: "TotalAllocationPerc",
                table: "ResourceSpResult",
                nullable: false,
                oldClrType: typeof(double));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<double>(
                name: "TotalAllocationPerc",
                table: "ResourceSpResult",
                nullable: false,
                oldClrType: typeof(decimal));
        }
    }
}
