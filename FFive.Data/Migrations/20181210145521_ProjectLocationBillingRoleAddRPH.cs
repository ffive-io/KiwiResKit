using Microsoft.EntityFrameworkCore.Migrations;

namespace FFive.Data.Migrations
{
    public partial class ProjectLocationBillingRoleAddRPH : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Rate",
                table: "ProjectLocationBillingRoles",
                newName: "RatePerMonth");

            migrationBuilder.AddColumn<double>(
                name: "RatePerHour",
                table: "ProjectLocationBillingRoles",
                nullable: false,
                defaultValue: 0.0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "RatePerHour",
                table: "ProjectLocationBillingRoles");

            migrationBuilder.RenameColumn(
                name: "RatePerMonth",
                table: "ProjectLocationBillingRoles",
                newName: "Rate");
        }
    }
}
