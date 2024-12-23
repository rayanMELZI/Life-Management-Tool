import { useState, useEffect } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { ScrollArea } from "@/components/ui/scroll-area";
import { TaskInput } from "./components/TaskInput.tsx";
import { ColumnInput } from "./components/ColumnInput.tsx";
import { Column } from "./components/Column.tsx";
import React from "react";

type Task = {
  id: number;
  content: string;
  importance: "high" | "low";
  urgency: "urgent" | "not urgent";
};

type ColumnType = {
  id: number;
  title: string;
  tasks: Task[];
};

export default function App() {
  const [columns, setColumns] = useState<ColumnType[]>([
    // { id: 0, title: "LMT", tasks: [] },
  ]);

  const [newTask, setNewTask] = useState("");
  const [selectedColumn, setSelectedColumn] = useState(0);
  const [importance, setImportance] = useState<"high" | "low">("high");
  const [urgency, setUrgency] = useState<"urgent" | "not urgent">("urgent");
  const [newColumnTitle, setNewColumnTitle] = useState("");

  const addTask = () => {
    if (newTask.trim() === "") return;

    const updatedColumns = columns.map((column) => {
      if (column.id === selectedColumn) {
        return {
          ...column,
          tasks: [
            ...column.tasks,
            {
              id: Date.now(),
              content: newTask,
              importance,
              urgency,
            },
          ],
        };
      }
      return column;
    });

    setColumns(updatedColumns);
    setNewTask("");
  };

  const removeTask = (columnId: number, taskId: number) => {
    // Show confirmation dialog
    const isConfirmed = globalThis.confirm(
      "Are you sure you want to delete this task?"
    );

    if (!isConfirmed) return; // If the user cancels, stop the deletion.

    const updatedColumns = columns.map((column) => {
      if (column.id === columnId) {
        return {
          ...column,
          tasks: column.tasks.filter((task) => task.id !== taskId),
        };
      }
      return column;
    });

    setColumns(updatedColumns);
  };

  // adds a new column
  const addColumn = () => {
    if (newColumnTitle.trim() === "") return;

    const newColumn: ColumnType = {
      id: Date.now(),
      title: newColumnTitle,
      tasks: [],
    };

    // interaction with database
    const addColumnToDatabase = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/api/domainColumn/add",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ title: newColumn.title }),
          }
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const res = await response.text();
        console.log(res);
      } catch (error) {
        console.error("Failed to add column to database:", error);
      }
    };
    addColumnToDatabase();

    setColumns([...columns, newColumn]);
    setNewColumnTitle("");
    setSelectedColumn(newColumn.id);
  };

  const removeColumn = (columnId: number) => {
    // Show confirmation dialog
    const isConfirmed = globalThis.confirm(
      "Are you sure you want to delete this task?"
    );

    if (!isConfirmed) return; // If the user cancels, stop the deletion.

    // interaction with database
    const removeColumnFromDatabase = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/api/domainColumn/delete",
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ id: columnId }),
          }
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const res = await response.text();
        console.log(res);
      } catch (error) {
        console.error("Failed to delete column to database:", error);
      }
    };
    removeColumnFromDatabase();

    setColumns(columns.filter((column) => column.id !== columnId));
  };

  // Load existing Columns from the database (each time the data change)
  useEffect(() => {
    const fetchColumnsData = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/api/domainColumn/all"
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setColumns(data);
      } catch (error) {
        console.error("Failed to fetch columns data:", error);
      }
    };

    fetchColumnsData();
  }, []);

  const onDragEnd = (result: any) => {
    if (!result.destination) return;

    const sourceColumn = columns.find(
      (column) => column.id === result.source.droppableId.split("-")[0]
    );
    const destColumn = columns.find(
      (column) => column.id === result.destination.droppableId.split("-")[0]
    );
    const [reorderedItem] = sourceColumn!.tasks.splice(result.source.index, 1);

    const [, destImportance, destUrgency] =
      result.destination.droppableId.split("-");
    reorderedItem.importance = destImportance as "high" | "low";
    reorderedItem.urgency = destUrgency as "urgent" | "not urgent";

    destColumn!.tasks.push(reorderedItem);

    setColumns([...columns]);
  };

  const getTaskColor = (importance: string, urgency: string) => {
    if (importance === "high" && urgency === "urgent")
      return "bg-gradient-to-r from-red-500 to-orange-500 text-white";
    if (importance === "high" && urgency === "not urgent")
      return "bg-gradient-to-r from-yellow-400 to-amber-500 text-white";
    if (importance === "low" && urgency === "urgent")
      return "bg-gradient-to-r from-blue-500 to-cyan-500 text-white";
    return "bg-gradient-to-r from-green-500 to-emerald-500 text-white";
  };

  return (
    <div className="p-4 min-h-screen bg-gradient-to-br from-purple-100 via-indigo-100 to-blue-100">
      <h1 className="text-4xl font-bold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600">
        Life Management Tool
      </h1>
      {/* Task Input */}
      <TaskInput
        newTask={newTask}
        setNewTask={setNewTask}
        selectedColumn={selectedColumn}
        setSelectedColumn={setSelectedColumn}
        columns={columns}
        importance={importance}
        setImportance={setImportance}
        urgency={urgency}
        setUrgency={setUrgency}
        addTask={addTask}
      />

      {/* Column Input */}
      <ColumnInput
        newColumnTitle={newColumnTitle}
        setNewColumnTitle={setNewColumnTitle}
        addColumn={addColumn}
      />

      {/* Columns with Drag & Drop */}
      <DragDropContext onDragEnd={onDragEnd}>
        <ScrollArea className="w-full" orientation="horizontal">
          {columns.length < 1 ? (
            <div className="text-3xl text-white font-semibold bg-gradient-to-tl from-teal-400 to-cyan-400 mt-16 mx-auto text-center w-fit p-32 rounded-3xl">
              Add a Column to start the Management process
            </div>
          ) : (
            <div className="flex space-x-4 pb-4 px-4 overflow-x-scroll">
              {columns.map((column) => (
                <Column
                  key={column.id}
                  column={column}
                  removeColumn={removeColumn}
                  removeTask={removeTask}
                  getTaskColor={getTaskColor}
                />
              ))}
            </div>
          )}
        </ScrollArea>
      </DragDropContext>
    </div>
  );
}
