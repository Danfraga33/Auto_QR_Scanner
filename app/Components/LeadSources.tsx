import { Progress } from "./ui/progress";

export default function LeadSourcesChart({
  leadSources,
}: {
  leadSources: { name: string; count: number }[];
}) {
  const total = leadSources.reduce((sum, source) => sum + source.count, 0);

  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
      <div className="p-6">
        <h3 className="text-lg font-semibold">Lead Sources</h3>
        <div className="mt-4 space-y-4">
          {leadSources.map((source) => (
            <div key={source.name}>
              <div className="flex items-center justify-between text-sm">
                <span>{source.name}</span>
                <span className="font-medium">
                  {((source.count / total) * 100).toFixed(1)}%
                </span>
              </div>
              <Progress value={(source.count / total) * 100} className="mt-1" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
