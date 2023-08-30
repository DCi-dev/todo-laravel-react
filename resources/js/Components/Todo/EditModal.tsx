import { PageProps, TodoStatus, TodoType } from '@/types';
import { Dialog, Transition } from '@headlessui/react';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import { useForm } from '@inertiajs/react';
import { Fragment, useRef, useState } from 'react';



export default function EditModal({auth, task, isOpen, setIsOpen}: PageProps<{task: TodoType, isOpen: boolean, setIsOpen: any}>) {

    const cancelButtonRef = useRef(null)

    const { data, setData, put, processing, errors } = useForm({
        task: task.task,
        status:  task.status,
        deadline: task.deadline,
        userId: auth.user.id,
    });

    function handleSubmit(e : React.MouseEvent<HTMLFormElement, MouseEvent>) {
        e.preventDefault();
        put('/todo/update/' + task.id, {
            preserveScroll: true,
        });
        setIsOpen(false);
    }



    return (
        <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setIsOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <form onSubmit={handleSubmit} className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                      <ExclamationTriangleIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
                    </div>
                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                      <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                        Edit Task
                      </Dialog.Title>
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
                onChange={(e) => setData('status', e.target.value as TodoStatus)}
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
                value={data.deadline}
                onChange={(e) => setData('deadline', e.target.value)}
            />

            {errors.deadline && <div className="text-red-500">{errors.deadline}</div>}
        </div>
</div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 mt-2 w-full">
                  <button
                    type="submit"
                    className="inline-flex w-full justify-center rounded-md bg-gray-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-500 sm:ml-3 sm:w-auto"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    onClick={() => setIsOpen(false)}
                    ref={cancelButtonRef}
                  >
                    Cancel
                  </button>
                </div>
                </form>

              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>

    );
}
