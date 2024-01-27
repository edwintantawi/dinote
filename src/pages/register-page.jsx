import { Icons } from '~/components/icons';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { useRegister } from '~/hooks/user-register';

export function RegisterPage() {
  const { mutate: registerUser, isError, error } = useRegister();

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    if (formData.get('password') !== formData.get('confirmPassword')) {
      return alert('Password and Confirm Password must be same');
    }

    registerUser({
      name: formData.get('name'),
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
          <h1 className="text-xl font-bold">Register</h1>
        </header>
        <form onSubmit={handleSubmit}>
          <div className="mt-4">
            <label htmlFor="name">Name</label>
            <Input required name="name" type="text" id="name" />
          </div>
          <div className="mt-4">
            <label htmlFor="email">Email</label>
            <Input required name="email" type="email" id="email" />
          </div>
          <div className="mt-4">
            <label htmlFor="password">Password</label>
            <Input required name="password" type="password" id="password" />
          </div>
          <div className="mt-4">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <Input
              required
              name="confirmPassword"
              type="password"
              id="confirmPassword"
            />
          </div>

          {isError && (
            <div className="mt-4 text-xs text-red-600">{error.message}</div>
          )}

          <Button type="submit" className="mt-4 w-full">
            Register
          </Button>
        </form>
        <p className="mt-2 text-xs text-muted-foreground">
          Already have an account?{' '}
          <a href="/login" className="text-primary underline">
            login here
          </a>
        </p>
      </div>
    </div>
  );
}
