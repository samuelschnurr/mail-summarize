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
using Microsoft.Azure.KeyVault;
using Microsoft.Azure.Services.AppAuthentication;
namespace io.schnurr.Summarize.Api
{
    public static class SummarizeFunction
    {
        private static readonly string KeyVaultEndpoint = Environment.GetEnvironmentVariable(nameof(KeyVaultEndpoint), EnvironmentVariableTarget.Process);

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

            //Az login is required to retreive key vault secrets from local execution. 
            var azureServiceTokenProvider = new AzureServiceTokenProvider();
            var keyVaultClient = new KeyVaultClient(new KeyVaultClient.AuthenticationCallback(azureServiceTokenProvider.KeyVaultTokenCallback));
            string cognitiveEndpoint = (await keyVaultClient.GetSecretAsync(KeyVaultEndpoint, "cognitive-account-endpoint"))?.Value;
            string cognitiveSecret = (await keyVaultClient.GetSecretAsync(KeyVaultEndpoint, "cognitive-account-secret"))?.Value;

            var credentials = new AzureKeyCredential(cognitiveSecret);
            var endpoint = new Uri(cognitiveEndpoint);
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
