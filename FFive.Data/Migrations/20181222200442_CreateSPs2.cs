using Microsoft.EntityFrameworkCore.Migrations;

namespace FFive.Data.Migrations
{
    public partial class CreateSPs2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            var sp = @"CREATE PROCEDURE filldates(dateStart DATE, dateEnd DATE)
                    BEGIN
                        DECLARE adate date;
                            WHILE dateStart <= dateEnd DO
                                SET adate = (SELECT MyDate FROM calendar WHERE MyDate = dateStart);
                                IF adate IS NULL THEN
				                    BEGIN
					                    INSERT INTO calendar (MyDate) VALUES (dateStart);
				                    END;
                                END IF;
                                SET dateStart = date_add(dateStart, INTERVAL 1 DAY);
                            END WHILE;
                    END";
            migrationBuilder.Sql(sp);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            var sp = @"DROP PROCEDURE filldates";
            migrationBuilder.Sql(sp);
        }
    }
}