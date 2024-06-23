import {
  createRootRouteWithContext,
  Link,
  Outlet,
} from '@tanstack/react-router';
import { QueryClient } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/sonner.tsx';
// import { TanStackRouterDevtools } from '@tanstack/router-devtools';
interface MyRouterContext {
  queryClient: QueryClient;
}

// Use the routerContext to create your root route
export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: Root,
});

function NavBar() {
  return (
    <div className='p-2 flex gap-2 max-w-2xl m-auto justify-center'>
      <Link to='/' className='[&.active]:font-bold'>
        Home
      </Link>{' '}
      <Link to='/about' className='[&.active]:font-bold'>
        About
      </Link>
      <Link to='/expenses' className='[&.active]:font-bold'>
        Expenses
      </Link>
      <Link to='/create-expense' className='[&.active]:font-bold'>
        Create
      </Link>
      <Link to='/profile' className='[&.active]:font-bold'>
        Profile
      </Link>
    </div>
  );
}

function Root() {
  return (
    <>
      <NavBar />
      <hr />
      <div className='p-2 max-w-2xl m-auto'>
        <Outlet />
      </div>
      <Toaster />
      {/*<TanStackRouterDevtools />*/}
    </>
  );
}
