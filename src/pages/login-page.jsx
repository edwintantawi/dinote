import { Button } from '@topremit/ui/button';

import { Icons } from '~/components/icons';
import { Input } from '~/components/ui/input';
import { useLogin } from '~/hooks/use-login';

export function LoginPage() {
  const { mutate: loginUser, isError, error } = useLogin();

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    loginUser({
      email: formData.get('email'),
      password: formData.get('password'),
    });
  };

  return (
    <div className="grid h-screen place-items-center">
      <div className="w-80 rounded-lg border p-8">
        <header className="flex items-center gap-2">
          <Button as="div">
            <Icons.Brand size={20} />
            <span>Dinote</span>
          </Button>
          <h1 className="text-xl font-bold">Login</h1>
        </header>
        <form onSubmit={handleSubmit}>
          <div className="mt-4">
            <label htmlFor="email">Email</label>
            <Input required name="email" type="email" id="email" />
          </div>
          <div className="mt-4">
            <label htmlFor="password">Password</label>
            <Input required name="password" type="password" id="password" />
          </div>

          {isError && (
            <div className="mt-4 text-xs text-red-600">{error.message}</div>
          )}

          <Button type="submit" className="mt-4 w-full">
            Login
          </Button>
        </form>
        <p className="mt-2 text-xs text-muted-foreground">
          Not have an account?{' '}
          <a href="/register" className="text-primary underline">
            register here
          </a>
        </p>
      </div>
    </div>
  );
}
