using Microsoft.Extensions.Hosting;

namespace io.schnurr.Summarize.Api
{
	public class Program
	{
		public static void Main()
		{
			var host = new HostBuilder()
				.ConfigureFunctionsWorkerDefaults()
				.Build();

			host.Run();
		}
	}
}