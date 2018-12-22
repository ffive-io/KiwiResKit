using FFive.Data;
using FFive.Data.Models;
using FFive.Data.Models.Auth;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace FFive.API.Utils
{
    public class SeedData
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly AppDbContext _appDbContext;

        public SeedData(UserManager<ApplicationUser> userManager, RoleManager<IdentityRole> roleManager, AppDbContext appDbContext)
        {
            _userManager = userManager;
            _roleManager = roleManager;
            _appDbContext = appDbContext;
        }

        public async Task Seed()
        {
            await SeedRolesAndClaims();
            await SeedMasterData();
            await SeedAdmin();
            await Seedcalendar();
            //await SeedOpsHead();
            //await SeedProjHead();
            //await SeedUser25();
            //await SeedUser16();
        }

        private async Task Seedcalendar()
        {
            //MySQL specific check when changing the DB type
            await _appDbContext.Database.ExecuteSqlCommandAsync("CALL filldates('2018-01-01', '2019-12-31')");
        }

        private async Task SeedMasterData()
        {
            if (!_appDbContext.Locations.Any())
            {
                await _appDbContext.Locations.AddRangeAsync(
                    new Location { Name = "india" },
                    new Location { Name = "us" }
                     );
                _appDbContext.SaveChanges();
            }

            if (!_appDbContext.ClientTypes.Any())
            {
                await _appDbContext.ClientTypes.AddRangeAsync(
                    new ClientType { Name = "start-up" },
                    new ClientType { Name = "enterprise" },
                    new ClientType { Name = "kiwitech" }
                     );
                _appDbContext.SaveChanges();
            }

            if (!_appDbContext.Skillsets.Any())
            {
                await _appDbContext.Skillsets.AddRangeAsync(
                    new Skillset { Name = "pm" },
                    new Skillset { Name = "ba" },
                    new Skillset { Name = "html" },
                    new Skillset { Name = ".net" },
                    new Skillset { Name = "javascript" },
                    new Skillset { Name = "management" }
                     );
                _appDbContext.SaveChanges();
            }

            if (!_appDbContext.Platforms.Any())
            {
                await _appDbContext.Platforms.AddRangeAsync(
                    new Platform { Name = "web" },
                    new Platform { Name = "mobile–ios" },
                    new Platform { Name = "mobile–android" },
                    new Platform { Name = "mobile–both" }
                     );
                _appDbContext.SaveChanges();
            }

            if (!_appDbContext.Techstacks.Any())
            {
                await _appDbContext.Techstacks.AddRangeAsync(
                    new Techstack { Name = "ror" },
                    new Techstack { Name = "python" },
                    new Techstack { Name = "java" },
                    new Techstack { Name = ".net" },
                    new Techstack { Name = "php" },
                    new Techstack { Name = "objective-c" },
                    new Techstack { Name = "android" },
                    new Techstack { Name = "swift" },
                    new Techstack { Name = "nodejs" },
                    new Techstack { Name = "angular" },
                    new Techstack { Name = "react" }
                     );
                _appDbContext.SaveChanges();
            }

            if (!_appDbContext.ProjectTypes.Any())
            {
                await _appDbContext.ProjectTypes.AddRangeAsync(
                    new ProjectType { Name = "fixed-cost" },
                    new ProjectType { Name = "team-based" },
                    new ProjectType { Name = "non-billed" },
                    new ProjectType { Name = "internal" }
                     );
                _appDbContext.SaveChanges();
            }

            if (!_appDbContext.LocationBillingRoles.Any())
            {
                var location = _appDbContext.Locations.Where(a => a.Name == "us").FirstOrDefault();

                await _appDbContext.LocationBillingRoles.AddRangeAsync(
                    new LocationBillingRole { Location = location, BillingRole = "pm", RatePerHour = 45.00, RatePerMonth = 45.00 * 20, Currency = "USD" },
                    new LocationBillingRole { Location = location, BillingRole = "qa", RatePerHour = 25.00, RatePerMonth = 25.00 * 20, Currency = "USD" },
                    new LocationBillingRole { Location = location, BillingRole = "dev1", RatePerHour = 50.00, RatePerMonth = 50.00 * 20, Currency = "USD" },
                    new LocationBillingRole { Location = location, BillingRole = "dev2", RatePerHour = 40.00, RatePerMonth = 40.00 * 20, Currency = "USD" }
                     );
                _appDbContext.SaveChanges();
            }

            if (!_appDbContext.AllocationTypes.Any())
            {
                await _appDbContext.AllocationTypes.AddRangeAsync(
                    new AllocationType { Name = "billed" },
                    new AllocationType { Name = "buffer" }
                     );
                _appDbContext.SaveChanges();
            }

            if (!_appDbContext.Resources.Any())
            {
                var skillset = _appDbContext.Skillsets.Where(a => a.Name == "management").FirstOrDefault();
                await _appDbContext.Resources.AddAsync(new Resource { Email = "kannan.k@kiwitech.com", FirstName = "Super", LastName = "Admin", Status = Data.Models.Enums.Status.Active, JoiningDate = Convert.ToDateTime("2010-01-01"), Designation = "CTO", Skillset = skillset });
                //await _appDbContext.Resources.AddAsync(new Resource { Email = "kannan.k.ram@gmail.com", FirstName = "Ops", LastName = "Head", Status = Data.Models.Enums.Status.Active, JoiningDate = Convert.ToDateTime("2010-01-01"), Designation = "CTO", Skillset = skillset });
                //await _appDbContext.Resources.AddAsync(new Resource { Email = "kannan.k@yopmail.com", FirstName = "Dheeraj", LastName = "VP", Status = Data.Models.Enums.Status.Active, JoiningDate = Convert.ToDateTime("2010-01-01"), Designation = "VP", Skillset = skillset });
                //await _appDbContext.Resources.AddAsync(new Resource { Email = "kannan.k.ram@yopmail.com", FirstName = "Proj", LastName = "Head", Status = Data.Models.Enums.Status.Active, JoiningDate = Convert.ToDateTime("2010-01-01"), Designation = "Manager", Skillset = skillset });
                _appDbContext.SaveChanges();
            }
        }

        private async Task SeedRolesAndClaims()
        {
            if (!await _roleManager.RoleExistsAsync(Extensions.AdminRole))
            {
                await _roleManager.CreateAsync(new IdentityRole
                {
                    Name = Extensions.AdminRole
                });
            }

            if (!await _roleManager.RoleExistsAsync(Extensions.UserRole))
            {
                await _roleManager.CreateAsync(new IdentityRole
                {
                    Name = Extensions.UserRole
                });
            }
            if (!await _roleManager.RoleExistsAsync(Extensions.PreSalesRole))
            {
                await _roleManager.CreateAsync(new IdentityRole
                {
                    Name = Extensions.PreSalesRole
                });
            }
            if (!await _roleManager.RoleExistsAsync(Extensions.ProjHeadRole))
            {
                await _roleManager.CreateAsync(new IdentityRole
                {
                    Name = Extensions.ProjHeadRole
                });
            }
            if (!await _roleManager.RoleExistsAsync(Extensions.OpsHeadRole))
            {
                await _roleManager.CreateAsync(new IdentityRole
                {
                    Name = Extensions.OpsHeadRole
                });
            }
            if (!await _roleManager.RoleExistsAsync(Extensions.CxoRole))
            {
                await _roleManager.CreateAsync(new IdentityRole
                {
                    Name = Extensions.CxoRole
                });
            }

            var adminRole = await _roleManager.FindByNameAsync(Extensions.AdminRole);
            var adminRoleClaims = await _roleManager.GetClaimsAsync(adminRole);

            if (!adminRoleClaims.Any(x => x.Type == Extensions.ManageUserClaim))
            {
                await _roleManager.AddClaimAsync(adminRole, new System.Security.Claims.Claim(Extensions.ManageUserClaim, "true"));
            }
            if (!adminRoleClaims.Any(x => x.Type == Extensions.AdminClaim))
            {
                await _roleManager.AddClaimAsync(adminRole, new System.Security.Claims.Claim(Extensions.AdminClaim, "true"));
            }

            var userRole = await _roleManager.FindByNameAsync(Extensions.UserRole);
            var userRoleClaims = await _roleManager.GetClaimsAsync(userRole);
            if (!userRoleClaims.Any(x => x.Type == Extensions.UserClaim))
            {
                await _roleManager.AddClaimAsync(userRole, new System.Security.Claims.Claim(Extensions.UserClaim, "true"));
            }
        }

        private async Task SeedAdmin()
        {
            string email = "kannan.k@kiwitech.com";
            var u = await _userManager.FindByNameAsync(email);
            if (u == null)
            {
                u = new ApplicationUser
                {
                    UserName = email,
                    Email = email,
                    SecurityStamp = Guid.NewGuid().ToString(),
                    IsEnabled = true,
                    ResourceUser = _appDbContext.Resources.Where(a => a.Email == email).FirstOrDefault()
                };
                var x = await _userManager.CreateAsync(u, "Admin1234!");
            }
            var uc = await _userManager.GetClaimsAsync(u);
            if (!uc.Any(x => x.Type == Extensions.AdminClaim))
            {
                await _userManager.AddClaimAsync(u, new System.Security.Claims.Claim(Extensions.AdminClaim, true.ToString()));
            }
            if (!await _userManager.IsInRoleAsync(u, Extensions.AdminRole))
                await _userManager.AddToRoleAsync(u, Extensions.AdminRole);
        }

        private async Task SeedOpsHead()
        {
            string email = "kannan.k.ram@gmail.com";
            var u = await _userManager.FindByNameAsync(email);
            if (u == null)
            {
                u = new ApplicationUser
                {
                    UserName = email,
                    Email = email,
                    SecurityStamp = Guid.NewGuid().ToString(),
                    IsEnabled = true,
                    ResourceUser = _appDbContext.Resources.Where(a => a.Email == email).FirstOrDefault()
                };
                var x = await _userManager.CreateAsync(u, "Admin1234!");
            }
            var uc = await _userManager.GetClaimsAsync(u);
            if (!uc.Any(x => x.Type == Extensions.AdminClaim))
            {
                await _userManager.AddClaimAsync(u, new System.Security.Claims.Claim(Extensions.AdminClaim, true.ToString()));
            }
            if (!await _userManager.IsInRoleAsync(u, Extensions.OpsHeadRole))
                await _userManager.AddToRoleAsync(u, Extensions.OpsHeadRole);
        }

        private async Task SeedProjHead()
        {
            string email = "kannan.k.ram@yopmail.com";
            var u = await _userManager.FindByNameAsync(email);
            if (u == null)
            {
                u = new ApplicationUser
                {
                    UserName = email,
                    Email = email,
                    SecurityStamp = Guid.NewGuid().ToString(),
                    IsEnabled = true,
                    ResourceUser = _appDbContext.Resources.Where(a => a.Email == email).FirstOrDefault()
                };
                var x = await _userManager.CreateAsync(u, "Admin1234!");
            }
            var uc = await _userManager.GetClaimsAsync(u);
            if (!uc.Any(x => x.Type == Extensions.AdminClaim))
            {
                await _userManager.AddClaimAsync(u, new System.Security.Claims.Claim(Extensions.AdminClaim, true.ToString()));
            }
            if (!await _userManager.IsInRoleAsync(u, Extensions.ProjHeadRole))
                await _userManager.AddToRoleAsync(u, Extensions.ProjHeadRole);
        }

        private async Task SeedUser25()
        {
            var u = await _userManager.FindByNameAsync("user25@kookify.com");
            if (u == null)
            {
                u = new ApplicationUser
                {
                    UserName = "user25@kookify.com",
                    Email = "user25@kookify.com",
                    SecurityStamp = Guid.NewGuid().ToString(),
                    IsEnabled = true,
                };
                var x = await _userManager.CreateAsync(u, "Normal1234!");
            }
            var uc = await _userManager.GetClaimsAsync(u);
            if (!uc.Any(x => x.Type == Extensions.UserClaim))
            {
                await _userManager.AddClaimAsync(u, new System.Security.Claims.Claim(Extensions.UserClaim, true.ToString()));
            }
            if (!uc.Any(x => x.Type == Extensions.AgeClaim))
            {
                await _userManager.AddClaimAsync(u, new System.Security.Claims.Claim(Extensions.AgeClaim, "25"));
            }

            if (!await _userManager.IsInRoleAsync(u, Extensions.UserRole))
                await _userManager.AddToRoleAsync(u, Extensions.UserRole);
        }

        private async Task SeedUser16()
        {
            var u = await _userManager.FindByNameAsync("user16@kookify.com");
            if (u == null)
            {
                u = new ApplicationUser
                {
                    UserName = "user16@kookify.com",
                    Email = "user16@kookify.com",
                    SecurityStamp = Guid.NewGuid().ToString(),
                    IsEnabled = true,
                };
                var x = await _userManager.CreateAsync(u, "Normal1234!");
            }
            var uc = await _userManager.GetClaimsAsync(u);
            if (!uc.Any(x => x.Type == Extensions.UserClaim))
            {
                await _userManager.AddClaimAsync(u, new System.Security.Claims.Claim(Extensions.UserClaim, true.ToString()));
            }
            if (!uc.Any(x => x.Type == Extensions.AgeClaim))
            {
                await _userManager.AddClaimAsync(u, new System.Security.Claims.Claim(Extensions.AgeClaim, "16"));
            }

            if (!await _userManager.IsInRoleAsync(u, Extensions.UserRole))
                await _userManager.AddToRoleAsync(u, Extensions.UserRole);
        }
    }
}