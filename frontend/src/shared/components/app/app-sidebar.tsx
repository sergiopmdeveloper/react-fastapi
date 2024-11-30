import { sessionAtom } from '@/modules/auth/states';
import { getSessionUserId } from '@/modules/auth/utils';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/shared/components/ui/sidebar';
import { useAtom } from 'jotai';
import { LogIn, User } from 'lucide-react';

/**
 * App sidebar
 */
export function AppSidebar() {
  const [session, _] = useAtom(sessionAtom);

  let items = [];

  if (session) {
    items.push({
      title: 'Account',
      url: `/user/${getSessionUserId(session)}`,
      icon: User,
    });
  } else {
    items.push({
      title: 'Login',
      url: '/auth/login',
      icon: LogIn,
    });

    items.push({
      title: 'Register',
      url: '/auth/register',
      icon: User,
    });
  }

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>App name</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
