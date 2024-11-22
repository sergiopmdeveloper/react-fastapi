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
import { Loader2 } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';

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

type LoginFormType = z.infer<typeof loginFormSchema>;

/**
 * Login form component
 */
export function LoginForm() {
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState<string | undefined>(undefined);

  const { mutate: loginHandler, isPending } = useMutation({
    mutationFn: login,
    onSuccess: (response) => {
      const userId = response.data.user_id;
      const accessToken = response.data.access_token;

      const session = `${userId}:${accessToken}`;
      localStorage.setItem('session', session);

      navigate(`/user/${userId}`);
    },
    onError: (error: AxiosError<LoginErrorResponse>) => {
      setLoginError(error.response?.data.detail);
    },
  });

  const form = useForm<LoginFormType>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  /**
   * Login form submit handler
   * @param {LoginFormType} values - User credentials
   */
  function onSubmit(values: LoginFormType) {
    loginHandler(values);
  }

  return (
    <div className="relative w-[30rem] rounded-md bg-secondary p-6">
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

          <Button className="mt-8 w-full" type="submit" disabled={isPending}>
            Submit
            {isPending && <Loader2 className="animate-spin" />}
          </Button>
        </form>
      </Form>

      {loginError && (
        <p className="absolute -top-8 right-0 rounded-md bg-red-200 px-1.5 py-0.5 text-xs text-red-500">
          {loginError}
        </p>
      )}
    </div>
  );
}
