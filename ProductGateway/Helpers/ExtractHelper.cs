namespace ProductGateway.Helpers
{
    public static class ExtractHelper
    {
        public static string? ExtractProductId(string path)
        {
            if (string.IsNullOrWhiteSpace(path))
                return null;

            var segments = path.Split('/', StringSplitOptions.RemoveEmptyEntries);
            var lastSegment = segments.LastOrDefault();

            if (lastSegment != null && lastSegment.EndsWith(".aspx", StringComparison.OrdinalIgnoreCase))
            {
                return lastSegment[..^5]; // removes ".aspx"
            }

            return null;
        }
    }
}
