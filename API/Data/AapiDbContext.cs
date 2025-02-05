using API.Models;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class AapiDbContext :DbContext
    {
        public AapiDbContext(DbContextOptions<AapiDbContext> options) : base(options)
        {
        }

        public DbSet<Product> products { get; set; }
    }

}
