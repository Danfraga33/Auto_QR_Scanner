import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";

interface ProjectCardProps {
  title: string;
  description: string;
  status: string;
  numberOfCampaigns: number;
}

export function ProjectCard({
  title,
  description,
  status,
  numberOfCampaigns,
}: ProjectCardProps) {
  return (
    <Card className={`${status == "Active" ? "shadow-primary" : null}`}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>{title}</CardTitle>
          <Badge variant={status === "Active" ? "default" : "outline"}>
            {status}
          </Badge>
        </div>
        <CardDescription>{description}</CardDescription>
        <CardDescription>
          Campaigns: <strong> {numberOfCampaigns} </strong>
        </CardDescription>
      </CardHeader>
      {/* <CardContent>
        <Progress value={progress} className="w-full" />
        <p className="text-sm text-gray-500 mt-2">{progress}% complete</p>
      </CardContent> */}
    </Card>
  );
}
