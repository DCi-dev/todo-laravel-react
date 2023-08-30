import { PageProps } from '@/types';
import { useForm } from '@inertiajs/react';

export default function Form({auth}: PageProps) {
const { data, setData, post, processing, errors } = useForm({
        task: '',
        status: 'pending',
        deadline: '',
        userId: auth.user.id,
});

function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        post('/todo/store', {
            preserveScroll: true,
        });
}

    return (
      <form onSubmit={handleSubmit}>
        <div className="mt-4">
            <label htmlFor="task">Task</label>
            <input
                id="task"
                type="text"
                className="mt-1 block w-full"
                value={data.task}
                onChange={(e) => setData('task', e.target.value)}
            />
            {errors.task && <div className="text-red-500">{errors.task}</div>}
        </div>
<div className='flex w-full justify-center items-center gap-4'>
        <div className="mt-4 w-full">
            <label htmlFor="status">Status</label>
            <select
                id="status"
                className="mt-1 block w-full"
                value={data.status}
                onChange={(e) => setData('status', e.target.value)}
            >
                <option value="pending">Pending</option>
                <option value="in_progress">In Progress</option>
                <option value="completed">Completed</option>
            </select>

            {errors.status && <div className="text-red-500">{errors.status}</div>}
        </div>

        <div className="mt-4 w-full">
            <label htmlFor="deadline">Deadline</label>
            <input
                id="deadline"
                type="date"
                className="mt-1 block w-full"
                value={data.deadline.toString()}
                onChange={(e) => setData('deadline', e.target.value)}
            />

            {errors.deadline && <div className="text-red-500">{errors.deadline}</div>}
        </div>
</div>
        <div className="flex items-center justify-end mt-4">
            <button
                className="ml-4 bg-black text-white py-2 px-4 rounded hover:bg-gray-700"
                type="submit"
                disabled={processing}
            >
                Add Task
            </button>
        </div>


      </form>
    );
}
