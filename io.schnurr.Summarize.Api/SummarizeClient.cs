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

		internal async Task<string> SummarizeTextAsync(List<string> batchInput)
		{
			TextAnalyticsActions actions = GetTextAnalyticsActions(true);
			AnalyzeActionsOperation operation = await StartAnalyzeActionsAsync(batchInput, actions);
			await operation.WaitForCompletionAsync();

			StringBuilder sb = new StringBuilder();

			await foreach (AnalyzeActionsResult documentsInPage in operation.Value)
			{
				var s1 = GetExtractSummaryActionResultS(documentsInPage);
				sb.Append(s1.ToString());
				var s2 = GetAnalyzeSentimentActionResults(documentsInPage);
				sb.Append(s2.ToString());
			}

			return sb.ToString();
		}


		private string GetExtractSummaryActionResultS(AnalyzeActionsResult documentsInPage)
		{
			StringBuilder sb = new StringBuilder();

			IReadOnlyCollection<ExtractSummaryActionResult> summaryResults = documentsInPage.ExtractSummaryResults;

			foreach (ExtractSummaryActionResult summaryActionResults in summaryResults)
			{
				if (summaryActionResults.HasError)
				{
					sb.AppendLine("Error!");
					sb.AppendLine($"Action error code: {summaryActionResults.Error.ErrorCode}.");
					sb.AppendLine($"Message: {summaryActionResults.Error.Message}");
					continue;
				}

				foreach (ExtractSummaryResult documentResults in summaryActionResults.DocumentsResults)
				{
					if (documentResults.HasError)
					{
						sb.AppendLine($"Error!");
						sb.AppendLine($"Document error code: {documentResults.Error.ErrorCode}.");
						sb.AppendLine($"Message: {documentResults.Error.Message}");
						continue;
					}

					foreach (SummarySentence sentence in documentResults.Sentences)
					{
						sb.AppendLine($"{sentence.Text}");
						sb.AppendLine();
					}
				}
			}

			return sb.ToString();
		}

		private string GetAnalyzeSentimentActionResults(AnalyzeActionsResult documentsInPage)
		{
			StringBuilder sb = new StringBuilder();

			IReadOnlyCollection<AnalyzeSentimentActionResult> sentimentResults = documentsInPage.AnalyzeSentimentResults;

			foreach (AnalyzeSentimentActionResult sentimentResult in sentimentResults)
			{
				if (sentimentResult.HasError)
				{
					sb.AppendLine("Error!");
					sb.AppendLine($"Action error code: {sentimentResult.Error.ErrorCode}.");
					sb.AppendLine($"Message: {sentimentResult.Error.Message}");
					continue;
				}

				foreach (AnalyzeSentimentResult documentResults in sentimentResult.DocumentsResults)
				{
					if (documentResults.HasError)
					{
						sb.AppendLine($"Error!");
						sb.AppendLine($"Document error code: {documentResults.Error.ErrorCode}.");
						sb.AppendLine($"Message: {documentResults.Error.Message}");
						continue;
					}

					DocumentSentiment sentiment = documentResults.DocumentSentiment;
					sb.AppendLine($"Sentiment: { sentiment.Sentiment}");
					sb.AppendLine();
				}
			}

			return sb.ToString();
		}

		private TextAnalyticsActions GetTextAnalyticsActions(bool disableServiceLogs)
		{
			return new TextAnalyticsActions()
			{
				AnalyzeSentimentActions = new List<AnalyzeSentimentAction>() { new AnalyzeSentimentAction() { IncludeOpinionMining = true, DisableServiceLogs = disableServiceLogs } },
				ExtractSummaryActions = new List<ExtractSummaryAction>() { new ExtractSummaryAction() { DisableServiceLogs = disableServiceLogs } }
			};
		}
	}
}