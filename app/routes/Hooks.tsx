import { ProjectCard } from "~/components/ProjectCard";
import SidebarComp from "~/components/Sidebar";
import { Separator } from "~/components/ui/separator";
import Hooks from "~/lib/data/Hooks.json";
import UserHooks from "~/lib/data/UserHooks.json";
import { Card, CardHeader } from "~/components/ui/card";

const vDashboard = () => {
  return (
    <SidebarComp>
      <main className="grid  grid-cols-8 py-6 sm:px-6 lg:px-8">
        <div className="col-span-6 max-w-7xl pr-8 ">
          <div className="px-4 py-6 sm:px-0">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">
              Your Hooks
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {UserHooks.map((hook) => (
                <ProjectCard key={hook.id} {...hook} />
              ))}
            </div>
          </div>
          <Separator />
          <div className="px-4 py-6 sm:px-0">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">
              Hook Options
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Hooks.map((hook) => (
                <ProjectCard key={hook.id} {...hook} />
              ))}
            </div>
          </div>
        </div>
        <div className="col-span-2">
          <div className="gap-2 flex flex-col">
            <Card>
              <CardHeader className="w-full">Most Used Hook</CardHeader>
            </Card>
            <Card className="col-span-2">
              <CardHeader className="w-full">Most Used Hook</CardHeader>
            </Card>
            <Card className="col-span-2">
              <CardHeader className="w-full">Most Used Hook</CardHeader>
            </Card>
          </div>
        </div>
      </main>
    </SidebarComp>
  );
};

export default vDashboard;
