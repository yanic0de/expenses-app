import { createFileRoute } from '@tanstack/react-router';
import {
  deleteExpense,
  getAllExpensesQueryOptions,
  loadingCreateExpenseQueryOptions,
} from '@/lib/api.ts';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton.tsx';
import { Button } from '@/components/ui/button.tsx';
import { Trash } from 'lucide-react';
import { toast } from 'sonner';

export const Route = createFileRoute('/_authenticated/expenses')({
  component: Expenses,
});

function Expenses() {
  const { isPending, data } = useQuery(getAllExpensesQueryOptions);
  const { data: loadingCreateExpense } = useQuery(
    loadingCreateExpenseQueryOptions
  );

  return (
    <div className='p-2 max-w-3xl m-auto'>
      <Table>
        <TableCaption>A list of all your expenses</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className='w-[100px]'>Id</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loadingCreateExpense?.expense && (
            <TableRow>
              <TableCell className='font-medium'>
                {loadingCreateExpense.id}
              </TableCell>
              <TableCell>{loadingCreateExpense.title}</TableCell>
              <TableCell>{loadingCreateExpense.amount}</TableCell>
              <TableCell>{loadingCreateExpense.date}</TableCell>
            </TableRow>
          )}

          {isPending
            ? Array(3)
                .fill(0)
                .map((_, i) => (
                  <TableRow key={i}>
                    <TableCell>
                      <Skeleton className='h-4 ' />
                    </TableCell>
                    <TableCell>
                      <Skeleton className='h-4 ' />
                    </TableCell>
                    <TableCell>
                      <Skeleton className='h-4 ' />
                    </TableCell>
                    <TableCell>
                      <Skeleton className='h-4 ' />
                    </TableCell>
                    <TableCell>
                      <Skeleton className='h-4 ' />
                    </TableCell>
                  </TableRow>
                ))
            : data?.expenses.map((expense) => (
                <TableRow key={expense.id}>
                  <TableCell className='font-medium'>{expense.id}</TableCell>
                  <TableCell>{expense.title}</TableCell>
                  <TableCell>{expense.amount}</TableCell>
                  <TableCell>{expense.date}</TableCell>
                  <TableCell>
                    <ExpenseDeleteButton id={expense.id} />
                  </TableCell>
                </TableRow>
              ))}
        </TableBody>
      </Table>
    </div>
  );
}

export function ExpenseDeleteButton({ id }: { id: number }) {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: deleteExpense,
    onError: () => {
      toast('Error', {
        description: `Failed to delete expense: ${id}`,
      });
    },
    onSuccess: () => {
      toast('Expense Deleted', {
        description: `Successfully deleted expense: ${id}`,
      });
      queryClient.setQueryData(
        getAllExpensesQueryOptions.queryKey,
        (existingExpenses) => ({
          ...existingExpenses,
          expenses: existingExpenses!.expenses.filter(
            (expense) => expense.id !== id
          ),
        })
      );
    },
  });
  return (
    <Button
      disabled={mutation.isPending}
      onClick={() => mutation.mutate({ id })}
      variant='outline'
      size='icon'
    >
      {mutation.isPending ? '...' : <Trash className='w-4 h-4' />}
    </Button>
  );
}
