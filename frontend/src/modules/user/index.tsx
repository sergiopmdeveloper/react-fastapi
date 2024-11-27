import useValidateUserId from '@/modules/user/hooks';
import { ThemeToggle } from '@/shared/components/app/theme-toggle';
import { useParams } from 'react-router-dom';

/**
 * User page
 */
export default function UserPage() {
  const { userId } = useParams<{ userId: string }>();

  useValidateUserId(userId as string);

  return (
    <main>
      <section className="flex h-screen w-full items-center justify-center">
        <h1>User {userId}</h1>
        <ThemeToggle />
      </section>
    </main>
  );
}
