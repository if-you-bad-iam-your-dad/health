import React from 'react';
import { useForm } from '../../hooks/useForm';
import Input from '../shared/Input';
import Button from '../shared/Button';
import { MessageSquare } from 'lucide-react';

interface QueryFormData {
  title: string;
  description: string;
  attachments?: FileList;
}

interface NewQueryFormProps {
  onSubmit: (data: QueryFormData) => void;
  onCancel: () => void;
}

export default function NewQueryForm({ onSubmit, onCancel }: NewQueryFormProps) {
  const { values, errors, handleChange, handleBlur, validateAll } = useForm<QueryFormData>(
    {
      title: '',
      description: '',
    },
    {
      title: { required: true, minLength: 5, maxLength: 100 },
      description: { required: true, minLength: 20, maxLength: 1000 },
    }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateAll()) {
      onSubmit(values);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Query Title"
        name="title"
        id="title"
        icon={MessageSquare}
        value={values.title}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.title}
        placeholder="Brief title for your query"
      />

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          rows={4}
          className={`mt-1 block w-full rounded-md shadow-sm ${
            errors.description
              ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
              : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500'
          }`}
          value={values.description}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Detailed description of your query..."
        />
        {errors.description && (
          <p className="mt-1 text-sm text-red-600">{errors.description}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Attachments (optional)
        </label>
        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
          <div className="space-y-1 text-center">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 48 48"
              aria-hidden="true"
            >
              <path
                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <div className="flex text-sm text-gray-600">
              <label
                htmlFor="file-upload"
                className="relative cursor-pointer rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
              >
                <span>Upload files</span>
                <input
                  id="file-upload"
                  name="attachments"
                  type="file"
                  className="sr-only"
                  multiple
                  onChange={handleChange}
                />
              </label>
              <p className="pl-1">or drag and drop</p>
            </div>
            <p className="text-xs text-gray-500">PNG, JPG, PDF up to 10MB</p>
          </div>
        </div>
      </div>

      <div className="flex justify-end space-x-3">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">Submit Query</Button>
      </div>
    </form>
  );
}