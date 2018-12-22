﻿// <auto-generated />
using System;
using FFive.Data.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace FFive.Data.Migrations
{
    [DbContext(typeof(AppDbContext))]
    [Migration("20181222205931_NewDtoChange2")]
    partial class NewDtoChange2
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.1.4-rtm-31024")
                .HasAnnotation("Relational:MaxIdentifierLength", 64);

            modelBuilder.Entity("FFive.Data.Models.AllocationType", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Name")
                        .HasMaxLength(255);

                    b.HasKey("Id");

                    b.ToTable("AllocationTypes");
                });

            modelBuilder.Entity("FFive.Data.Models.Auth.ApplicationUser", b =>
                {
                    b.Property<string>("Id")
                        .ValueGeneratedOnAdd()
                        .HasMaxLength(85);

                    b.Property<int>("AccessFailedCount");

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken();

                    b.Property<string>("Email")
                        .HasMaxLength(256);

                    b.Property<bool>("EmailConfirmed");

                    b.Property<bool>("IsEnabled");

                    b.Property<bool>("IsResourceOwner");

                    b.Property<bool>("LockoutEnabled");

                    b.Property<DateTimeOffset?>("LockoutEnd");

                    b.Property<string>("NormalizedEmail")
                        .HasMaxLength(85);

                    b.Property<string>("NormalizedUserName")
                        .HasMaxLength(85);

                    b.Property<string>("PasswordHash");

                    b.Property<string>("PhoneNumber");

                    b.Property<bool>("PhoneNumberConfirmed");

                    b.Property<Guid>("ResourceId");

                    b.Property<string>("SecurityStamp");

                    b.Property<bool>("TwoFactorEnabled");

                    b.Property<string>("UserName")
                        .HasMaxLength(256);

                    b.HasKey("Id");

                    b.HasIndex("NormalizedEmail")
                        .HasName("EmailIndex");

                    b.HasIndex("NormalizedUserName")
                        .IsUnique()
                        .HasName("UserNameIndex");

                    b.HasIndex("ResourceId");

                    b.ToTable("AspNetUsers");
                });

            modelBuilder.Entity("FFive.Data.Models.Auth.RefreshToken", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime>("CreatedAt");

                    b.Property<DateTime>("ExpiresUtc");

                    b.Property<DateTime>("IssuedUtc");

                    b.Property<string>("Token")
                        .IsRequired();

                    b.Property<DateTime?>("UpdatedAt");

                    b.Property<string>("UserId")
                        .IsRequired();

                    b.HasKey("Id");

                    b.HasAlternateKey("Token")
                        .HasName("refreshToken_Token");


                    b.HasAlternateKey("UserId")
                        .HasName("refreshToken_UserId");

                    b.ToTable("RefreshTokens");
                });

            modelBuilder.Entity("FFive.Data.Models.Calendar", b =>
                {
                    b.Property<DateTime>("MyDate");

                    b.HasKey("MyDate");

                    b.ToTable("Calendar");
                });

            modelBuilder.Entity("FFive.Data.Models.Client", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("City")
                        .HasMaxLength(255);

                    b.Property<Guid>("ClientTypeId");

                    b.Property<DateTime>("CreatedAt");

                    b.Property<Guid>("LocationId");

                    b.Property<string>("Name")
                        .HasMaxLength(255);

                    b.Property<Guid?>("SalesContactId");

                    b.Property<DateTime>("StartDate");

                    b.Property<string>("State")
                        .HasMaxLength(255);

                    b.Property<int>("Status");

                    b.Property<string>("StreetAddress")
                        .HasMaxLength(255);

                    b.Property<DateTime?>("UpdatedAt");

                    b.Property<string>("ZipCode")
                        .HasMaxLength(7);

                    b.HasKey("Id");

                    b.HasIndex("ClientTypeId");

                    b.HasIndex("LocationId");

                    b.HasIndex("SalesContactId");

                    b.ToTable("Clients");
                });

            modelBuilder.Entity("FFive.Data.Models.ClientContact", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("City")
                        .HasMaxLength(255);

                    b.Property<Guid>("ClientId");

                    b.Property<string>("ContactNumber")
                        .HasMaxLength(255);

                    b.Property<DateTime>("CreatedAt");

                    b.Property<string>("Designation")
                        .HasMaxLength(255);

                    b.Property<string>("Email")
                        .HasMaxLength(255);

                    b.Property<string>("FirstName")
                        .HasMaxLength(255);

                    b.Property<bool>("IsPointOfContact");

                    b.Property<string>("LastName")
                        .HasMaxLength(255);

                    b.Property<Guid>("LocationId");

                    b.Property<string>("SkypeId")
                        .HasMaxLength(255);

                    b.Property<string>("State")
                        .HasMaxLength(255);

                    b.Property<string>("StreetAddress")
                        .HasMaxLength(255);

                    b.Property<string>("TimeZone")
                        .HasMaxLength(255);

                    b.Property<string>("Title")
                        .HasMaxLength(20);

                    b.Property<DateTime?>("UpdatedAt");

                    b.Property<string>("ZipCode")
                        .HasMaxLength(7);

                    b.HasKey("Id");

                    b.HasIndex("ClientId");

                    b.ToTable("ClientContacts");
                });

            modelBuilder.Entity("FFive.Data.Models.ClientType", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Name")
                        .HasMaxLength(255);

                    b.HasKey("Id");

                    b.ToTable("ClientTypes");
                });

            modelBuilder.Entity("FFive.Data.Models.Location", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Name")
                        .HasMaxLength(255);

                    b.HasKey("Id");

                    b.ToTable("Locations");
                });

            modelBuilder.Entity("FFive.Data.Models.LocationBillingRole", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("BillingRole")
                        .HasMaxLength(255);

                    b.Property<DateTime>("CreatedAt");

                    b.Property<string>("Currency")
                        .HasMaxLength(10);

                    b.Property<Guid>("LocationId");

                    b.Property<double>("RatePerHour");

                    b.Property<double>("RatePerMonth");

                    b.Property<DateTime?>("UpdatedAt");

                    b.HasKey("Id");

                    b.HasIndex("LocationId");

                    b.ToTable("LocationBillingRoles");
                });

            modelBuilder.Entity("FFive.Data.Models.NotificationTemplate", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime>("CreatedAt");

                    b.Property<string>("EmailBodyTemplate")
                        .HasMaxLength(500);

                    b.Property<string>("EmailSubjectTemplate")
                        .HasMaxLength(500);

                    b.Property<bool>("IsEmailEnabled");

                    b.Property<bool>("IsSMSEnabled");

                    b.Property<bool>("IsWebEnabled");

                    b.Property<string>("Key")
                        .HasMaxLength(200);

                    b.Property<string>("Name")
                        .HasMaxLength(20);

                    b.Property<string>("SMSTemplate")
                        .HasMaxLength(500);

                    b.Property<DateTime?>("UpdatedAt");

                    b.Property<string>("WebTemplate")
                        .HasMaxLength(5000);

                    b.HasKey("Id");

                    b.ToTable("NotificationTemplates");
                });

            modelBuilder.Entity("FFive.Data.Models.Platform", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Name")
                        .HasMaxLength(255);

                    b.HasKey("Id");

                    b.ToTable("Platforms");
                });

            modelBuilder.Entity("FFive.Data.Models.Project", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime?>("ActualEndDate");

                    b.Property<DateTime?>("ActualStartDate");

                    b.Property<Guid>("ClientContactId");

                    b.Property<Guid>("ClientId");

                    b.Property<DateTime>("CreatedAt");

                    b.Property<DateTime?>("EndDate");

                    b.Property<string>("Name")
                        .HasMaxLength(255);

                    b.Property<Guid?>("OperationHeadId");

                    b.Property<string>("Overview")
                        .HasMaxLength(5000);

                    b.Property<Guid?>("ParentProjectId");

                    b.Property<Guid>("PlatformId");

                    b.Property<Guid?>("ProjectHeadId");

                    b.Property<Guid>("ProjectTypeId");

                    b.Property<DateTime?>("StartDate");

                    b.Property<int>("Status");

                    b.Property<Guid>("TechstackId");

                    b.Property<DateTime?>("UpdatedAt");

                    b.HasKey("Id");

                    b.HasIndex("ClientContactId");

                    b.HasIndex("ClientId");

                    b.HasIndex("OperationHeadId");

                    b.HasIndex("ParentProjectId");

                    b.HasIndex("PlatformId");

                    b.HasIndex("ProjectHeadId");

                    b.HasIndex("ProjectTypeId");

                    b.HasIndex("TechstackId");

                    b.ToTable("Projects");
                });

            modelBuilder.Entity("FFive.Data.Models.ProjectLocationBillingRole", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime>("CreatedAt");

                    b.Property<Guid>("LocationBillingRoleId");

                    b.Property<Guid>("ProjectId");

                    b.Property<double>("RatePerHour");

                    b.Property<double>("RatePerMonth");

                    b.Property<DateTime?>("UpdatedAt");

                    b.HasKey("Id");

                    b.HasIndex("LocationBillingRoleId");

                    b.HasIndex("ProjectId");

                    b.ToTable("ProjectLocationBillingRoles");
                });

            modelBuilder.Entity("FFive.Data.Models.ProjectResource", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime>("AllocationEndDate");

                    b.Property<int>("AllocationPercent");

                    b.Property<DateTime>("AllocationStartDate");

                    b.Property<Guid>("AllocationTypeId");

                    b.Property<DateTime>("CreatedAt");

                    b.Property<Guid>("ProjectId");

                    b.Property<Guid>("ProjectLocationBillingRoleId");

                    b.Property<Guid>("ResourceId");

                    b.Property<int>("Status");

                    b.Property<DateTime?>("UpdatedAt");

                    b.HasKey("Id");

                    b.HasIndex("AllocationTypeId");

                    b.HasIndex("ProjectId");

                    b.HasIndex("ProjectLocationBillingRoleId");

                    b.HasIndex("ResourceId");

                    b.ToTable("ProjectResources");
                });

            modelBuilder.Entity("FFive.Data.Models.ProjectTechstack", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime>("CreatedAt");

                    b.Property<Guid>("ProjectId");

                    b.Property<Guid>("TechstackId");

                    b.Property<DateTime?>("UpdatedAt");

                    b.HasKey("Id");

                    b.HasIndex("ProjectId");

                    b.HasIndex("TechstackId");

                    b.ToTable("ProjectTechstacks");
                });

            modelBuilder.Entity("FFive.Data.Models.ProjectType", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Name")
                        .HasMaxLength(255);

                    b.HasKey("Id");

                    b.ToTable("ProjectTypes");
                });

            modelBuilder.Entity("FFive.Data.Models.Resource", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime>("CreatedAt");

                    b.Property<string>("Department")
                        .HasMaxLength(255);

                    b.Property<string>("Designation")
                        .HasMaxLength(255);

                    b.Property<string>("Email");

                    b.Property<string>("EmpCode")
                        .HasMaxLength(10);

                    b.Property<string>("FirstName")
                        .HasMaxLength(255);

                    b.Property<DateTime>("JoiningDate");

                    b.Property<string>("LastName")
                        .HasMaxLength(255);

                    b.Property<Guid?>("ManagerId");

                    b.Property<string>("Phonenumber")
                        .HasMaxLength(50);

                    b.Property<DateTime?>("RelievingDate");

                    b.Property<Guid?>("ResourceOwnerId");

                    b.Property<Guid?>("SkillsetId");

                    b.Property<int>("Status");

                    b.Property<DateTime?>("UpdatedAt");

                    b.Property<string>("VocationPlan")
                        .HasMaxLength(500);

                    b.HasKey("Id");

                    b.HasIndex("ManagerId");

                    b.HasIndex("ResourceOwnerId");

                    b.HasIndex("SkillsetId");

                    b.ToTable("Resources");
                });

            modelBuilder.Entity("FFive.Data.Models.ResourceSpResult", b =>
                {
                    b.Property<Guid>("ResourceId")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("Available100Days");

                    b.Property<string>("Designation");

                    b.Property<string>("ReportingManager");

                    b.Property<string>("ResourceName");

                    b.Property<string>("ResourceOwner");

                    b.Property<string>("Skillset");

                    b.Property<decimal>("TotalAllocationPerc");

                    b.Property<int>("TotalDays");

                    b.HasKey("ResourceId");

                    b.ToTable("ResourceSpResult");
                });

            modelBuilder.Entity("FFive.Data.Models.Skillset", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Name")
                        .HasMaxLength(255);

                    b.HasKey("Id");

                    b.ToTable("Skillsets");
                });

            modelBuilder.Entity("FFive.Data.Models.Techstack", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Name")
                        .HasMaxLength(255);

                    b.HasKey("Id");

                    b.ToTable("Techstacks");
                });

            modelBuilder.Entity("FFive.Data.Models.UserNotification", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime>("CreatedAt");

                    b.Property<string>("Email");

                    b.Property<string>("EmailBody");

                    b.Property<int>("EmailStatus");

                    b.Property<string>("EmailSubject");

                    b.Property<Guid>("NotificationId");

                    b.Property<string>("Phonenumber");

                    b.Property<string>("SmsBody");

                    b.Property<int>("SmsStatus");

                    b.Property<DateTime?>("UpdatedAt");

                    b.Property<string>("UserId");

                    b.Property<string>("WebBody");

                    b.Property<int>("WebStatus");

                    b.HasKey("Id");

                    b.HasIndex("NotificationId");

                    b.HasIndex("UserId");

                    b.ToTable("UserNotifications");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRole", b =>
                {
                    b.Property<string>("Id")
                        .ValueGeneratedOnAdd()
                        .HasMaxLength(85);

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken();

                    b.Property<string>("Name")
                        .HasMaxLength(256);

                    b.Property<string>("NormalizedName")
                        .HasMaxLength(85);

                    b.HasKey("Id");

                    b.HasIndex("NormalizedName")
                        .IsUnique()
                        .HasName("RoleNameIndex");

                    b.ToTable("AspNetRoles");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRoleClaim<string>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasMaxLength(85);

                    b.Property<string>("ClaimType");

                    b.Property<string>("ClaimValue");

                    b.Property<string>("RoleId")
                        .IsRequired()
                        .HasMaxLength(85);

                    b.HasKey("Id");

                    b.HasIndex("RoleId");

                    b.ToTable("AspNetRoleClaims");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserClaim<string>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasMaxLength(85);

                    b.Property<string>("ClaimType");

                    b.Property<string>("ClaimValue");

                    b.Property<string>("UserId")
                        .IsRequired()
                        .HasMaxLength(85);

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("AspNetUserClaims");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserLogin<string>", b =>
                {
                    b.Property<string>("LoginProvider")
                        .HasMaxLength(85);

                    b.Property<string>("ProviderKey")
                        .HasMaxLength(85);

                    b.Property<string>("ProviderDisplayName");

                    b.Property<string>("UserId")
                        .IsRequired()
                        .HasMaxLength(85);

                    b.HasKey("LoginProvider", "ProviderKey");

                    b.HasIndex("UserId");

                    b.ToTable("AspNetUserLogins");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserRole<string>", b =>
                {
                    b.Property<string>("UserId")
                        .HasMaxLength(85);

                    b.Property<string>("RoleId")
                        .HasMaxLength(85);

                    b.HasKey("UserId", "RoleId");

                    b.HasIndex("RoleId");

                    b.ToTable("AspNetUserRoles");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserToken<string>", b =>
                {
                    b.Property<string>("UserId")
                        .HasMaxLength(85);

                    b.Property<string>("LoginProvider")
                        .HasMaxLength(85);

                    b.Property<string>("Name")
                        .HasMaxLength(85);

                    b.Property<string>("Value");

                    b.HasKey("UserId", "LoginProvider", "Name");

                    b.ToTable("AspNetUserTokens");
                });

            modelBuilder.Entity("FFive.Data.Models.Auth.ApplicationUser", b =>
                {
                    b.HasOne("FFive.Data.Models.Resource", "ResourceUser")
                        .WithMany()
                        .HasForeignKey("ResourceId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("FFive.Data.Models.Auth.RefreshToken", b =>
                {
                    b.HasOne("FFive.Data.Models.Auth.ApplicationUser", "User")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("FFive.Data.Models.Client", b =>
                {
                    b.HasOne("FFive.Data.Models.ClientType", "ClientType")
                        .WithMany()
                        .HasForeignKey("ClientTypeId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("FFive.Data.Models.Location", "Location")
                        .WithMany()
                        .HasForeignKey("LocationId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("FFive.Data.Models.Resource", "SalesContact")
                        .WithMany()
                        .HasForeignKey("SalesContactId");
                });

            modelBuilder.Entity("FFive.Data.Models.ClientContact", b =>
                {
                    b.HasOne("FFive.Data.Models.Client", "Client")
                        .WithMany("ClientContacts")
                        .HasForeignKey("ClientId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("FFive.Data.Models.LocationBillingRole", b =>
                {
                    b.HasOne("FFive.Data.Models.Location", "Location")
                        .WithMany()
                        .HasForeignKey("LocationId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("FFive.Data.Models.Project", b =>
                {
                    b.HasOne("FFive.Data.Models.ClientContact", "ClientContact")
                        .WithMany()
                        .HasForeignKey("ClientContactId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("FFive.Data.Models.Client", "Client")
                        .WithMany("Projects")
                        .HasForeignKey("ClientId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("FFive.Data.Models.Resource", "OperationHead")
                        .WithMany()
                        .HasForeignKey("OperationHeadId");

                    b.HasOne("FFive.Data.Models.Project", "ParentProject")
                        .WithMany()
                        .HasForeignKey("ParentProjectId");

                    b.HasOne("FFive.Data.Models.Platform", "Platform")
                        .WithMany()
                        .HasForeignKey("PlatformId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("FFive.Data.Models.Resource", "ProjectHead")
                        .WithMany()
                        .HasForeignKey("ProjectHeadId");

                    b.HasOne("FFive.Data.Models.ProjectType", "ProjectType")
                        .WithMany()
                        .HasForeignKey("ProjectTypeId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("FFive.Data.Models.Techstack", "Techstack")
                        .WithMany()
                        .HasForeignKey("TechstackId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("FFive.Data.Models.ProjectLocationBillingRole", b =>
                {
                    b.HasOne("FFive.Data.Models.LocationBillingRole", "LocationBillingRole")
                        .WithMany()
                        .HasForeignKey("LocationBillingRoleId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("FFive.Data.Models.Project", "Project")
                        .WithMany("ProjectLocationBillingRoles")
                        .HasForeignKey("ProjectId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("FFive.Data.Models.ProjectResource", b =>
                {
                    b.HasOne("FFive.Data.Models.AllocationType", "AllocationType")
                        .WithMany()
                        .HasForeignKey("AllocationTypeId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("FFive.Data.Models.Project", "Project")
                        .WithMany("ProjectResources")
                        .HasForeignKey("ProjectId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("FFive.Data.Models.ProjectLocationBillingRole", "ProjectLocationBillingRole")
                        .WithMany()
                        .HasForeignKey("ProjectLocationBillingRoleId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("FFive.Data.Models.Resource", "Resource")
                        .WithMany("ProjectResources")
                        .HasForeignKey("ResourceId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("FFive.Data.Models.ProjectTechstack", b =>
                {
                    b.HasOne("FFive.Data.Models.Project", "Project")
                        .WithMany()
                        .HasForeignKey("ProjectId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("FFive.Data.Models.Techstack", "Techstack")
                        .WithMany()
                        .HasForeignKey("TechstackId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("FFive.Data.Models.Resource", b =>
                {
                    b.HasOne("FFive.Data.Models.Resource", "Manager")
                        .WithMany("Reportees")
                        .HasForeignKey("ManagerId");

                    b.HasOne("FFive.Data.Models.Resource", "ResourceOwner")
                        .WithMany("Resources")
                        .HasForeignKey("ResourceOwnerId");

                    b.HasOne("FFive.Data.Models.Skillset", "Skillset")
                        .WithMany()
                        .HasForeignKey("SkillsetId");
                });

            modelBuilder.Entity("FFive.Data.Models.UserNotification", b =>
                {
                    b.HasOne("FFive.Data.Models.NotificationTemplate", "NotificationTemplate")
                        .WithMany()
                        .HasForeignKey("NotificationId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("FFive.Data.Models.Auth.ApplicationUser", "User")
                        .WithMany()
                        .HasForeignKey("UserId");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRoleClaim<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityRole")
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserClaim<string>", b =>
                {
                    b.HasOne("FFive.Data.Models.Auth.ApplicationUser")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserLogin<string>", b =>
                {
                    b.HasOne("FFive.Data.Models.Auth.ApplicationUser")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserRole<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityRole")
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("FFive.Data.Models.Auth.ApplicationUser")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserToken<string>", b =>
                {
                    b.HasOne("FFive.Data.Models.Auth.ApplicationUser")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });
#pragma warning restore 612, 618
        }
    }
}
