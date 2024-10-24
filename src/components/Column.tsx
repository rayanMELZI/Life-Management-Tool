import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { EisenhowerMatrix } from "./EisenhowerMatrix";
import { Task } from "@/types";

type ColumnProps = {
  column: { id: string; title: string; tasks: Task[] };
  removeColumn: (id: string) => void;
  removeTask: (id1: string, id2: string) => void;
  getTaskColor: (importance: string, urgency: string) => string;
};

export const Column = ({
  column,
  removeColumn,
  getTaskColor,
  removeTask,
}: ColumnProps) => (
  <Card className="w-[350px] flex-shrink-0 bg-white/70 backdrop-blur-md shadow-xl rounded-xl overflow-hidden border-none">
    <CardHeader className="flex flex-row items-center justify-between bg-gradient-to-r from-indigo-400 to-blue-400 text-white">
      <CardTitle className="text-lg">{column.title}</CardTitle>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => removeColumn(column.id)}
        className="text-white"
      >
        <X className="h-4 w-4" />
      </Button>
    </CardHeader>
    <CardContent className="h-[500px] p-4">
      <EisenhowerMatrix
        columnId={column.id}
        tasks={column.tasks}
        getTaskColor={getTaskColor}
        removeTask={removeTask}
      />
    </CardContent>
  </Card>
);
