using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using backend.Dto;
using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using System.Xml.Schema;
using System.Security.Cryptography;
using backend.Services;
using backend.Data;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        public static User user = new User();
        private readonly IConfiguration _configuration;
        private readonly IUserService _userService;

        public AuthController(IConfiguration configuration, IUserService userService)
        {
            _configuration = configuration;
            _userService = userService;
        }

        [HttpPost("register")]
        public ActionResult<User> Register(UserDto request)
        {
            string passwordHash = BCrypt.Net.BCrypt.HashPassword(request.Password);

            using var context = new AppDbContext();

            var user = (from u in context.users
                         where u.Username == request.Username
                         select u).FirstOrDefault();

            if(user != null)
            {
                return BadRequest("Exists user");
            }

            var newUser = new User
            {
                Username = request.Username,
                Password = passwordHash
            };
            string token = CreateToken(newUser);
            newUser.RefreshToken = token;

            context.Add(newUser);
            context.SaveChanges();


            return Ok(newUser);
        }

        [HttpPost("login")]
        public ActionResult<User> Login(UserDto request)
        {
            using var context = new AppDbContext();

            var user = (from u in context.users
                        where u.Username == request.Username
                        select u).FirstOrDefault();

            if(user == null )
            {
                return BadRequest("User not found.");

            }

            if (!BCrypt.Net.BCrypt.Verify(request.Password, user.Password))
            {
                return BadRequest("Wrong password.");
            }

            string token = CreateToken(user);
            var refreshToken = GenerateRefreshToken();
            SetRefreshToken(refreshToken);

            return Ok(user);
        }

        [HttpPost("refresh")]
        public async Task<ActionResult<string>> RefreshToken()
        {
            var refreshToken = Request.Cookies["refreshToken"];

            if(!user.RefreshToken.Equals(refreshToken))
            {
                return Unauthorized("Invalid refresh token");
            }
            else if (user.TokenExpired < DateTime.Now)
            {
                return Unauthorized("Token expired");
            }

            string token = CreateToken(user);
            var newRefreshToken = GenerateRefreshToken();

            SetRefreshToken(newRefreshToken);

            return Ok(token);
        }


        [HttpPut("profile"), Authorize]
        public ActionResult<User> Update(UserDto request)
        {
            using var context = new AppDbContext();

            var user = (from u in context.users
                        where u.Id == request.Id
                        select u).FirstOrDefault();

            if (user != null)
            {
                user.Username = request.Username;
                string passwordHash = BCrypt.Net.BCrypt.HashPassword(request.Password);
                user.Password = passwordHash;
            }

            context.SaveChanges();

            return Ok(user);
        }



        private RefreshToken GenerateRefreshToken()
        {
            var refreshToken = new RefreshToken
            {
                Token = Convert.ToBase64String(RandomNumberGenerator.GetBytes(64)),
                Expired = DateTime.Now.AddDays(7)
            };

            return refreshToken;
        }

        private void SetRefreshToken(RefreshToken newRefreshToken)
        {
            var cookieOptions = new CookieOptions
            {
                HttpOnly = true,
                Expires = newRefreshToken.Expired,
            };

            Response.Cookies.Append("refreshToken", newRefreshToken.Token, cookieOptions);

            user.RefreshToken = newRefreshToken.Token;
            user.TokenCreated = newRefreshToken.Created;
            user.TokenExpired = newRefreshToken.Expired;
        }

        private string CreateToken(User user)
        {
            List<Claim> claims = new List<Claim> {
                new Claim(ClaimTypes.Name, user.Username),
                new Claim(ClaimTypes.Role, "Admin"),
                new Claim(ClaimTypes.Role, "User")
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(
                _configuration.GetSection("AppSettings:Token").Value!));

            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var token = new JwtSecurityToken(
                    claims: claims,
                    expires: DateTime.Now.AddDays(1),
                    signingCredentials: creds
                );

            var jwt = new JwtSecurityTokenHandler().WriteToken(token);

            return jwt;
        }
    }
}