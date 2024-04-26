import { SidebarDesktop } from '#/ui/sidebar-desktop';

import { MaiAI } from '../action';

interface ChatLayoutProps {
  children: React.ReactNode;
}

export default async function ChatLayout({ children }: ChatLayoutProps) {
  return (
    <div className="relative flex h-[calc(100vh_-_theme(spacing.16))] overflow-hidden">
      <SidebarDesktop />
      <MaiAI>{children}</MaiAI>
    </div>
  );
}