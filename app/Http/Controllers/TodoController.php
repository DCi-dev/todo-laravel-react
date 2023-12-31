<?php

namespace App\Http\Controllers;

use App\Enums\TaskStatus;
use App\Http\Requests\TodoRequest;
use App\Http\Resources\Todo\TodoTransformer;
use App\Models\Todo;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\JsonResponse;

class TodoController extends Controller
{
    //

    protected $model = Todo::class;

    protected $resource = TodoTransformer::class;

    protected $request = TodoRequest::class;


    // Get all todos for a user
    public function index(Request $request)
    {
        $user = $request->user();


        $query = Todo::query();

        $filters = json_decode($request->get('filters', '[]'), true);

        foreach ($filters as $filter) {
            switch ($filter['type']) {
                case 'search':
                    $query->where('task', 'like', "%{$filter['data']}%");
                    break;
                case 'date_range':
                    $query->whereBetween('deadline', [$filter['data']['from'], $filter['data']['to']]);
                    break;
                case 'status':
                    $query->where('status', $filter['data']);
                    break;
            }
        }


        $todos = $query->where('user_id', $user->id)->get();

        // Get the mapping of statuses to their human-friendly format
        $statusMapping = TaskStatus::toSelectArray();

        // Transform the todos collection
        $transformedTodos = $todos->map(function ($todo) use ($statusMapping) {
            $statusValue = $todo->status->value;

            if (is_string($statusValue) && isset($statusMapping[$statusValue])) {
                $todo->human_status = $statusMapping[$statusValue];
            } else {
                $todo->human_status = $statusValue; // Fallback to the original value
            }
            return $todo;
        });


        return inertia('Todo', [
            'todo' => $transformedTodos,
        ]);
    }

    // Store a new task for a user
    public function store(TodoRequest $request)
    {
        $user = $request->user();

        $validated = $request->validate(TodoRequest::storeRules());

        $todo = Todo::create(
            [
                'user_id' => $user->id,
                'task' => $validated['task'],
                'status' => $validated['status'],
                'deadline' => $validated['deadline'],
            ]
        );


        $todos = Todo::byUser($user)->get();

        return back()->with([
            'task' => $todo,
            'tasks' => $todos,
        ]);
    }

    // Update a task for a user
    public function update(Request $request, int $id)
    {
        $user = $request->user();

        $todo = Todo::byUser($user)->find($id);

        $validated = $request->validate(TodoRequest::storeRules());

        $todo->update([
            'task' => $validated['task'],
            'status' => $validated['status'],
            'deadline' => $validated['deadline'],
        ]);

        return back();
    }

    // Delete a task for a user
    public function destroy(Request $request, int $id)
    {
        $user = $request->user();

        $todo = Todo::byUser($user)->find($id);

        $todo->delete();

        return back();
    }
}
