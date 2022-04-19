using System;
using System.Collections.Generic;
using System.IO;
using System.Net;
using System.Text.Json;
using System.Threading.Tasks;
using Azure;
using Azure.AI.TextAnalytics;
using io.schnurr.Summarize.Api.Models;
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

                if (string.IsNullOrWhiteSpace(requestBody))
                {
                    HttpResponseData errorResponse = req.CreateResponse(HttpStatusCode.BadRequest);
                    return errorResponse;
                }
            }

            // MailInput is a single element because it represents a single email.
            // If multiple elements should be processed there must be some additional logic in
            // reading the http body and in the splitting of DocumentsResults in SummarizeClient.
            var actionsInput = JsonSerializer.Deserialize<PlainAnalyzeActionsInput>(requestBody);
            var batchInput = new List<string>() { actionsInput.MailContent.Replace("\r", "").Replace("\n", "") };
            TextAnalyticsActions actions = GetTextAnalyticsActions(actionsInput, true);

            var credentials = new AzureKeyCredential(AzureKeyCredential);
            var endpoint = new Uri(AzureEndpoint);
            var client = new SummarizeClient(endpoint, credentials);

            List<PlainAnalyzeActionsResult> plainResults = await client.GetPlainAnalyzeActionsResultsAsync(actions, batchInput);

            HttpResponseData response = req.CreateResponse();
            await response.WriteAsJsonAsync(plainResults);
            return response;
        }

        private static TextAnalyticsActions GetTextAnalyticsActions(PlainAnalyzeActionsInput actionsInput, bool disableServiceLogs)
        {
            return new TextAnalyticsActions()
            {
                AnalyzeSentimentActions = new List<AnalyzeSentimentAction>() { new AnalyzeSentimentAction() { IncludeOpinionMining = true, DisableServiceLogs = disableServiceLogs } },
                ExtractSummaryActions = new List<ExtractSummaryAction>() { new ExtractSummaryAction() { DisableServiceLogs = disableServiceLogs, MaxSentenceCount = actionsInput.MaxSentenceCount } }
            };
        }
    }
}
