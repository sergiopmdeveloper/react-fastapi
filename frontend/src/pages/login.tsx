import { LoginForm } from '@/components/app/login/login-form';

/**
 * Login page
 */
export default function LoginPage() {
  return (
    <main>
      <section className="flex h-screen w-full items-center justify-center">
        <LoginForm />
      </section>
    </main>
  );
}
