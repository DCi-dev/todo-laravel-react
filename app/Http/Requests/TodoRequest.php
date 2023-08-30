<?php

namespace App\Http\Requests;

use App\Enums\TaskStatus;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;


class TodoRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return \Illuminate\Support\Facades\Auth::check();
    }


    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public static function storeRules(): array
    {
        return [
            'task' => ['required', 'string', 'min:2', 'max:255'],
            'status' => ['required', Rule::in(TaskStatus::getValues())],
            'deadline' => ['required', 'date']
        ];
    }
}
