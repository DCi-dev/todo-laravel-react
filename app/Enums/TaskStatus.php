<?php

namespace App\Enums;


enum TaskStatus: string
{
    case Pending = 'pending';
    case InProgress = 'in_progress';
    case Completed = 'completed';

    public static function toSelectArray(): array
    {
        return [
            self::Pending->value => 'Pending',
            self::InProgress->value => 'In Progress',
            self::Completed->value => 'Completed',
        ];
    }

    public static function getValues(): array
    {
        return [
            self::Pending->value,
            self::InProgress->value,
            self::Completed->value,
        ];
    }
}
