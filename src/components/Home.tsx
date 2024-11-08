import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Task {
    id: number;
    title: string;
    description: string;
    is_completed: number;
}

const Home: React.FC = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/tasks');
                setTasks(response.data);
            } catch (err) {
                setError('Failed to fetch tasks');
            } finally {
                setLoading(false);
            }
        };

        fetchTasks();
    }, []);

    if (loading) {
        return <div className="flex justify-center items-center h-screen text-2xl font-semibold text-gray-700">Loading...</div>;
    }

    if (error) {
        return <div className="flex justify-center items-center h-screen text-red-500 text-2xl font-semibold">{error}</div>;
    }

    return (
        <div className="container mx-auto px-6 py-8">
            <h1 className="text-5xl font-extrabold text-center text-gray-900 mb-12">Task</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {tasks.map(task => (
                    <div
                        key={task.id}
                        className="p-6 bg-white border border-gray-200 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 transform hover:scale-105"
                    >
                        <h2 className="text-2xl font-bold text-gray-800 mb-4 truncate">{task.title}</h2>
                        <p className="text-gray-600 mb-6 line-clamp-3">{task.description}</p>
                        <span
                            className={`inline-flex items-center px-3 py-1 text-sm font-semibold rounded-full ${
                                task.is_completed ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                            }`}
                        >
                            {task.is_completed ? 'Completed' : 'Pending'}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;
