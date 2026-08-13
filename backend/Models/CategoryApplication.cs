namespace backend.Models
{
    public class CategoryApplication
    {
        public Guid Id { get; set; }
        public string NamaCategory { get; set; }

        // Relasi ke Applications
        public ICollection<Application> Applications { get; set; }
    }
}