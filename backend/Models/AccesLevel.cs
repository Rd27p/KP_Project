namespace backend.Models
{
    public class AccessLevel
    {
        public Guid Id { get; set; }
        public string Name { get; set; } = string.Empty; // contoh: Read Only, Read & Write, Admin
    }

    
}