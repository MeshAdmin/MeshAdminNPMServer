import React, { useState, useEffect } from 'react';
import { X, Save, RotateCcw, AlertCircle, CheckCircle } from 'lucide-react';
import { Service, apiService } from '../../services/api';

interface ServiceConfigModalProps {
  service: Service | null;
  isOpen: boolean;
  onClose: () => void;
  onSave?: (serviceId: string, config: any) => void;
}

interface ConfigField {
  key: string;
  value: string;
  type: 'text' | 'number' | 'boolean' | 'json';
}

const ServiceConfigModal: React.FC<ServiceConfigModalProps> = ({
  service,
  isOpen,
  onClose,
  onSave,
}) => {
  const [configFields, setConfigFields] = useState<ConfigField[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    if (service && isOpen) {
      // Convert service config to editable fields
      const config = service.config || {};
      const fields: ConfigField[] = [];

      // Add default fields that are commonly used
      const commonFields = [
        'port',
        'host',
        'env',
        'script',
        'args',
        'watch',
        'instances',
        'exec_mode',
      ];

      // Add existing config fields
      Object.keys(config).forEach(key => {
        fields.push({
          key,
          value:
            typeof config[key] === 'object'
              ? JSON.stringify(config[key], null, 2)
              : String(config[key]),
          type: getFieldType(config[key]),
        });
      });

      // Add common fields if they don't exist
      commonFields.forEach(field => {
        if (!fields.find(f => f.key === field)) {
          fields.push({
            key: field,
            value: getDefaultValue(field),
            type: getDefaultType(field),
          });
        }
      });

      setConfigFields(fields);
      setSaveError(null);
      setSaveSuccess(false);
    }
  }, [service, isOpen]);

  const getFieldType = (value: any): 'text' | 'number' | 'boolean' | 'json' => {
    if (typeof value === 'number') return 'number';
    if (typeof value === 'boolean') return 'boolean';
    if (typeof value === 'object') return 'json';
    return 'text';
  };

  const getDefaultType = (field: string): 'text' | 'number' | 'boolean' | 'json' => {
    if (['port', 'instances'].includes(field)) return 'number';
    if (['watch', 'merge_logs', 'combine_logs'].includes(field)) return 'boolean';
    if (['env', 'args'].includes(field)) return 'json';
    return 'text';
  };

  const getDefaultValue = (field: string): string => {
    switch (field) {
      case 'port':
        return '3000';
      case 'host':
        return 'localhost';
      case 'env':
        return 'NODE_ENV=development';
      case 'script':
        return 'index.js';
      case 'args':
        return '[]';
      case 'watch':
        return 'false';
      case 'instances':
        return '1';
      case 'exec_mode':
        return 'fork';
      default:
        return '';
    }
  };

  const updateField = (index: number, key: string, value: string) => {
    setConfigFields(prev =>
      prev.map((field, i) => (i === index ? { ...field, key, value } : field))
    );
  };

  const addField = () => {
    setConfigFields(prev => [...prev, { key: '', value: '', type: 'text' }]);
  };

  const removeField = (index: number) => {
    setConfigFields(prev => prev.filter((_, i) => i !== index));
  };

  const parseValue = (value: string, type: 'text' | 'number' | 'boolean' | 'json'): any => {
    switch (type) {
      case 'number':
        const num = Number(value);
        return isNaN(num) ? value : num;
      case 'boolean':
        return value.toLowerCase() === 'true';
      case 'json':
        try {
          return JSON.parse(value);
        } catch {
          return value;
        }
      default:
        return value;
    }
  };

  const handleSave = async () => {
    if (!service) return;

    setIsSaving(true);
    setSaveError(null);

    try {
      // Convert fields back to config object
      const config: any = {};
      configFields.forEach(field => {
        if (field.key.trim()) {
          config[field.key] = parseValue(field.value, field.type);
        }
      });

      // Update service via API
      await apiService.updateService(service.id, { config });

      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);

      if (onSave) {
        onSave(service.id, config);
      }
    } catch (error: any) {
      setSaveError(
        error.response?.data?.message || error.message || 'Failed to save configuration'
      );
    } finally {
      setIsSaving(false);
    }
  };

  const resetConfig = () => {
    if (service) {
      const config = service.config || {};
      const fields: ConfigField[] = Object.keys(config).map(key => ({
        key,
        value:
          typeof config[key] === 'object'
            ? JSON.stringify(config[key], null, 2)
            : String(config[key]),
        type: getFieldType(config[key]),
      }));
      setConfigFields(fields);
      setSaveError(null);
      setSaveSuccess(false);
    }
  };

  if (!isOpen || !service) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gray-900 rounded-2xl border border-gray-700 shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <div>
            <h2 className="text-2xl font-bold text-gray-100">Service Configuration</h2>
            <p className="text-gray-400 mt-1">
              {service.name} - {service.type}
            </p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
            <X size={24} className="text-gray-400" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[70vh]">
          {/* Save Status */}
          {saveError && (
            <div className="mb-4 p-3 bg-red-600/20 border border-red-500/30 rounded-lg flex items-center gap-2 text-red-300">
              <AlertCircle size={16} />
              <span className="text-sm">{saveError}</span>
            </div>
          )}

          {saveSuccess && (
            <div className="mb-4 p-3 bg-green-600/20 border border-green-500/30 rounded-lg flex items-center gap-2 text-green-300">
              <CheckCircle size={16} />
              <span className="text-sm">Configuration saved successfully!</span>
            </div>
          )}

          {/* Configuration Fields */}
          <div className="space-y-4">
            {configFields.map((field, index) => (
              <div key={index} className="flex gap-3 items-start">
                <div className="flex-1">
                  <input
                    type="text"
                    placeholder="Key"
                    value={field.key}
                    onChange={e => updateField(index, e.target.value, field.value)}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-gray-100 placeholder-gray-400 focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div className="flex-2">
                  {field.type === 'json' ? (
                    <textarea
                      placeholder="Value (JSON)"
                      value={field.value}
                      onChange={e => updateField(index, field.key, e.target.value)}
                      rows={3}
                      className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-gray-100 placeholder-gray-400 focus:outline-none focus:border-blue-500 font-mono text-sm"
                    />
                  ) : (
                    <input
                      type={field.type === 'number' ? 'number' : 'text'}
                      placeholder="Value"
                      value={field.value}
                      onChange={e => updateField(index, field.key, e.target.value)}
                      className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-gray-100 placeholder-gray-400 focus:outline-none focus:border-blue-500"
                    />
                  )}
                </div>
                <div className="flex-shrink-0">
                  <select
                    value={field.type}
                    onChange={e =>
                      setConfigFields(prev =>
                        prev.map((f, i) =>
                          i === index ? { ...f, type: e.target.value as any } : f
                        )
                      )
                    }
                    className="px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-gray-100 focus:outline-none focus:border-blue-500"
                  >
                    <option value="text">Text</option>
                    <option value="number">Number</option>
                    <option value="boolean">Boolean</option>
                    <option value="json">JSON</option>
                  </select>
                </div>
                <button
                  onClick={() => removeField(index)}
                  className="px-3 py-2 bg-red-600/30 text-red-300 rounded-lg hover:bg-red-600/40 transition-colors"
                >
                  <X size={16} />
                </button>
              </div>
            ))}

            <button
              onClick={addField}
              className="w-full py-2 px-4 bg-gray-800 border border-gray-600 rounded-lg text-gray-300 hover:bg-gray-700 transition-colors"
            >
              + Add Field
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 bg-gray-800/50 border-t border-gray-700">
          <button
            onClick={resetConfig}
            className="flex items-center gap-2 px-4 py-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 transition-colors"
          >
            <RotateCcw size={16} />
            Reset
          </button>
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              <Save size={16} />
              {isSaving ? 'Saving...' : 'Save Configuration'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceConfigModal;
