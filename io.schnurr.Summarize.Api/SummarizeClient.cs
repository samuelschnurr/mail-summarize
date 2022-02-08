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
			TextAnalyticsActions actions = new TextAnalyticsActions()
			{
				ExtractSummaryActions = new List<ExtractSummaryAction>() { new ExtractSummaryAction() }
			};

			AnalyzeActionsOperation operation = await StartAnalyzeActionsAsync(batchInput, actions);

			await operation.WaitForCompletionAsync();

			StringBuilder sb = new StringBuilder();

			await foreach (AnalyzeActionsResult documentsInPage in operation.Value)
			{
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
			}

			return sb.ToString();
		}
	}
}