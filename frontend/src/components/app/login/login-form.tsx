import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { login } from '@/services/login';
import { LoginErrorResponse } from '@/types/login';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';

/**
 * Login form schema
 */
const loginFormSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Email format is not valid'),
  password: z
    .string()
    .min(1, 'Password is required')
    .min(8, 'Password must be at least 8 characters'),
});

/**
 * Login form component
 */
export function LoginForm() {
  const navigate = useNavigate();

  const { mutate: loginHandler } = useMutation({
    mutationFn: login,
    onSuccess: (response) => {
      const userId = response.data.user_id;

      localStorage.setItem('userId', userId);
      localStorage.setItem('token', response.data.access_token);

      navigate(`/user/${userId}`);
    },
    onError: (error: AxiosError<LoginErrorResponse>) => {
      console.error(error);
    },
  });

  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  /**
   * Form submit handler
   * @param {z.infer<typeof loginFormSchema>} values - Form values
   */
  function onSubmit(values: z.infer<typeof loginFormSchema>) {
    loginHandler(values);
  }

  return (
    <div className="w-[30rem] rounded-md bg-secondary p-6">
      <h1 className="text-3xl font-bold">Login</h1>

      <Form {...form}>
        <form className="mt-8" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>

                  <FormControl>
                    <Input
                      placeholder="Your email..."
                      autoComplete="email"
                      {...field}
                    />
                  </FormControl>

                  <FormDescription>The email of your account.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>

                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Your password..."
                      autoComplete="current-password"
                      {...field}
                    />
                  </FormControl>

                  <FormDescription>
                    The password of your account.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button className="mt-8" type="submit">
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
}
