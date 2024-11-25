import { RegisterForm } from '@/modules/auth/register/components';

/**
 * Register page
 */
export default function RegisterPage() {
  return (
    <main>
      <section className="flex h-screen w-full items-center justify-center">
        <RegisterForm />
      </section>
    </main>
  );
}
