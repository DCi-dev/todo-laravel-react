import type { PageProps, TodoType } from '@/types';
import { useForm } from '@inertiajs/react';
import { useState } from 'react';
import EditModal from './EditModal';

export default function List({ auth, task }: PageProps<{ task: TodoType }>) {
  const [isOpen, setIsOpen] = useState(false);

  const {
    delete: destroy,
    processing,
    errors,
  } = useForm({
    task: task.task,
  });

  function handleDelete(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();
    destroy('/todo/delete/' + task.id, {
      preserveScroll: true,
    });
  }

  const date = new Date(task.deadline).toLocaleDateString();

  return (
    <div className="w-full mt-4">
      <div key={task.id}>
        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg grid grid-cols-6">
          <p className="p-6 text-gray-900 text-lg font-semibold col-span-3">
            {task.task}
          </p>
          <p className="p-6 text-gray-900 text-md grid cols-1">
            {task.human_status}
          </p>
          <p className="p-6 text-gray-900 text-md grid cols-1">
            Deadline: {date}
          </p>
          <div className="flex items-center justify-end px-4 py-text-right sm:px-6 gap-8 col-span-1">
            <button
              onClick={() => setIsOpen(true)}
              className="ml-3 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-500 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              Edit
            </button>
            <EditModal
              auth={auth}
              task={task}
              isOpen={isOpen}
              setIsOpen={setIsOpen}
            />

            <button
              onClick={handleDelete}
              disabled={processing}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Delete
            </button>
            {errors.task && (
              <div className="text-red-500 text-sm mt-2">{errors.task}</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
