import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

export const TaskInput = ({
  newTask,
  setNewTask,
  selectedColumn,
  setSelectedColumn,
  columns,
  importance,
  setImportance,
  urgency,
  setUrgency,
  addTask,
}) => (
  <div className="mb-6 flex flex-wrap gap-2 justify-center">
    <Input
      type="text"
      value={newTask}
      onChange={(e) => setNewTask(e.target.value)}
      placeholder="New task"
      className="flex-grow max-w-md bg-white/50 backdrop-blur-sm border-indigo-200 focus:border-indigo-400 focus:ring-indigo-400"
    />
    <Select value={selectedColumn} onValueChange={setSelectedColumn}>
      <SelectTrigger className="w-[180px] bg-white/50 backdrop-blur-sm border-indigo-200">
        <SelectValue placeholder="Select column" />
      </SelectTrigger>
      <SelectContent>
        {columns.map((column) => (
          <SelectItem key={column.id} value={column.id}>
            {column.title}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
    <Select value={importance} onValueChange={setImportance}>
      <SelectTrigger className="w-[180px] bg-white/50 backdrop-blur-sm border-indigo-200">
        <SelectValue placeholder="Importance" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="high">High</SelectItem>
        <SelectItem value="low">Low</SelectItem>
      </SelectContent>
    </Select>
    <Select value={urgency} onValueChange={setUrgency}>
      <SelectTrigger className="w-[180px] bg-white/50 backdrop-blur-sm border-indigo-200">
        <SelectValue placeholder="Urgency" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="urgent">Urgent</SelectItem>
        <SelectItem value="not urgent">Not Urgent</SelectItem>
      </SelectContent>
    </Select>
    <Button
      onClick={addTask}
      className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white"
    >
      Add Task
    </Button>
  </div>
);
