import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const ColumnInput = ({
  newColumnTitle,
  setNewColumnTitle,
  addColumn,
}) => (
  <div className="mb-6 flex gap-2 justify-center">
    <Input
      type="text"
      value={newColumnTitle}
      onChange={(e) => setNewColumnTitle(e.target.value)}
      placeholder="New column title"
      className="flex-grow max-w-md bg-white/50 backdrop-blur-sm border-indigo-200 focus:border-indigo-400 focus:ring-indigo-400"
    />
    <Button
      onClick={addColumn}
      className="bg-gradient-to-r from-teal-400 to-cyan-400 hover:from-teal-500 hover:to-cyan-500 text-white"
    >
      Add Column
    </Button>
  </div>
);
