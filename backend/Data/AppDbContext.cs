using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Data
{
    public class AppDbContext : DbContext
    {
        private readonly IConfiguration _configuration;

        //public AppDbContext(IConfiguration configuration)
        //{
        //    _configuration = configuration;
        //}

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            base.OnConfiguring(optionsBuilder);
            optionsBuilder.UseNpgsql("Host=rain.db.elephantsql.com;Username=kzpailsy;Password=jxc2hcRI2wIcZHSYLdkBvs5sBN4oOHHK;Database=kzpailsy");
        }

        public DbSet<User> users { get; set; }
    }
}
