import { ActionFunctionArgs, redirect } from "@remix-run/node";
import HookSelector from "~/components/HookSelector";
export async function action({ params }: ActionFunctionArgs) {
  console.log("SUBMITTED:", params);

  return redirect("/campaigns");
}

const CreateHook = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="mb-8 text-4xl font-bold">Marketing Hook Selector</h1>
      <HookSelector />
    </main>
  );
};

export default CreateHook;
