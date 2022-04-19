namespace io.schnurr.Summarize.Api.Models
{
    public class PlainAnalyzeActionsInput
    {
        public string MailContent { get; set; }
        public int MaxSentenceCount { get; set; }
    }
}