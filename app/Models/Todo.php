<?php

namespace App\Models;

use App\Enums\TaskStatus;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Todo extends Model
{
    use HasFactory;

    protected $casts = [
        'status' => TaskStatus::class,
        'deadline' => 'datetime',
        'task' => 'string',
    ];

    protected $fillable = [
        'task',
        'status',
        'deadline',
        'user_id',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function scopeByTaskAndUser($query, $search, $user)
    {
        return $query->where('task', 'like', "%{$search}%")
            ->where('user_id', $user->id);
    }

    public function getHumanStatusAttribute()
    {
        $statusMapping = TaskStatus::toSelectArray();
        return $statusMapping[$this->status->value] ?? $this->status->value;
    }

    public function scopeInProgress($query)
    {
        return $query->where('status', TaskStatus::InProgress);
    }

    public function scopeCompleted($query)
    {
        return $query->where('status', TaskStatus::Completed);
    }

    public function scopePending($query)
    {
        return $query->where('status', TaskStatus::Pending);
    }

    public function scopeByUser($query, $user)
    {
        return $query->where('user_id', $user->id);
    }

    public function scopeByStatus($query, $status)
    {
        return $query->where('status', $status);
    }

    public function scopeByTask($query, $task)
    {
        return $query->where('task', 'like', "%{$task}%");
    }

    public function scopeByDeadline($query, $deadline)
    {
        return $query->where('deadline', $deadline);
    }

    public function scopeByDate($query, $date)
    {
        return $query->whereDate('deadline', $date);
    }

    public function scopeByMonth($query, $month)
    {
        return $query->whereMonth('deadline', $month);
    }

    public function scopeByYear($query, $year)
    {
        return $query->whereYear('deadline', $year);
    }

    public function scopeByDateRange($query, $from, $to)
    {
        return $query->whereBetween('deadline', [$from, $to]);
    }

    public function scopeByMonthRange($query, $from, $to)
    {
        return $query->whereMonth('deadline', '>=', $from)
            ->whereMonth('deadline', '<=', $to);
    }

    public function scopeByYearRange($query, $from, $to)
    {
        return $query->whereYear('deadline', '>=', $from)
            ->whereYear('deadline', '<=', $to);
    }

    public function scopeByDateRangeAndStatus($query, $from, $to, $status)
    {
        return $query->whereBetween('deadline', [$from, $to])
            ->where('status', $status);
    }


    public function scopeByMonthRangeAndStatus($query, $from, $to, $status)
    {
        return $query->whereMonth('deadline', '>=', $from)
            ->whereMonth('deadline', '<=', $to)
            ->where('status', $status);
    }

    public function scopeByYearRangeAndStatus($query, $from, $to, $status)
    {
        return $query->whereYear('deadline', '>=', $from)
            ->whereYear('deadline', '<=', $to)
            ->where('status', $status);
    }


    public function scopeByDateRangeAndTask($query, $from, $to, $task)
    {
        return $query->whereBetween('deadline', [$from, $to])
            ->where('task', 'like', "%{$task}%");
    }


    public function scopeByMonthRangeAndTask($query, $from, $to, $task)
    {
        return $query->whereMonth('deadline', '>=', $from)
            ->whereMonth('deadline', '<=', $to)
            ->where('task', 'like', "%{$task}%");
    }


    public function scopeByYearRangeAndTask($query, $from, $to, $task)
    {
        return $query->whereYear('deadline', '>=', $from)
            ->whereYear('deadline', '<=', $to)
            ->where('task', 'like', "%{$task}%");
    }


    public function scopeByDateRangeAndTaskAndStatusAndUser($query, $from, $to, $search, $status, $user)
    {
        return $query->whereBetween('deadline', [$from, $to])
            ->where('task', 'like', "%{$search}%")
            ->where('status', $status)
            ->where('user_id', $user->id);
    }
}
