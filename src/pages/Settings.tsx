import React, { useState, useEffect } from "react";
import { User, Bell, Globe } from "lucide-react";
import Input from "../components/shared/Input";
import Button from "../components/shared/Button";
import { User as UserType } from "../types";
import { useLanguage } from "../contexts/LanguageContext";
import { translations } from "../utils/translations";

const mockUser: UserType = {
  id: "1",
  name: "John Doe",
  email: "john@example.com",
  age: 35,
  role: "patient",
  language: "en",
  emergencyContact: {
    name: "Jane Doe",
    phone: "+1234567890",
    relation: "Spouse",
  },
};

export default function Settings() {
  const [user, setUser] = useState(mockUser);
  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    appointments: true,
  });
  const { language, setLanguage } = useLanguage();

  useEffect(() => {
    setUser((prev) => ({ ...prev, language }));
  }, [language]);

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(e.target.value);
  };

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle profile update logic
  };

  return (
    <div className="min-w-full">
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">
        {translations[language]["settings"]}
      </h1>

      <div className="bg-white shadow rounded-lg divide-y divide-gray-200">
        {/* Profile Settings */}
        <div className="p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">
            {translations[language]["profile.settings"]}
          </h2>
          <form onSubmit={handleProfileUpdate} className="space-y-4">
            <Input
              label={translations[language]["fullName"]}
              id="name"
              icon={User}
              value={user.name}
              onChange={(e) => setUser({ ...user, name: e.target.value })}
            />
            <Input
              label={translations[language]["email"]}
              type="email"
              id="email"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
            />
            <Input
              label={translations[language]["age"]}
              type="number"
              id="age"
              value={user.age}
              onChange={(e) =>
                setUser({ ...user, age: parseInt(e.target.value) })
              }
            />

            <div className="pt-4">
              <h3 className="text-md font-medium text-gray-900 mb-3">
                {translations[language]["emergency.contact"]}
              </h3>
              <div className="space-y-4">
                <Input
                  label={translations[language]["contactName"]}
                  id="emergencyName"
                  value={user.emergencyContact?.name || ""}
                  onChange={(e) =>
                    setUser({
                      ...user,
                      emergencyContact: {
                        ...user.emergencyContact!,
                        name: e.target.value,
                      },
                    })
                  }
                />
                <Input
                  label={translations[language]["contactPhone"]}
                  id="emergencyPhone"
                  value={user.emergencyContact?.phone || ""}
                  onChange={(e) =>
                    setUser({
                      ...user,
                      emergencyContact: {
                        ...user.emergencyContact!,
                        phone: e.target.value,
                      },
                    })
                  }
                />
                <Input
                  label={translations[language]["relationship"]}
                  id="emergencyRelation"
                  value={user.emergencyContact?.relation || ""}
                  onChange={(e) =>
                    setUser({
                      ...user,
                      emergencyContact: {
                        ...user.emergencyContact!,
                        relation: e.target.value,
                      },
                    })
                  }
                />
              </div>
            </div>

            <Button type="submit">
              {translations[language]["save.changes"]}
            </Button>
          </form>
        </div>

        {/* Notification Settings */}
        <div className="p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
            <Bell className="h-5 w-5 mr-2" />
            {translations[language]["notification.settings"]}
          </h2>
          <div className="space-y-4">
            {Object.entries(notifications).map(([key, value]) => (
              <div key={key} className="flex items-center justify-between">
                <span className="text-gray-700">
                  {translations[language][`${key}Notifications`]}
                </span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={value}
                    onChange={(e) =>
                      setNotifications({
                        ...notifications,
                        [key]: e.target.checked,
                      })
                    }
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Language Settings */}
        <div className="p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
            <Globe className="h-5 w-5 mr-2" />
            {translations[language]["language.settings"]}
          </h2>
          <div className="max-w-xs">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {translations[language]["selectLanguage"]}
            </label>
            <select
              value={language}
              onChange={handleLanguageChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              <option value="en">{translations[language]["english"]}</option>
              <option value="hi">{translations[language]["hindi"]}</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
