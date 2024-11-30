import { RegisterForm } from '@/modules/auth/register/components';
import Header from '@/shared/components/app/header';

/**
 * Register page
 */
export default function RegisterPage() {
  return (
    <div className="w-full">
      <Header />

      <main>
        <section className="flex h-[calc(100vh-5rem)] w-full items-center justify-center">
          <RegisterForm />
        </section>
      </main>
    </div>
  );
}
