import React, { useState } from 'react';
import { X, Server, Globe, Settings, Check } from 'lucide-react';

interface ServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (serviceData: any) => void;
  service?: any;
  mode: 'create' | 'edit';
}

const ServiceModal: React.FC<ServiceModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  service,
  mode,
}) => {
  const [formData, setFormData] = useState({
    name: service?.name || '',
    port: service?.port || '',
    domain: service?.domain || '',
    type: service?.type || 'web',
    autoStart: service?.autoStart || false,
    enableSSL: service?.enableSSL || false,
    environment: service?.environment || 'development',
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Service name is required';
    }

    if (!formData.port || formData.port < 1 || formData.port > 65535) {
      newErrors.port = 'Port must be between 1 and 65535';
    }

    if (formData.domain && !/^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formData.domain)) {
      newErrors.domain = 'Please enter a valid domain';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
      onClose();
    }
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900/95 border border-gray-700/50 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700/50">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-600/30 rounded-lg border border-blue-500/20">
              <Server size={20} className="text-blue-300" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-100">
                {mode === 'create' ? 'Create New Service' : 'Edit Service'}
              </h2>
              <p className="text-sm text-gray-300">
                {mode === 'create'
                  ? 'Configure your new service settings'
                  : 'Update service configuration'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-200 transition-colors rounded-lg hover:bg-gray-800/50"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-100 flex items-center gap-2">
              <Settings size={18} />
              Basic Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Service Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={e => handleInputChange('name', e.target.value)}
                  className={`w-full px-3 py-2 bg-gray-800/50 border ${
                    errors.name ? 'border-red-500/50' : 'border-gray-600/50'
                  } rounded-lg text-gray-100 focus:border-blue-500/50 focus:outline-none transition-colors`}
                  placeholder="e.g., Frontend App"
                />
                {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Port *</label>
                <input
                  type="number"
                  value={formData.port}
                  onChange={e => handleInputChange('port', parseInt(e.target.value) || '')}
                  className={`w-full px-3 py-2 bg-gray-800/50 border ${
                    errors.port ? 'border-red-500/50' : 'border-gray-600/50'
                  } rounded-lg text-gray-100 focus:border-blue-500/50 focus:outline-none transition-colors`}
                  placeholder="3000"
                  min="1"
                  max="65535"
                />
                {errors.port && <p className="text-red-400 text-sm mt-1">{errors.port}</p>}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Service Type</label>
              <select
                value={formData.type}
                onChange={e => handleInputChange('type', e.target.value)}
                className="w-full px-3 py-2 bg-gray-800/50 border border-gray-600/50 rounded-lg text-gray-100 focus:border-blue-500/50 focus:outline-none transition-colors"
              >
                <option value="web">Web Application</option>
                <option value="api">API Service</option>
                <option value="microservice">Microservice</option>
              </select>
            </div>
          </div>

          {/* Network Configuration */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-100 flex items-center gap-2">
              <Globe size={18} />
              Network Configuration
            </h3>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Domain (Optional)
              </label>
              <input
                type="text"
                value={formData.domain}
                onChange={e => handleInputChange('domain', e.target.value)}
                className={`w-full px-3 py-2 bg-gray-800/50 border ${
                  errors.domain ? 'border-red-500/50' : 'border-gray-600/50'
                } rounded-lg text-gray-100 focus:border-blue-500/50 focus:outline-none transition-colors`}
                placeholder="example.com"
              />
              {errors.domain && <p className="text-red-400 text-sm mt-1">{errors.domain}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Environment</label>
              <select
                value={formData.environment}
                onChange={e => handleInputChange('environment', e.target.value)}
                className="w-full px-3 py-2 bg-gray-800/50 border border-gray-600/50 rounded-lg text-gray-100 focus:border-blue-500/50 focus:outline-none transition-colors"
              >
                <option value="development">Development</option>
                <option value="staging">Staging</option>
                <option value="production">Production</option>
              </select>
            </div>
          </div>

          {/* Options */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-100">Options</h3>

            <div className="space-y-3">
              <label className="flex items-center gap-3 cursor-pointer">
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={formData.autoStart}
                    onChange={e => handleInputChange('autoStart', e.target.checked)}
                    className="sr-only"
                  />
                  <div
                    className={`w-5 h-5 border-2 rounded ${
                      formData.autoStart
                        ? 'bg-blue-600 border-blue-600'
                        : 'border-gray-600 bg-gray-800/50'
                    } transition-colors`}
                  >
                    {formData.autoStart && (
                      <Check size={12} className="text-white absolute top-0.5 left-0.5" />
                    )}
                  </div>
                </div>
                <div>
                  <span className="text-gray-100 font-medium">Auto Start</span>
                  <p className="text-sm text-gray-400">
                    Start service automatically on server boot
                  </p>
                </div>
              </label>

              <label className="flex items-center gap-3 cursor-pointer">
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={formData.enableSSL}
                    onChange={e => handleInputChange('enableSSL', e.target.checked)}
                    className="sr-only"
                  />
                  <div
                    className={`w-5 h-5 border-2 rounded ${
                      formData.enableSSL
                        ? 'bg-green-600 border-green-600'
                        : 'border-gray-600 bg-gray-800/50'
                    } transition-colors`}
                  >
                    {formData.enableSSL && (
                      <Check size={12} className="text-white absolute top-0.5 left-0.5" />
                    )}
                  </div>
                </div>
                <div>
                  <span className="text-gray-100 font-medium">Enable SSL</span>
                  <p className="text-sm text-gray-400">Automatically configure SSL certificate</p>
                </div>
              </label>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 justify-end pt-4 border-t border-gray-700/50">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-300 border border-gray-600/50 rounded-lg hover:bg-gray-800/50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600/30 text-blue-300 border border-blue-500/30 rounded-lg hover:bg-blue-600/40 transition-colors"
            >
              {mode === 'create' ? 'Create Service' : 'Update Service'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ServiceModal;
