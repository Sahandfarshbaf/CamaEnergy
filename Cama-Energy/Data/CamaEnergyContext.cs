using System;
using Cama_Energy.Configuration;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace Cama_Energy.Data
{
    public class CamaEnergyContext : IdentityDbContext<User>
    {
        public CamaEnergyContext()
        {
        }

        public CamaEnergyContext(DbContextOptions<CamaEnergyContext> options)
            : base(options)
        {
        }

        public virtual DbSet<AboutUs> AboutUs { get; set; }
        public virtual DbSet<Album> Album { get; set; }
        public virtual DbSet<AlbumImage> AlbumImage { get; set; }
        public virtual DbSet<Certificate> Certificate { get; set; }
        public virtual DbSet<Contact> Contact { get; set; }
        public virtual DbSet<Downloads> Downloads { get; set; }
        public virtual DbSet<Employe> Employe { get; set; }
        public virtual DbSet<Menu> Menu { get; set; }
        public virtual DbSet<News> News { get; set; }
        public virtual DbSet<NewsImage> NewsImage { get; set; }
        public virtual DbSet<Products> Products { get; set; }
        public virtual DbSet<ProductsImage> ProductsImage { get; set; }
        public virtual DbSet<Projects> Projects { get; set; }
        public virtual DbSet<ProjectsImage> ProjectsImage { get; set; }
        public virtual DbSet<Services> Services { get; set; }
        public virtual DbSet<ServicesImage> ServicesImage { get; set; }
        public virtual DbSet<Videos> Videos { get; set; }
        public virtual DbSet<Slider> Slider { get; set; }



        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.ApplyConfiguration(new RoleConfiguration());

            modelBuilder.Entity<Slider>(entity =>
            {

                entity.Property(e => e.ImageFile).HasMaxLength(250);

                entity.Property(e => e.SubTitle1).HasMaxLength(250);

                entity.Property(e => e.SubTitle2).HasMaxLength(250);

                entity.Property(e => e.Title).HasMaxLength(250);
            });

            modelBuilder.Entity<AboutUs>(entity =>
            {
                entity.ToTable("AboutUS", "dbo");

                entity.Property(e => e.Id).HasColumnName("ID");
            });

            modelBuilder.Entity<Album>(entity =>
            {
                entity.ToTable("Album", "dbo");

                entity.Property(e => e.Title).HasMaxLength(500);
            });

            modelBuilder.Entity<AlbumImage>(entity =>
            {
                entity.ToTable("AlbumImage", "dbo");

                entity.HasIndex(e => e.AlbumId);

                entity.Property(e => e.Title).HasMaxLength(500);

                entity.HasOne(d => d.Album)
                    .WithMany(p => p.AlbumImage)
                    .HasForeignKey(d => d.AlbumId)
                    .HasConstraintName("FK_AlbumImage_Album");
            });

            modelBuilder.Entity<Contact>(entity =>
            {
                entity.Property(e => e.Id)
                    .HasColumnName("ID")
                    .ValueGeneratedNever();

                entity.Property(e => e.Address).HasMaxLength(500);

                entity.Property(e => e.Email).HasMaxLength(150);

                entity.Property(e => e.Phone1).HasMaxLength(50);

                entity.Property(e => e.Phone2).HasMaxLength(50);

                entity.Property(e => e.Telegram).HasMaxLength(50);

                entity.Property(e => e.WhatsApp).HasMaxLength(50);
            });

            modelBuilder.Entity<Certificate>(entity =>
            {
                entity.ToTable("Certificate", "dbo");

                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.FileImage).HasMaxLength(1024);

                entity.Property(e => e.Title).HasMaxLength(256);
            });

            modelBuilder.Entity<Downloads>(entity =>
            {
                entity.ToTable("Downloads", "dbo");

                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.FileLocation).HasMaxLength(512);

                entity.Property(e => e.Name).HasMaxLength(512);

                entity.Property(e => e.Title).HasMaxLength(1024);
            });

            modelBuilder.Entity<Employe>(entity =>
            {
                entity.ToTable("Employe", "dbo");

                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.Degree).HasMaxLength(256);

                entity.Property(e => e.Description).HasMaxLength(1024);

                entity.Property(e => e.Name).HasMaxLength(256);

                entity.Property(e => e.Skills).HasMaxLength(256);
            });

            modelBuilder.Entity<Menu>(entity =>
            {
                entity.ToTable("Menu", "dbo");

                entity.HasIndex(e => e.Pid);

                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.Name).HasMaxLength(256);

                entity.Property(e => e.Pid).HasColumnName("PID");

                entity.Property(e => e.TableId).HasColumnName("TableID");

                entity.Property(e => e.TableName).HasMaxLength(256);

                entity.Property(e => e.Url)
                    .HasColumnName("URL")
                    .HasMaxLength(256);

                entity.HasOne(d => d.P)
                    .WithMany(p => p.InverseP)
                    .HasForeignKey(d => d.Pid)
                    .HasConstraintName("FK_Menu_Menu");
            });

            modelBuilder.Entity<News>(entity =>
            {
                entity.ToTable("News", "dbo");

                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.Author).HasMaxLength(256);

                entity.Property(e => e.AuthorId)
                    .IsRequired()
                    .HasColumnName("AuthorID")
                    .HasMaxLength(450);

                entity.Property(e => e.Title).HasMaxLength(512);

                entity.Property(e => e.Type).HasComment(@"اخبار روز => 1
2 <= اخبار کاما");
            });

            modelBuilder.Entity<NewsImage>(entity =>
            {
                entity.ToTable("NewsImage", "dbo");

                entity.HasIndex(e => e.NewsId);

                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.FileImage).HasMaxLength(512);

                entity.Property(e => e.NewsId).HasColumnName("NewsID");

                entity.Property(e => e.Title).HasMaxLength(1024);

                entity.HasOne(d => d.News)
                    .WithMany(p => p.NewsImage)
                    .HasForeignKey(d => d.NewsId)
                    .HasConstraintName("FK_NewsImage_News");
            });

            modelBuilder.Entity<Products>(entity =>
            {
                entity.ToTable("Products", "dbo");

                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.Name).HasMaxLength(512);

                entity.Property(e => e.Title).HasMaxLength(1024);
            });

            modelBuilder.Entity<ProductsImage>(entity =>
            {
                entity.ToTable("ProductsImage", "dbo");

                entity.HasIndex(e => e.ProdutcsId);

                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.FileImage).HasMaxLength(512);

                entity.Property(e => e.ProdutcsId).HasColumnName("ProdutcsID");

                entity.Property(e => e.Title).HasMaxLength(1024);

                entity.HasOne(d => d.Produtcs)
                    .WithMany(p => p.ProductsImage)
                    .HasForeignKey(d => d.ProdutcsId)
                    .HasConstraintName("FK_ProductsImage_Products");
            });

            modelBuilder.Entity<Projects>(entity =>
            {
                entity.ToTable("Projects", "dbo");

                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.Brand).HasMaxLength(512);

                entity.Property(e => e.ControlBy).HasMaxLength(1024);

                entity.Property(e => e.Emkanat).HasMaxLength(1024);

                entity.Property(e => e.Karfarma).HasMaxLength(512);

                entity.Property(e => e.ModirAmel).HasMaxLength(512);

                entity.Property(e => e.Owner).HasMaxLength(512);

                entity.Property(e => e.ProjectCategory).HasMaxLength(50);

                entity.Property(e => e.Title).HasMaxLength(512);
            });

            modelBuilder.Entity<ProjectsImage>(entity =>
            {
                entity.ToTable("ProjectsImage", "dbo");

                entity.HasIndex(e => e.ProjectsId);

                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.FileImage).HasMaxLength(512);

                entity.Property(e => e.ProjectsId).HasColumnName("ProjectsID");

                entity.Property(e => e.Title).HasMaxLength(1024);

                entity.HasOne(d => d.Projects)
                    .WithMany(p => p.ProjectsImage)
                    .HasForeignKey(d => d.ProjectsId)
                    .HasConstraintName("FK_ProjectsImage_Projects");
            });

            modelBuilder.Entity<Services>(entity =>
            {
                entity.ToTable("Services", "dbo");

                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.Name).HasMaxLength(512);

                entity.Property(e => e.Title).HasMaxLength(1024);
            });

            modelBuilder.Entity<ServicesImage>(entity =>
            {
                entity.ToTable("ServicesImage", "dbo");

                entity.HasIndex(e => e.ServicesId);

                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.FileImage).HasMaxLength(512);

                entity.Property(e => e.ServicesId).HasColumnName("ServicesID");

                entity.Property(e => e.Title).HasMaxLength(1024);

                entity.HasOne(d => d.Services)
                    .WithMany(p => p.ServicesImage)
                    .HasForeignKey(d => d.ServicesId)
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("FK_ServicesImage_Services1");
            });

            modelBuilder.Entity<Videos>(entity =>
            {
                entity.ToTable("Videos", "dbo");

                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.FileLocation).HasMaxLength(512);

                entity.Property(e => e.Name).HasMaxLength(512);

                entity.Property(e => e.Title).HasMaxLength(1024);
            });

        }


    }
}
