using Azure;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using System;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;
namespace io.schnurr.Summarize.Api
{
    public static class Program
    {
        private static readonly string AzureEndpoint = Environment.GetEnvironmentVariable(nameof(AzureEndpoint), EnvironmentVariableTarget.Process);
        private static readonly string AzureKeyCredential = Environment.GetEnvironmentVariable(nameof(AzureKeyCredential), EnvironmentVariableTarget.Process);

        [FunctionName("SummarizeFunction")]
        public static async Task<IActionResult> Run([HttpTrigger(AuthorizationLevel.Function, "post", Route = null)] HttpRequest req)
        {
            string requestBody = string.Empty;

            using (var streamReader = new StreamReader(req.Body))
            {
                requestBody = await streamReader.ReadToEndAsync();
            }

            if (string.IsNullOrWhiteSpace(requestBody))
            {
                return new BadRequestResult();
            }

            var batchInput = new List<string>() { requestBody };

            var credentials = new AzureKeyCredential(AzureKeyCredential);
            var endpoint = new Uri(AzureEndpoint);
            var client = new SummarizeClient(endpoint, credentials);

            string summarizedText = await client.SummarizeTextAsync(batchInput);

            return new OkObjectResult(summarizedText);
        }
    }
}
