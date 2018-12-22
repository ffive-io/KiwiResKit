using Microsoft.EntityFrameworkCore.Migrations;

namespace FFive.Data.Migrations
{
    public partial class CreateSPs : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            var sp = @"CREATE PROCEDURE getresourceallocations(managerId varchar(255), allocType int, dateStart DATE, dateEnd DATE,
	        resourceName varchar(255), skillsetId varchar(255), designation varchar(255), pageNo int)
        BEGIN

	        -- allocType=0 any
            -- allocType=1 full available in any day
            -- allocType=2 partial available in any day
            -- allocType=3 not available/fully allocated in all days
	        declare pageSize int;
            declare skipRec int;
            set pageSize = 10;
            set pageNo=if(pageNo=0,1, pageNo);
	        set skipRec = (pageNo-1) * pageSize;

	        if managerId is not null then
		        with recursive r (id, firstname, lastname, designation, skillsetId, resourceownerid, managerid) as (
		          select     id, firstname, lastname, designation, skillsetId, resourceownerid, managerid
		          from       resources
		          where      id = managerId or ManagerId is null
		          union all
		          select     p.id, p.firstname, p.lastname, p.designation, p.skillsetId, p.resourceownerid, p.managerid
		          from       resources p
		          inner join r
				          on p.managerid = r.id
		        )
		        SELECT r.id ResourceId, CONCAT(r.firstName, ' ', r.lastName) ResourceName, r.Designation, s.Name Skillset,
		        CONCAT(ifnull(r1.firstName,''), ' ', ifnull(r1.lastName,'')) ReportingManager,
		        CONCAT(ifnull(r2.firstName,''), ' ', ifnull(r2.lastName,'')) ResourceOwner,
		        (DATEDIFF(dateEnd, dateStart)+1) Totaldays,
			        (DATEDIFF(dateEnd, dateStart)+1) - count(allocationPercent) Available100Days,
			        ifnull(sum(c.allocationPercent),0)/(DATEDIFF(dateEnd, dateStart)+1)  TotalAllocationPerc
			        from r
			        inner join skillsets s on r.skillsetId=s.id
			        left join resources r1 on r.managerid=r1.id
			        left join resources r2 on r.resourceownerid=r2.id
			        left join (
				        select resourceId, c.mydate, sum(allocationPercent)
				        allocationPercent from calendar c left join
					        (
						        select resourceid, projectid, allocationStartDate, allocationEndDate, allocationPercent
						        from projectresources
					        ) p
				        on c.mydate between p.allocationStartDate and p.allocationEndDate
				        where c.mydate>=dateStart and c.mydate <=dateEnd
				        group by resourceId, c.mydate
				        ) c on c.resourceid=r.id
			        -- Conditions
			        where (r.firstName like CONCAT('%', resourceName , '%')  or r.lastName like CONCAT('%', resourceName , '%') or resourceName is null)
			        and (r.skillsetid = skillsetId or skillsetId is null)
			        and (r.designation like CONCAT('%', designation , '%') or designation is null)
			        group by r.id
			        having
				        -- Check partial alloc
				        (ifnull(sum(c.allocationPercent),0)/(DATEDIFF(dateEnd, dateStart)+1) < 100 or allocType = 0 or allocType = 1 or allocType = 3 or allocType is null)
				        and
				        -- Check full available in any day
				        ((DATEDIFF(dateEnd, dateStart)+1) - count(allocationPercent)>0 or allocType = 0 or allocType = 2 or allocType = 3 or allocType is null)
				        and
				        -- Check all fully allocated
				        (ifnull(sum(c.allocationPercent),0)/(DATEDIFF(dateEnd, dateStart)+1)=100 or allocType = 0 or allocType = 1 or allocType = 2 or allocType is null)
			        -- Pagination
			        order by ifnull(sum(c.allocationPercent),0)/(DATEDIFF(dateEnd, dateStart)+1)
			        limit skipRec, pageSize;
		        else
			        SELECT r.id ResourceId, CONCAT(r.firstName, ' ', r.lastName) ResourceName, r.Designation, s.Name Skillset,
			        CONCAT(ifnull(r1.firstName,''), ' ', ifnull(r1.lastName,'')) ReportingManager,
			        CONCAT(ifnull(r2.firstName,''), ' ', ifnull(r2.lastName,'')) ResourceOwner,
			        (DATEDIFF(dateEnd, dateStart)+1) Totaldays,
				        (DATEDIFF(dateEnd, dateStart)+1) - count(allocationPercent) Available100Days,
				        ifnull(sum(c.allocationPercent),0)/(DATEDIFF(dateEnd, dateStart)+1)  TotalAllocationPerc
				        from resources r
				        inner join skillsets s on r.skillsetId=s.id
				        left join resources r1 on r.managerid=r1.id
				        left join resources r2 on r.resourceownerid=r2.id
				        left join (
					        select resourceId, c.mydate, sum(allocationPercent)
					        allocationPercent from calendar c left join
						        (
							        select resourceid, projectid, allocationStartDate, allocationEndDate, allocationPercent
							        from projectresources
						        ) p
					        on c.mydate between p.allocationStartDate and p.allocationEndDate
					        where c.mydate>=dateStart and c.mydate <=dateEnd
					        group by resourceId, c.mydate
					        ) c on c.resourceid=r.id
				        -- Conditions
				        where (r.firstName like CONCAT('%', resourceName , '%')  or r.lastName like CONCAT('%', resourceName , '%') or resourceName is null)
				        and (r.skillsetid = skillsetId or skillsetId is null)
				        and (r.designation like CONCAT('%', designation , '%') or designation is null)
				        group by r.id
				        having
					        -- Check partial alloc
					        (ifnull(sum(c.allocationPercent),0)/(DATEDIFF(dateEnd, dateStart)+1) < 100 or allocType = 0 or allocType = 1 or allocType = 3 or allocType is null)
					        and
					        -- Check full available in any day
					        ((DATEDIFF(dateEnd, dateStart)+1) - count(allocationPercent)>0 or allocType = 0 or allocType = 2 or allocType = 3 or allocType is null)
					        and
					        -- Check all fully allocated
					        (ifnull(sum(c.allocationPercent),0)/(DATEDIFF(dateEnd, dateStart)+1)=100 or allocType = 0 or allocType = 1 or allocType = 2 or allocType is null)
				        -- Pagination
				        order by ifnull(sum(c.allocationPercent),0)/(DATEDIFF(dateEnd, dateStart)+1)
				        limit skipRec, pageSize;

                end if;
            END";
            migrationBuilder.Sql(sp);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            var sp = @"DROP PROCEDURE getresourceallocations";
            migrationBuilder.Sql(sp);
        }
    }
}