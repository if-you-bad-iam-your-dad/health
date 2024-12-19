import React from 'react';

interface SidebarSectionProps {
  title: string;
  children: React.ReactNode;
}

export default function SidebarSection({ title, children }: SidebarSectionProps) {
  return (
    <div className="space-y-1">
      <h3 className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
        {title}
      </h3>
      <div className="space-y-1">
        {children}
      </div>
    </div>
  );
}