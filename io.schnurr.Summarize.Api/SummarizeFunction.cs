using System;
using System.Collections.Generic;
using System.IO;
using System.Net;
using Azure;
using io.schnurr.Summarize.Api;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Azure.Functions.Worker.Http;

namespace io.schnurr.Summarize.Api
{
	public static class SummarizeFunction
	{
		private static readonly string AzureEndpoint = Environment.GetEnvironmentVariable(nameof(AzureEndpoint), EnvironmentVariableTarget.Process);
		private static readonly string AzureKeyCredential = Environment.GetEnvironmentVariable(nameof(AzureKeyCredential), EnvironmentVariableTarget.Process);

		[Function("SummarizeFunction")]
		public static HttpResponseData Run([HttpTrigger(AuthorizationLevel.Function, "get", "post")] HttpRequestData req,
			FunctionContext executionContext)
		{
			string requestBody = string.Empty;

			using (var streamReader = new StreamReader(req.Body))
			{
				requestBody = streamReader.ReadToEnd();
			}

			if (string.IsNullOrWhiteSpace(requestBody))
			{
				var errorResponse = req.CreateResponse(HttpStatusCode.BadRequest);
				return errorResponse;
			}

			var batchInput = new List<string>() { requestBody };

			var credentials = new AzureKeyCredential(AzureKeyCredential);
			var endpoint = new Uri(AzureEndpoint);
			var client = new SummarizeClient(endpoint, credentials);

			string summarizedText = client.SummarizeTextAsync(batchInput).Result;

			var response = req.CreateResponse(HttpStatusCode.OK);
			response.Headers.Add("Content-Type", "text/plain; charset=utf-8");
			response.WriteString(summarizedText);
			return response;
		}
	}
}
