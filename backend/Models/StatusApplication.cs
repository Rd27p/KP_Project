namespace backend.Models
{
    public class StatusApplication
        {
            public Guid Id { get; set; }
            public string NamaStatus { get; set; }

            public ICollection<Application> Applications { get; set; }
        }
}