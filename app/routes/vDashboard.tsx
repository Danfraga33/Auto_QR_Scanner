import { BarChart3, Gauge, Target, Users, type LucideIcon } from "lucide-react";
import SidebarComp from "~/components/Sidebar";
import marketingAppData from "../lib/data/marketingAppData.json";
import campaignData from "~/lib/data/campaigns.json";
import { Progress } from "~/components/ui/progress";
import MetricCard from "~/components/MetricCard";

export default function MarketingApp() {
  return (
    <SidebarComp>
      <div className="flex flex-1 flex-col gap-4 p-4">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {/* <MetricCard title="Total Leads" value="5,280" icon={Users} /> */}
          <MetricCard title="Conversion Rate" value="18.5%" icon={BarChart3} />
          <MetricCard title="Active Campaigns" value="3" icon={Target} />
          <MetricCard title="ROI" value="245%" icon={Gauge} />
        </div>
        <div className="grid gap-4 md:grid-cols-1">
          <CampaignOverview campaigns={campaignData} />
          {/* <LeadSourcesChart leadSources={marketingAppData.leadSources} /> */}
        </div>
      </div>
    </SidebarComp>
  );
}

function CampaignOverview({
  campaigns,
}: {
  campaigns: {
    name: string;
    status: string;
    leads: number;
    conversions: number;
  }[];
}) {
  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
      <div className="p-6">
        <h3 className="text-lg font-semibold">Campaign Overview</h3>
        <div className="mt-4 space-y-4">
          {campaigns.map((campaign) => (
            <div
              key={campaign.name}
              className="flex items-center justify-between"
            >
              <div>
                <div className="font-medium">{campaign.name}</div>
                <div className="text-sm text-muted-foreground">
                  {campaign.status}
                </div>
              </div>
              <div className="text-right">
                <div className="font-medium">{campaign.leads} Leads</div>
                <div className="text-sm text-muted-foreground">
                  {campaign.conversions} Conversions
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
