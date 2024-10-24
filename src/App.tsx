// import { useState } from "react";
// import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { ScrollArea } from "@/components/ui/scroll-area";
// import { PlusCircle, X } from "lucide-react";

// type Task = {
//   id: string;
//   content: string;
//   importance: "high" | "low";
//   urgency: "urgent" | "not urgent";
// };

// type Column = {
//   id: string;
//   title: string;
//   tasks: Task[];
// };

// export default function App() {
//   const [columns, setColumns] = useState<Column[]>([
//     { id: "work", title: "Work", tasks: [] },
//     { id: "everyday", title: "Everyday Life", tasks: [] },
//     { id: "studies", title: "Studies", tasks: [] },
//     { id: "cool-shit", title: "Cool Shit I Wanna Do", tasks: [] },
//   ]);

//   const [newTask, setNewTask] = useState("");
//   const [selectedColumn, setSelectedColumn] = useState(columns[0].id);
//   const [importance, setImportance] = useState<"high" | "low">("high");
//   const [urgency, setUrgency] = useState<"urgent" | "not urgent">("urgent");
//   const [newColumnTitle, setNewColumnTitle] = useState("");

//   const addTask = () => {
//     if (newTask.trim() === "") return;

//     const updatedColumns = columns.map((column) => {
//       if (column.id === selectedColumn) {
//         return {
//           ...column,
//           tasks: [
//             ...column.tasks,
//             {
//               id: Date.now().toString(),
//               content: newTask,
//               importance,
//               urgency,
//             },
//           ],
//         };
//       }
//       return column;
//     });

//     setColumns(updatedColumns);
//     setNewTask("");
//   };

//   const removeTask = () => {
//     //impliment this and use it
//   };

//   const addColumn = () => {
//     if (newColumnTitle.trim() === "") return;

//     const newColumn: Column = {
//       id: Date.now().toString(),
//       title: newColumnTitle,
//       tasks: [],
//     };

//     setColumns([...columns, newColumn]);
//     setNewColumnTitle("");
//   };

//   const removeColumn = (columnId: string) => {
//     setColumns(columns.filter((column) => column.id !== columnId));
//   };

//   const onDragEnd = (result) => {
//     if (!result.destination) return;

//     const sourceColumn = columns.find(
//       (column) => column.id === result.source.droppableId.split("-")[0]
//     );
//     const destColumn = columns.find(
//       (column) => column.id === result.destination.droppableId.split("-")[0]
//     );
//     const [reorderedItem] = sourceColumn.tasks.splice(result.source.index, 1);

//     const [, destImportance, destUrgency] =
//       result.destination.droppableId.split("-");
//     reorderedItem.importance = destImportance as "high" | "low";
//     reorderedItem.urgency = destUrgency as "urgent" | "not urgent";

//     destColumn.tasks.push(reorderedItem);

//     setColumns([...columns]);
//   };

//   const getTaskColor = (importance: string, urgency: string) => {
//     if (importance === "high" && urgency === "urgent")
//       return "bg-gradient-to-r from-red-500 to-orange-500 text-white";
//     if (importance === "high" && urgency === "not urgent")
//       return "bg-gradient-to-r from-yellow-400 to-amber-500 text-white";
//     if (importance === "low" && urgency === "urgent")
//       return "bg-gradient-to-r from-blue-500 to-cyan-500 text-white";
//     return "bg-gradient-to-r from-green-500 to-emerald-500 text-white";
//   };

//   const renderEisenhowerMatrix = (columnId: string, tasks: Task[]) => {
//     const quadrants = [
//       {
//         importance: "high",
//         urgency: "urgent",
//         title: "Do",
//         color: "bg-gradient-to-br from-red-200 to-orange-200",
//       },
//       {
//         importance: "high",
//         urgency: "not urgent",
//         title: "Plan",
//         color: "bg-gradient-to-br from-yellow-200 to-amber-200",
//       },
//       {
//         importance: "low",
//         urgency: "urgent",
//         title: "Delegate",
//         color: "bg-gradient-to-br from-blue-200 to-cyan-200",
//       },
//       {
//         importance: "low",
//         urgency: "not urgent",
//         title: "Eliminate",
//         color: "bg-gradient-to-br from-green-200 to-emerald-200",
//       },
//     ];

