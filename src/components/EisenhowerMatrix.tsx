import React from "react";

import { Droppable, Draggable } from "react-beautiful-dnd";
import { ScrollArea } from "../components/ui/scroll-area.tsx";
import { Button } from "./ui/button.tsx";
import { X } from "lucide-react";

type Task = {
  id: number;
  content: string;
  importance: "high" | "low";
  urgency: "urgent" | "not urgent";
};

type EisenhowerMatrixProps = {
  columnId: number;
  tasks: Task[];
  getTaskColor: (importance: string, urgency: string) => string;
  removeTask: (columnId: number, taskId: number) => void;
};

export const EisenhowerMatrix = ({
  columnId,
  tasks,
  getTaskColor,
  removeTask,
}: EisenhowerMatrixProps) => {
  const quadrants = [
    {
      importance: "high",
      urgency: "urgent",
      title: "Do",
      color: "bg-gradient-to-br from-red-200 to-orange-200",
    },
    {
      importance: "high",
      urgency: "not urgent",
      title: "Plan",
      color: "bg-gradient-to-br from-yellow-200 to-amber-200",
    },
    {
      importance: "low",
      urgency: "urgent",
      title: "Delegate",
      color: "bg-gradient-to-br from-blue-200 to-cyan-200",
    },
    {
      importance: "low",
      urgency: "not urgent",
      title: "Eliminate",
      color: "bg-gradient-to-br from-green-200 to-emerald-200",
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-2 h-full">
      {quadrants.map((quadrant) => (
        <Droppable
          key={`${columnId}-${quadrant.importance}-${quadrant.urgency}`}
          droppableId={`${columnId}-${quadrant.importance}-${quadrant.urgency}`}
        >
          {(provided: any) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className={`p-2 rounded-lg ${quadrant.color} flex flex-col h-full`}
            >
              <h4 className="text-sm font-semibold mb-2">{quadrant.title}</h4>
              <ScrollArea className="flex-grow">
                <div className="space-y-2">
                  {tasks
                    .filter(
                      (task) =>
                        task.importance === quadrant.importance &&
                        task.urgency === quadrant.urgency
                    )
                    .map((task, index) => (
                      <Draggable
                        key={task.id}
                        draggableId={task.id}
                        index={index}
                      >
                        {(provided: any) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className={`p-2 rounded-lg shadow-md text-sm flex justify-between items-center ${getTaskColor(
                              task.importance,
                              task.urgency
                            )}`}
                          >
                            <p>{task.content}</p>
                            <Button
                              variant="ghost"
                              onClick={() => removeTask(columnId, task.id)}
                            >
                              <X className="h-4 w-4 text-white-500" />
                            </Button>
                          </div>
                        )}
                      </Draggable>
                    ))}
                </div>
                {provided.placeholder}
              </ScrollArea>
            </div>
          )}
        </Droppable>
      ))}
    </div>
  );
};
