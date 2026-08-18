namespace backend.Models
{
    public class AccessLevel
    {
        public Guid Id { get; set; }
        public string NamaLevel { get; set; } = string.Empty; // contoh: Read Only, Read & Write, Admin

        public static implicit operator AccessLevel(string v)
        {
            throw new NotImplementedException();
        }
    }

    
}