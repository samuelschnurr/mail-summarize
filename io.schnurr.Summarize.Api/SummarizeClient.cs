using Azure;
using Azure.AI.TextAnalytics;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace io.schnurr.Summarize.Api
{
    internal class SummarizeClient : TextAnalyticsClient
    {
        internal SummarizeClient(Uri endpoint, AzureKeyCredential credentials) : base(endpoint, credentials)
        { }

        internal async Task<List<PlainAnalyzeActionsResult>> GetPlainAnalyzeActionsResultsAsync(TextAnalyticsActions actions, List<string> batchInput)
        {
            List<AnalyzeActionsResult> actionResults = await GetAnalyzeActionsResultsAsync(actions, batchInput);
            List<PlainAnalyzeActionsResult> plainResults = new();

            foreach (AnalyzeActionsResult result in actionResults)
            {
                var plainResult = new PlainAnalyzeActionsResult
                {
                    Summary = GetPlainResults(result.ExtractSummaryResults),
                    Sentiment = GetPlainResults(result.AnalyzeSentimentResults)
                };

                plainResults.Add(plainResult);
            }

            return plainResults;
        }

        private async Task<List<AnalyzeActionsResult>> GetAnalyzeActionsResultsAsync(TextAnalyticsActions actions, List<string> batchInput)
        {
            AnalyzeActionsOperation operation = await StartAnalyzeActionsAsync(batchInput, actions);
            await operation.WaitForCompletionAsync();

            List<AnalyzeActionsResult> results = new();

            await foreach (var actionResultInPage in operation.Value)
            {
                results.Add(actionResultInPage);
            }

            return results;
        }

        private static string GetPlainResults(IReadOnlyCollection<TextAnalyticsActionResult> actionResults)
        {
            StringBuilder sb = new();

            foreach (TextAnalyticsActionResult actionResult in actionResults)
            {
                if (actionResult.HasError)
                {
                    sb.AppendLine($"Error {actionResult.Error.ErrorCode}: {actionResult.Error.Message}.");
                    continue;
                }

                switch (actionResult)
                {
                    case ExtractSummaryActionResult summary:
                        sb.AppendLine(GetPlainSummary(summary));
                        break;
                    case AnalyzeSentimentActionResult sentiment:
                        sb.AppendLine(GetPlainSentiment(sentiment));
                        break;
                    default:
                        throw new NotImplementedException($"{actionResult.GetType()} is not implemented as action.");
                }
            }

            return sb.ToString();
        }

        private static string GetPlainSummary(ExtractSummaryActionResult actionResult)
        {
            StringBuilder sb = new();

            foreach (var docResult in actionResult.DocumentsResults)
            {
                if (docResult.HasError)
                {
                    sb.AppendLine($"Document error {docResult.Error.ErrorCode}: {docResult.Error.Message}.");
                    continue;
                }

                foreach (SummarySentence sentence in docResult.Sentences)
                {
                    sb.AppendLine(sentence.Text);
                }
            }

            return sb.ToString();
        }

        private static string GetPlainSentiment(AnalyzeSentimentActionResult actionResult)
        {
            StringBuilder sb = new();

            foreach (var docResult in actionResult.DocumentsResults)
            {
                if (docResult.HasError)
                {
                    sb.AppendLine($"Document error {docResult.Error.ErrorCode}: {docResult.Error.Message}.");
                    continue;
                }

                var sentiment = docResult.DocumentSentiment;
                sb.AppendLine(sentiment.Sentiment.ToString());
            }

            return sb.ToString();
        }
    }
}