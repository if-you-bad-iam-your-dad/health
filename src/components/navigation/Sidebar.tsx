import React from 'react';
import { Link } from 'react-router-dom';
import { translations } from '../../utils/translations';
import { useLanguage } from '../../contexts/LanguageContext';

export function Sidebar() {
  const { language } = useLanguage();
  
  return (
    <nav className="space-y-4">
      <Link 
        to="/dashboard" 
        className="flex items-center p-2 hover:bg-gray-100"
      >
        {translations[language].dashboard}  {/* Remove hardcoded 'hi' */}
      </Link>
      <Link 
        to="/treatment" 
        className="flex items-center p-2 hover:bg-gray-100"
      >
        {translations[language].myTreatment}  {/* Remove hardcoded 'hi' */}
      </Link>
      <Link 
        to="/queries" 
        className="flex items-center p-2 hover:bg-gray-100"
      >
        {translations[language].myQueries}  {/* Remove hardcoded 'hi' */}
      </Link>
    </nav>
  );
}
