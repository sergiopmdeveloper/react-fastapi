import { LoginForm } from '@/modules/auth/login/components';
import Header from '@/shared/components/app/header';

/**
 * Login page
 */
export default function LoginPage() {
  return (
    <div className="w-full">
      <Header />

      <main>
        <section className="flex h-[calc(100vh-5rem)] w-full items-center justify-center">
          <LoginForm />
        </section>
      </main>
    </div>
  );
}
