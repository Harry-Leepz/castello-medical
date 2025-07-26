type MainLayoutProps = {
  sidebar: React.ReactNode;
  children: React.ReactNode;
};

export default function MainLayout({ sidebar, children }: MainLayoutProps) {
  return (
    <div className='flex flex-col md:flex-row h-full w-full'>
      {/* Sidebar on top (mobile) or left (desktop) */}
      <div className='w-full md:w-[250px] shrink-0 border-r p-4 overflow-auto'>
        {sidebar}
      </div>

      {/* Main content: table */}
      <div className='flex-1 p-4 overflow-auto'>{children}</div>
    </div>
  );
}
