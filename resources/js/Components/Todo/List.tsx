import type { TodoStatus } from '@/types';
import { type PageProps, type TodoType } from '@/types';
import { router } from '@inertiajs/react';
import { useCallback, useEffect, useState } from 'react';
import Task from './Task';

interface Filter {
  type: string;
  data: object | string | number;
}

export default function List({ auth, todo }: PageProps<{ todo: TodoType[] }>) {
  const [filters, setFilters] = useState<Filter[]>([]);

  const [from, setFrom] = useState<string>();

  const [to, setTo] = useState<string>();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFilters(prev => {
      if (prev) {
        // Check if the filter already exists
        const index = prev.findIndex(
          (filter: { type: string }) => filter.type === 'search'
        );
        if (index !== -1) {
          // If it exists, update the value
          prev[index].data = value;
          return [...prev];
        }
        // If it doesn't exist, add it
        return [...prev, { type: 'search', data: value }] as Filter[];
      }
      return [{ type: 'search', data: value }];
    });
  };

  const handleStatus = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;

    setFilters(prevFilters => {
      if (!prevFilters) {
        if (value === 'all') return [];
        return [{ type: 'status', data: value }];
      }

      const index = prevFilters.findIndex(filter => filter.type === 'status');

      // Remove the filter if "all" is selected
      if (value === 'all') {
        if (index !== -1) {
          return prevFilters.filter(filter => filter.type !== 'status');
        }
        return prevFilters; // Return the previous filters as they were.
      }

      // If filter exists, update its value. If not, add it.
      const newFilters = [...prevFilters];
      if (index !== -1) {
        newFilters[index].data = value;
      } else {
        newFilters.push({ type: 'status', data: value });
      }

      return newFilters;
    });
  };

  const handleDateRangeChange = useCallback(() => {
    setFilters(prevFilters => {
      const updatedFilters = prevFilters ? [...prevFilters] : [];
      const dateRangeIndex = updatedFilters.findIndex(
        filter => filter.type === 'date_range'
      );

      // If either 'from' or 'to' is not selected, remove the date_range filter if it exists.
      if (!from || !to) {
        return updatedFilters.filter(filter => filter.type !== 'date_range');
      }

      // Create or update the date_range filter.
      const dateRangeFilter = {
        type: 'date_range',
        data: {
          from: from,
          to: to,
        },
      };

      if (dateRangeIndex !== -1) {
        updatedFilters[dateRangeIndex] = dateRangeFilter;
      } else {
        updatedFilters.push(dateRangeFilter);
      }

      return updatedFilters;
    });
  }, [from, to]);

  const handleFromChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFrom(e.target.value);
  };

  const handleToChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTo(e.target.value);
  };

  useEffect(() => {
    handleDateRangeChange();
  }, [handleDateRangeChange]);

  useEffect(() => {
    router.get(
      '/todo',
      {
        filters: JSON.stringify(filters),
      },
      {
        preserveScroll: true,
        preserveState: true,
      }
    );
  }, [filters]);

  return (
    <div className="mt-8 max-w-7xl mx-auto sm:px-6 lg:px-8">
      <div className="flex items-end w-full gap-8">
        {/* Search */}
        <div className="w-2/3">
          <label
            htmlFor="search"
            className="block text-sm font-medium text-gray-700"
          >
            Quick search
          </label>
          <div className="relative mt-1 flex items-center">
            <input
              type="text"
              name="search"
              id="search"
              onChange={handleSearch}
              className="block w-full rounded-md border-gray-300 pr-12 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
        </div>

        {/* Filter by status */}
        <div>
          <label
            htmlFor="status"
            className="block text-sm font-medium text-gray-700"
          >
            Status
          </label>
          <select
            id="status"
            name="status"
            value={
              (filters.find(
                (filter: { type: string }) => filter.type === 'status'
              )?.data as TodoStatus) || 'all'
            }
            onChange={handleStatus}
            className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
          >
            <option value="all">All</option>
            <option value="pending">Pending</option>
            <option value="in_progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        {/* Filter by date range */}
        <div>
          <label
            htmlFor="date_range"
            className="block text-sm font-medium text-gray-700"
          >
            Date range
          </label>
          <div className="flex gap-4 items-center">
            <input
              id="from"
              type="date"
              value={from || ''}
              onChange={handleFromChange}
              className="mt-1 block w-full"
            />
            <span className="text-gray-700">to</span>
            <input
              id="to"
              type="date"
              value={to || ''}
              onChange={handleToChange}
              className="mt-1 block w-full"
            />
          </div>
        </div>
      </div>
      {/* Todo */}
      <h2 className="font-semibold text-xl text-gray-800 leading-tight mt-8">
        Things to do
      </h2>
      {todo.map(task => {
        return <Task key={task.id} task={task} auth={auth} />;
      })}
    </div>
  );
}
