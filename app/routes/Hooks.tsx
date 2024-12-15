import { ProjectCard } from "~/components/ProjectCard";
import SidebarComp from "~/components/Sidebar";
import { Separator } from "~/components/ui/separator";
import HooksData from "~/lib/data/Hooks.json";
import UserHooks from "~/lib/data/UserHooks.json";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { Unplug } from "lucide-react";
import { useToast } from "~/hooks/use-toast";
import { ToastAction } from "~/components/ui/toast";
import { CreateConnection } from "~/components/CreateConnection";
import { redirect } from "@remix-run/node";

export async function action() {
  return redirect("/campaigns");
}

const Hooks = () => {
  const { toast } = useToast();

  return (
    <SidebarComp>
      <main className="grid grid-cols-8 py-6 sm:px-6 lg:px-8">
        <div className="col-span-6 max-w-7xl pr-8">
          <div className="flex">
            <div className="px-4 py-6 sm:px-0">
              <h2 className="mb-6 text-2xl font-semibold text-gray-800 dark:text-white">
                Your Hooks
              </h2>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {UserHooks.map((hook) => (
                  <ProjectCard key={hook.id} {...hook} />
                ))}
              </div>
            </div>
            <CreateConnection />
          </div>

          <Separator />
          <div className="px-4 py-6 sm:px-0">
            <h2 className="mb-6 text-2xl font-semibold text-gray-800 dark:text-white">
              Hook Options
            </h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {HooksData.map((hook) => (
                <ProjectCard key={hook.id} {...hook} />
              ))}
            </div>
          </div>
        </div>
        <div className="col-span-2">
          <div className="flex flex-col gap-2">
            <Card>
              <CardHeader>
                <CardTitle>Most Used Hook</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col items-center justify-center">
                <p className="text-sm">QR Scanner</p>
                <div className="text-4xl font-bold">73</div>
              </CardContent>
            </Card>
            <Card className="col-span-2">
              <CardHeader className="w-full">
                Highest Converting Hook
              </CardHeader>

              <CardContent className="flex flex-col items-center justify-center">
                <p className="text-sm">Email</p>
                <div className="text-4xl font-bold">23%</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </SidebarComp>
  );
};

export default Hooks;