//     return (
//       <div className="grid grid-cols-2 gap-2 h-full">
//         {quadrants.map((quadrant) => (
//           <Droppable
//             key={`${columnId}-${quadrant.importance}-${quadrant.urgency}`}
//             droppableId={`${columnId}-${quadrant.importance}-${quadrant.urgency}`}
//           >
//             {(provided) => (
//               <div
//                 {...provided.droppableProps}
//                 ref={provided.innerRef}
//                 className={`p-2 rounded-lg ${quadrant.color} flex flex-col h-full shadow-md`}
//               >
//                 <h4 className="text-sm font-semibold mb-2 text-gray-800">
//                   {quadrant.title}
//                 </h4>
//                 <ScrollArea className="flex-grow">
//                   <div className="space-y-2">
//                     {tasks
//                       .filter(
//                         (task) =>
//                           task.importance === quadrant.importance &&
//                           task.urgency === quadrant.urgency
//                       )
//                       .map((task, index) => (
//                         <Draggable
//                           key={task.id}
//                           draggableId={task.id}
//                           index={index}
//                         >
//                           {(provided) => (
//                             <div
//                               ref={provided.innerRef}
//                               {...provided.draggableProps}
//                               {...provided.dragHandleProps}
//                               className={`p-2 rounded-lg shadow-md text-sm ${getTaskColor(
//                                 task.importance,
//                                 task.urgency
//                               )}`}
//                             >
//                               {task.content}
//                             </div>
//                           )}
//                         </Draggable>
//                       ))}
//                   </div>
//                   {provided.placeholder}
//                 </ScrollArea>
//               </div>
//             )}
//           </Droppable>
//         ))}
//       </div>
//     );
//   };

