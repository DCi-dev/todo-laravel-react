import type { PageProps, TodoType } from '@/types';
import Task from './Task';

export default function List({ auth, todo }: PageProps<{ todo: TodoType[] }>) {
  return (
    <div>
      {todo.map(task => {
        return <Task key={task.id} task={task} auth={auth} />;
      })}
    </div>
  );
}
