using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models
{
    [Table("users")]
    public class User
    {
        [Key]
        [Column("id")]
        public int Id { get; set; }

        [Column("username")]
        public string Username { get; set; } = string.Empty;

        [Column("password")]
        public string Password { get; set; } = string.Empty;

        [Column("role")]
        public string Role {  get; set; } = "user";

        [Column("refresh_token")]
        public string RefreshToken { get; set; } = string.Empty;

        [Column("token_created")]
        public DateTime? TokenCreated { get; set; }

        [Column("token_expired")]
        public DateTime? TokenExpired { get; set; }
    }
}