import { UserRegisterSchema } from '@/modules/auth/register/schemas';
import { register } from '@/modules/auth/register/services';
import { UserRegisterData } from '@/modules/auth/register/types';
import { sessionAtom } from '@/modules/auth/states';
import { Button } from '@/shared/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/shared/components/ui/form';
import { Input } from '@/shared/components/ui/input';
import { type ResponseError } from '@/shared/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { type AxiosError } from 'axios';
import { useAtom } from 'jotai';
import { Loader2 } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';

/**
 * Register form component
 */
export function RegisterForm() {
  const [_, setSession] = useAtom(sessionAtom);
  const navigate = useNavigate();
  const [registerError, setRegisterError] = useState<string | undefined>(
    undefined
  );

  const { mutate: registerHandler, isPending } = useMutation({
    mutationFn: register,
    onSuccess: (response) => {
      const userId = response.data.user_id;
      const accessToken = response.data.access_token;

      setSession(`${userId}:${accessToken}`);

      navigate(`/user/${userId}`);
    },
    onError: (error: AxiosError<ResponseError>) => {
      setRegisterError(error.response?.data.detail);
    },
  });

  const form = useForm<UserRegisterData>({
    resolver: zodResolver(UserRegisterSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  /**
   * Register form submit handler
   * @param {UserRegisterData} userRegisterData - The user register data
   */
  function onSubmit(userRegisterData: UserRegisterData) {
    registerHandler(userRegisterData);
  }

  return (
    <div className="relative w-[30rem] rounded-md border bg-card p-6 shadow">
      <h1 className="text-3xl font-bold">Register</h1>

      <Form {...form}>
        <form className="mt-8" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>

                  <FormControl>
                    <Input
                      placeholder="Your name..."
                      autoComplete="name"
                      {...field}
                    />
                  </FormControl>

                  <FormDescription>What is your name?</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

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

                  <FormDescription>What is your email?</FormDescription>
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

                  <FormDescription>What will be your password?</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <p className="mt-8 text-sm">
            Already have an account?{' '}
            <Link to="/auth/login" className="text-blue-500 underline">
              Login
            </Link>
          </p>

          <Button className="mt-8 w-full" type="submit" disabled={isPending}>
            Submit
            {isPending && <Loader2 className="animate-spin" />}
          </Button>
        </form>
      </Form>

      {registerError && (
        <p className="absolute -top-8 right-0 rounded-md bg-red-200 px-1.5 py-0.5 text-xs text-red-500">
          {registerError}
        </p>
      )}
    </div>
  );
}
