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
    <Card className="shadow-primary">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>{title}</CardTitle>
          <Badge
            variant={
              status === "Active"
                ? "default"
                : status === "Inactive"
                  ? "secondary"
                  : "destructive"
            }
          >
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
