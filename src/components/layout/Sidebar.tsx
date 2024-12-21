import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import SidebarLink from "./sidebar/SidebarLink";
import SidebarSection from "./sidebar/SidebarSection";
import SidebarProfile from "./sidebar/SidebarProfile";
import { navigation } from "./sidebar/navigation";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth(); 

  // Filter navigation items based on user role
  const filteredNavigation = navigation.filter(
    (item) => !item.requiredRole || item.requiredRole === user?.role
  );

  const mainNavigation = filteredNavigation.filter(
    (item) => item.section === "main"
  );
  const managementNavigation = filteredNavigation.filter(
    (item) => item.section === "management"
  );
  const systemNavigation = filteredNavigation.filter(
    (item) => item.section === "system"
  );

  return (
    <div className="relative">
      {/* Mobile Menu Button */}
      <button
        className="fixed top-[1.125rem] left-4 z-[60] lg:hidden" // Increased z-index
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-[45] lg:hidden" // Adjusted z-index
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
        fixed top-0 left-0 h-screen z-[51]
        transform transition-transform duration-300 ease-in-out
        pt-16 // Add padding-top for mobile
        lg:translate-x-0 lg:static lg:h-screen
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        w-64 bg-white shadow-lg border-r border-gray-200
        flex flex-col
      `}
      >
        <div className="flex-1 flex flex-col min-h-0">
          <div className="pt-2">
            {" "}
            {/* Reduced padding-top */}
            <SidebarProfile />
          </div>

          <div className="flex-1 flex flex-col gap-6 px-2 pb-4 overflow-y-auto">
            <SidebarSection title="Main">
              {mainNavigation.map((item) => (
                <SidebarLink
                  key={item.name}
                  to={item.to}
                  icon={item.icon}
                  label={item.name}
                  onClick={() => setIsOpen(false)}
                />
              ))}
            </SidebarSection>

            {managementNavigation.length > 0 && (
              <SidebarSection title="Management">
                {managementNavigation.map((item) => (
                  <SidebarLink
                    key={item.name}
                    to={item.to}
                    icon={item.icon}
                    label={item.name}
                    onClick={() => setIsOpen(false)}
                  />
                ))}
              </SidebarSection>
            )}

            <SidebarSection title="System">
              {systemNavigation.map((item) => (
                <SidebarLink
                  key={item.name}
                  to={item.to}
                  icon={item.icon}
                  label={item.name}
                  onClick={() => setIsOpen(false)}
                />
              ))}
            </SidebarSection>
          </div>

          {/* Bottom padding div */}
          <div className="h-4 bg-white" />
        </div>
      </div>
    </div>
  );
}
