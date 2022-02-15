using System;
using System.Collections.Generic;
using System.IO;
using System.Net;
using System.Threading.Tasks;
using Azure;
using Azure.AI.TextAnalytics;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Azure.Functions.Worker.Http;

namespace io.schnurr.Summarize.Api
{
    public static class SummarizeFunction
    {
        private static readonly string AzureEndpoint = Environment.GetEnvironmentVariable(nameof(AzureEndpoint), EnvironmentVariableTarget.Process);
        private static readonly string AzureKeyCredential = Environment.GetEnvironmentVariable(nameof(AzureKeyCredential), EnvironmentVariableTarget.Process);

        [Function("SummarizeFunction")]
        public async static Task<HttpResponseData> Run([HttpTrigger(AuthorizationLevel.Function, "post")] HttpRequestData req)
        {
            string requestBody = string.Empty;

            using (var streamReader = new StreamReader(req.Body))
            {
                requestBody = await streamReader.ReadToEndAsync();
            }

            if (string.IsNullOrWhiteSpace(requestBody))
            {
                HttpResponseData errorResponse = req.CreateResponse(HttpStatusCode.BadRequest);
                return errorResponse;
            }

            var credentials = new AzureKeyCredential(AzureKeyCredential);
            var endpoint = new Uri(AzureEndpoint);
            var client = new SummarizeClient(endpoint, credentials);

            var batchInput = new List<string>() { requestBody };
            TextAnalyticsActions actions = GetTextAnalyticsActions(true);
            List<PlainAnalyzeActionsResult> plainResults = await client.GetPlainAnalyzeActionsResultsAsync(actions, batchInput);

            HttpResponseData response = req.CreateResponse();
            await response.WriteAsJsonAsync(plainResults);
            return response;
        }

        private static TextAnalyticsActions GetTextAnalyticsActions(bool disableServiceLogs)
        {
            return new TextAnalyticsActions()
            {
                AnalyzeSentimentActions = new List<AnalyzeSentimentAction>() { new AnalyzeSentimentAction() { IncludeOpinionMining = true, DisableServiceLogs = disableServiceLogs } },
                ExtractSummaryActions = new List<ExtractSummaryAction>() { new ExtractSummaryAction() { DisableServiceLogs = disableServiceLogs } }
            };
        }
    }
}