//   return (
//     <div className="p-4 min-h-screen bg-gradient-to-br from-purple-100 via-indigo-100 to-blue-100">
//       <h1 className="text-4xl font-bold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600">
//         Life Management Tool
//       </h1>
//       {/* inputs */}
//       <div className="mb-6 flex flex-wrap gap-2 justify-center">
//         <Input
//           type="text"
//           value={newTask}
//           onChange={(e) => setNewTask(e.target.value)}
//           placeholder="New task"
//           className="flex-grow max-w-md bg-white/50 backdrop-blur-sm border-indigo-200 focus:border-indigo-400 focus:ring-indigo-400"
//         />
//         <Select value={selectedColumn} onValueChange={setSelectedColumn}>
//           <SelectTrigger className="w-[180px] bg-white/50 backdrop-blur-sm border-indigo-200">
//             <SelectValue placeholder="Select column" />
//           </SelectTrigger>
//           <SelectContent>
//             {columns.map((column) => (
//               <SelectItem key={column.id} value={column.id}>
//                 {column.title}
//               </SelectItem>
//             ))}
//           </SelectContent>
//         </Select>
//         <Select value={importance} onValueChange={setImportance}>
//           <SelectTrigger className="w-[180px] bg-white/50 backdrop-blur-sm border-indigo-200">
//             <SelectValue placeholder="Importance" />
//           </SelectTrigger>
//           <SelectContent>
//             <SelectItem value="high">High</SelectItem>
//             <SelectItem value="low">Low</SelectItem>
//           </SelectContent>
//         </Select>
//         <Select value={urgency} onValueChange={setUrgency}>
//           <SelectTrigger className="w-[180px] bg-white/50 backdrop-blur-sm border-indigo-200">
//             <SelectValue placeholder="Urgency" />
//           </SelectTrigger>
//           <SelectContent>
//             <SelectItem value="urgent">Urgent</SelectItem>
//             <SelectItem value="not urgent">Not Urgent</SelectItem>
//           </SelectContent>
//         </Select>
//         <Button
//           onClick={addTask}
//           className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white"
//         >
//           Add Task
//         </Button>
//       </div>
//       <div className="mb-6 flex gap-2 justify-center">
//         <Input
//           type="text"
//           value={newColumnTitle}
//           onChange={(e) => setNewColumnTitle(e.target.value)}
//           placeholder="New column title"
//           className="flex-grow max-w-md bg-white/50 backdrop-blur-sm border-indigo-200 focus:border-indigo-400 focus:ring-indigo-400"
//         />
//         <Button
//           onClick={addColumn}
//           className="bg-gradient-to-r from-teal-400 to-cyan-400 hover:from-teal-500 hover:to-cyan-500 text-white"
//         >
//           Add Column
//         </Button>
//       </div>
//       <DragDropContext onDragEnd={onDragEnd}>
//         <ScrollArea className="w-full" orientation="horizontal">
//           <div className="flex space-x-4 pb-4 px-4 overflow-x-scroll">
//             {columns.map((column) => (
//               <Card
//                 key={column.id}
//                 className="w-[350px] flex-shrink-0 bg-white/70 backdrop-blur-md shadow-xl rounded-xl overflow-hidden border-none"
//               >
//                 <CardHeader className="flex flex-row items-center justify-between bg-gradient-to-r from-indigo-400 to-blue-400 text-white rounded-t-xl">
//                   <CardTitle className="text-lg font-semibold">
//                     {column.title}
//                   </CardTitle>
//                   <Button
//                     variant="ghost"
//                     size="icon"
//                     onClick={() => removeColumn(column.id)}
//                     className="text-white hover:text-indigo-200"
//                   >
//                     <X className="h-4 w-4" />
//                   </Button>
//                 </CardHeader>
//                 <CardContent className="h-[500px] p-4">
//                   {renderEisenhowerMatrix(column.id, column.tasks)}
//                 </CardContent>
//               </Card>
//             ))}
//           </div>
//         </ScrollArea>
//       </DragDropContext>
//     </div>
//   );
// }

import { useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { ScrollArea } from "@/components/ui/scroll-area";
import { TaskInput } from "./components/TaskInput";
import { ColumnInput } from "./components/ColumnInput";
import { Column } from "./components/Column";

type Task = {
  id: string;
  content: string;
  importance: "high" | "low";
  urgency: "urgent" | "not urgent";
};

type ColumnType = {
  id: string;
  title: string;
  tasks: Task[];
};

export default function App() {
  const [columns, setColumns] = useState<ColumnType[]>([
    { id: "work", title: "Work", tasks: [] },
    { id: "everyday", title: "Everyday Life", tasks: [] },
    { id: "studies", title: "Studies", tasks: [] },
    { id: "cool-shit", title: "Cool Shit I Wanna Do", tasks: [] },
  ]);

  const [newTask, setNewTask] = useState("");
  const [selectedColumn, setSelectedColumn] = useState(columns[0].id);
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
              id: Date.now().toString(),
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

  const removeTask = (columnId: string, taskId: string) => {
    // Show confirmation dialog
    const isConfirmed = window.confirm(
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

  const addColumn = () => {
    if (newColumnTitle.trim() === "") return;

    const newColumn: ColumnType = {
      id: Date.now().toString(),
      title: newColumnTitle,
      tasks: [],
    };

    setColumns([...columns, newColumn]);
    setNewColumnTitle("");
  };

  const removeColumn = (columnId: string) => {
    // Show confirmation dialog
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this task?"
    );

    if (!isConfirmed) return; // If the user cancels, stop the deletion.

    setColumns(columns.filter((column) => column.id !== columnId));
  };

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
        </ScrollArea>
      </DragDropContext>
    </div>
  );
}
