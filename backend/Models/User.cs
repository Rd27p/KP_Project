namespace backend.Models
{
    public class User
    {
        public Guid Id { get; set; }
        public Guid? IdAccessLevel { get; set; }
        public Guid? ApplicationId { get; set; }
        public string Username { get; set; }
        public string NIK { get; set; }
        public string Nama { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string Telp { get; set; }
        public string Department { get; set; }
        public string alasanPengajuan { get; set; }
        public AccessLevel? AccessLevel { get; set; }
        public Application? Application { get; set; }

        

    }
}