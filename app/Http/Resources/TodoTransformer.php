<?php

namespace App\Http\Resources\Todo;

use Illuminate\Http\Resources\Json\JsonResource;


class TodoTransformer extends JsonResource
{
    public function toArray($request): array|\JsonSerializable|\Illuminate\Contracts\Support\Arrayable
    {
        return [
            'id' => $this->id,
            'task' => $this->task,
            'status' => $this->status,
            'deadline' => $this->deadline,
        ];
    }
}
