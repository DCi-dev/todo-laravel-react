import Form from '@/Components/Todo/Form';
import List from '@/Components/Todo/List';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PageProps, TodoType } from '@/types';
import { Head } from '@inertiajs/react';

export default function Todo({ auth, todo }: PageProps<{todo: TodoType[]}>) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">To Do</h2>}
        >
            <Head title="Todo" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <Form auth={auth}/>
                        </div>

                    </div>
                </div>
                <List todo={todo} auth={auth}/>
            </div>
        </AuthenticatedLayout>
    );
}
