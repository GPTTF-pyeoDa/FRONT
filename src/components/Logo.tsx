import { PenTool } from "lucide-react";

export function Logo() {
  return (
    <div className="flex items-center space-x-2">
      <div className="bg-blue-100 p-2 rounded-full">
        <PenTool className="h-6 w-6 text-blue-500" />
      </div>
      <span className="text-2xl font-semibold text-blue-800">펴다</span>
    </div>
  );
}
