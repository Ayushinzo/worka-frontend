import React, { useEffect, useState } from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { useAuth0 } from '@auth0/auth0-react'
import axios from 'axios'
import BlackScreen from '../components/BlackScreen'

function Kanban() {
    let { user } = useAuth0()
    const [tasks, setTasks] = useState([])
    const [blank, setBlank] = useState(false)
    const [todoTasks, setTodoTasks] = useState(tasks.filter(task => task.status === "todo"));
    const [inProgressTasks, setInProgressTasks] = useState(tasks.filter(task => task.status === "progress"));
    const [doneTasks, setDoneTasks] = useState(tasks.filter(task => task.status === "done"));

    async function getTasks() {
        try {
            let response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/task/getKanbanTasks?email=${user.email}`)
            if (response.data.success) {
                setTasks(response.data.tasks);
                setTodoTasks(response.data.tasks.filter(task => task.status === "todo"));
                setInProgressTasks(response.data.tasks.filter(task => task.status === "progress"));
                setDoneTasks(response.data.tasks.filter(task => task.status === "done"));
                setBlank(false)
            }
        } catch (error) {
            console.log(error)
            setBlank(false)
        }
    }
    useEffect(() => {
        getTasks()
    }, [user])

    const handleDragEnd = async (result) => {
        try {
            if ((result.source.droppableId != result.destination?.droppableId) && (result.destination?.droppableId != null)) {
                setBlank(true)
                let response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/task/changeStatus`, {
                    id: result.draggableId,
                    status: result.destination.droppableId
                })
                if (response.data.success) {
                    getTasks()
                }
            }
        } catch (error) {
            console.log(error)
            setBlank(false)
        }
    }
    return (
        <>
            {
                blank && <BlackScreen/>
            }
            <div className='m-2 md:m-5 p-1 lg:p-4 shadow-md bg-gradient-to-b from-white to-blue-50'>
                <h2 className='font-bold text-3xl bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-blue-400 drop-shadow-lg cursor-default'>Kanban board</h2>
                <p className='text-gray-600 mt-2'>Manage your tasks efficiently with our interactive Kanban board. Drag and drop cards between columns to track your project's progress.</p>
                <div className='mt-4'>
                    <DragDropContext onDragEnd={handleDragEnd}>
                        <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4'>
                            <Droppable
                                droppableId="todo"
                                isDropDisabled={false}
                                isCombineEnabled={true}
                                ignoreContainerClipping={true}
                            >
                                {(provided, shapshot) => (
                                    <div
                                        ref={provided.innerRef}
                                        {...provided.droppableProps}
                                        className="flex flex-col space-y-2 p-4 bg-gray-100 rounded min-h-[200px]"
                                    >
                                        <h2 className="text-center text-xl font-semibold tracking-wide text-white py-3 rounded-t-lg bg-gradient-to-r from-red-400 to-red-500 shadow-md uppercase">
                                            To Do
                                        </h2>
                                        {todoTasks.map((task, index) => {
                                            return (
                                                <Draggable
                                                    key={task.id}
                                                    draggableId={task.id.toString()}
                                                    index={index}
                                                    style={provided.draggableProps?.style ?? {}}
                                                >
                                                    {(provided, snapshot) => (
                                                        <div
                                                            ref={provided.innerRef}
                                                            {...provided.draggableProps}
                                                            {...provided.dragHandleProps}
                                                            className={`bg-white rounded-lg shadow p-3 transition duration-200 border-l-4 ${snapshot.isDragging ? "opacity-50" : ""
                                                                } border-red-500`}
                                                        >
                                                            <div className="flex justify-between items-center mb-1">
                                                                <h3 className="text-sm font-semibold text-gray-800 truncate">{task.title}</h3>
                                                                <span
                                                                    className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${task.priority === "high"
                                                                        ? "bg-red-100 text-red-600"
                                                                        : task.priority === "medium"
                                                                            ? "bg-yellow-100 text-yellow-600"
                                                                            : "bg-green-100 text-green-600"
                                                                        }`}
                                                                >
                                                                    {task.priority.toUpperCase()}
                                                                </span>
                                                            </div>
                                                            <p className="text-xs text-gray-600 line-clamp-2">{task.description}</p>
                                                            <div className="text-[11px] text-gray-500 mt-2 text-right">
                                                                {task.createdAt}
                                                            </div>
                                                        </div>
                                                    )}
                                                </Draggable>
                                            );
                                        })}
                                        {provided.placeholder}
                                    </div>
                                )
                                }
                            </Droppable>
                            <Droppable
                                droppableId="progress"
                                isDropDisabled={false}
                                isCombineEnabled={true}
                                ignoreContainerClipping={true}
                            >
                                {(provided, shapshot) => (
                                    <div
                                        ref={provided.innerRef}
                                        {...provided.droppableProps}
                                        className="flex flex-col space-y-2 p-4 bg-gray-100 rounded min-h-[200px]"
                                    >
                                        <h2 className="text-center text-xl font-semibold tracking-wide text-white py-3 rounded-t-lg bg-gradient-to-r from-yellow-400 to-yellow-500 shadow-md uppercase">
                                            In Progress
                                        </h2>
                                        {inProgressTasks.map((task, index) => {
                                            return (
                                                <Draggable
                                                    key={task.id}
                                                    draggableId={task.id}
                                                    index={index}
                                                >
                                                    {(provided, snapshot) => (
                                                        <div
                                                            ref={provided.innerRef}
                                                            {...provided.draggableProps}
                                                            {...provided.dragHandleProps}
                                                            className={`bg-white rounded-lg shadow p-3 transition duration-200 border-l-4 ${snapshot.isDragging ? "opacity-50" : ""
                                                                } border-yellow-500`}
                                                        >
                                                            <div className="flex justify-between items-center mb-1">
                                                                <h3 className="text-sm font-semibold text-gray-800 truncate">{task.title}</h3>
                                                                <span
                                                                    className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${task.priority === "high"
                                                                        ? "bg-red-100 text-red-600"
                                                                        : task.priority === "medium"
                                                                            ? "bg-yellow-100 text-yellow-600"
                                                                            : "bg-green-100 text-green-600"
                                                                        }`}
                                                                >
                                                                    {task.priority.toUpperCase()}
                                                                </span>
                                                            </div>
                                                            <p className="text-xs text-gray-600 line-clamp-2">{task.description}</p>
                                                            <div className="text-[11px] text-gray-500 mt-2 text-right">
                                                                {task.createdAt}
                                                            </div>
                                                        </div>
                                                    )}
                                                </Draggable>
                                            );
                                        })}
                                        {provided.placeholder}
                                    </div>
                                )
                                }
                            </Droppable>
                            <Droppable
                                droppableId="done"
                                isDropDisabled={false}
                                isCombineEnabled={true}
                                ignoreContainerClipping={true}
                            >
                                {(provided, shapshot) => (
                                    <div
                                        ref={provided.innerRef}
                                        {...provided.droppableProps}
                                        className="flex flex-col space-y-2 p-4 bg-gray-100 rounded min-h-[200px]"
                                    >
                                        <h2 className="text-center text-xl font-semibold tracking-wide text-white py-3 rounded-t-lg bg-gradient-to-r from-green-400 to-green-500 shadow-md uppercase">
                                            Done
                                        </h2>
                                        {doneTasks.map((task, index) => {
                                            return (
                                                <Draggable
                                                    key={task.id}
                                                    draggableId={task.id.toString()}
                                                    index={index}
                                                >
                                                    {(provided, snapshot) => (
                                                        <div
                                                            ref={provided.innerRef}
                                                            {...provided.draggableProps}
                                                            {...provided.dragHandleProps}
                                                            className={`bg-white rounded-lg shadow p-3 transition duration-200 border-l-4 ${snapshot.isDragging ? "opacity-50" : ""
                                                                } border-green-500`}
                                                        >
                                                            <div className="flex justify-between items-center mb-1">
                                                                <h3 className="text-sm font-semibold text-gray-800 truncate">{task.title}</h3>
                                                                <span
                                                                    className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${task.priority === "high"
                                                                        ? "bg-red-100 text-red-600"
                                                                        : task.priority === "medium"
                                                                            ? "bg-yellow-100 text-yellow-600"
                                                                            : "bg-green-100 text-green-600"
                                                                        }`}
                                                                >
                                                                    {task.priority.toUpperCase()}
                                                                </span>
                                                            </div>
                                                            <p className="text-xs text-gray-600 line-clamp-2">{task.description}</p>
                                                            <div className="text-[11px] text-gray-500 mt-2 text-right">
                                                                {task.createdAt}
                                                            </div>
                                                        </div>
                                                    )}
                                                </Draggable>
                                            );
                                        })}
                                        {provided.placeholder}
                                    </div>
                                )
                                }
                            </Droppable>
                        </div>
                    </DragDropContext>
                </div>
            </div>
        </>
    )
}

export default Kanban;