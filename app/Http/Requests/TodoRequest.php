<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;


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
            'user_id' => 'required',
            'task' => 'required',
            'status' => 'required',
            'deadline' => 'required',
        ];
    }
}
