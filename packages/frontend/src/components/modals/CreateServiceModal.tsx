import React, { useState } from 'react';
import { X, HelpCircle, FolderOpen } from 'lucide-react';
import { selectFile, selectDirectory } from '../../utils/fileDialog';

interface CreateServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (service: ServiceFormData) => void;
}

interface ServiceFormData {
  name: string;
  description: string;
  type: string;
  config: {
    script?: string;
    cwd?: string;
    instances?: number;
    execMode?: string;
    watch?: boolean;
    env?: Record<string, string>;
  };
}

const CreateServiceModal: React.FC<CreateServiceModalProps> = ({ isOpen, onClose, onCreate }) => {
  const [formData, setFormData] = useState<ServiceFormData>({
    name: '',
    description: '',
    type: 'pm2',
    config: {
      script: '',
      cwd: '/',
      instances: 1,
      execMode: 'fork',
      watch: false,
      env: {},
    },
  });

  const [envKey, setEnvKey] = useState('');
  const [envValue, setEnvValue] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCreate(formData);
    // Reset form
    setFormData({
      name: '',
      description: '',
      type: 'pm2',
      config: {
        script: '',
        cwd: '/',
        instances: 1,
        execMode: 'fork',
        watch: false,
        env: {},
      },
    });
    onClose();
  };

  const handleAddEnvVar = () => {
    if (envKey && envValue) {
      setFormData({
        ...formData,
        config: {
          ...formData.config,
          env: {
            ...formData.config.env,
            [envKey]: envValue,
          },
        },
      });
      setEnvKey('');
      setEnvValue('');
    }
  };

  const handleRemoveEnvVar = (key: string) => {
    const newEnv = { ...formData.config.env };
    delete newEnv[key];
    setFormData({
      ...formData,
      config: {
        ...formData.config,
        env: newEnv,
      },
    });
  };

  const handleBrowseScript = async () => {
    const filePath = await selectFile();
    if (filePath) {
      setFormData(prev => ({
        ...prev,
        config: {
          ...prev.config,
          script: filePath
        }
      }));
    }
  };

  const handleBrowseDirectory = async () => {
    const dirPath = await selectDirectory();
    if (dirPath) {
      setFormData(prev => ({
        ...prev,
        config: {
          ...prev.config,
          cwd: dirPath
        }
      }));
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 border border-gray-700 rounded-xl p-6 w-full max-w-2xl max-h-[85vh] overflow-y-auto overflow-x-hidden">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-gray-100">Create New Service</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
          >
            <X size={20} className="text-gray-400" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Service Name */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              <span className="flex items-center gap-2">
                Service Name *
                <div className="group relative inline-block">
                  <HelpCircle className="h-4 w-4 text-gray-400 hover:text-gray-300 cursor-help" />
                  <div className="invisible group-hover:visible absolute z-10 w-64 p-2 mt-1 text-xs bg-gray-800 text-gray-300 rounded-lg shadow-lg border border-gray-700">
                    A unique identifier for your service. Use lowercase letters, numbers, and hyphens only.
                  </div>
                </div>
              </span>
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-gray-100 focus:outline-none focus:border-blue-500"
              placeholder="my-service"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              <span className="flex items-center gap-2">
                Description
                <div className="group relative inline-block">
                  <HelpCircle className="h-4 w-4 text-gray-400 hover:text-gray-300 cursor-help" />
                  <div className="invisible group-hover:visible absolute z-10 w-64 p-2 mt-1 text-xs bg-gray-800 text-gray-300 rounded-lg shadow-lg border border-gray-700">
                    Optional description to help you remember what this service does.
                  </div>
                </div>
              </span>
            </label>
            <input
              type="text"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-gray-100 focus:outline-none focus:border-blue-500"
              placeholder="Service description"
            />
          </div>

          {/* Service Type */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              <span className="flex items-center gap-2">
                Service Type
                <div className="group relative inline-block">
                  <HelpCircle className="h-4 w-4 text-gray-400 hover:text-gray-300 cursor-help" />
                  <div className="invisible group-hover:visible absolute z-10 w-64 p-2 mt-1 text-xs bg-gray-800 text-gray-300 rounded-lg shadow-lg border border-gray-700">
                    PM2: Node.js process manager<br/>
                    Systemd: Linux system service<br/>
                    Docker: Container-based service
                  </div>
                </div>
              </span>
            </label>
            <select
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-gray-100 focus:outline-none focus:border-blue-500"
            >
              <option value="pm2">PM2</option>
              <option value="systemd">Systemd</option>
              <option value="docker">Docker</option>
            </select>
          </div>

          {/* PM2 Specific Configuration */}
          {formData.type === 'pm2' && (
            <>
              {/* Script Path */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  <span className="flex items-center gap-2">
                    Script Path *
                    <div className="group relative inline-block">
                      <HelpCircle className="h-4 w-4 text-gray-400 hover:text-gray-300 cursor-help" />
                      <div className="invisible group-hover:visible absolute z-10 w-64 p-2 mt-1 text-xs bg-gray-800 text-gray-300 rounded-lg shadow-lg border border-gray-700">
                        The path to your application's main file (e.g., index.js, app.py, server.js)
                      </div>
                    </div>
                  </span>
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    required
                    value={formData.config.script}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        config: { ...formData.config, script: e.target.value },
                      })
                    }
                    className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-gray-100 focus:outline-none focus:border-blue-500"
                    placeholder="/path/to/script.js"
                  />
                  <button
                    type="button"
                    onClick={handleBrowseScript}
                    className="px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center gap-2 flex-shrink-0"
                    title="Browse for file"
                  >
                    <FolderOpen size={16} />
                    Browse
                  </button>
                </div>
              </div>

              {/* Working Directory */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  <span className="flex items-center gap-2">
                    Working Directory
                    <div className="group relative inline-block">
                      <HelpCircle className="h-4 w-4 text-gray-400 hover:text-gray-300 cursor-help" />
                      <div className="invisible group-hover:visible absolute z-10 w-64 p-2 mt-1 text-xs bg-gray-800 text-gray-300 rounded-lg shadow-lg border border-gray-700">
                        The directory where your service will run. Usually the folder containing your script.
                      </div>
                    </div>
                  </span>
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={formData.config.cwd}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        config: { ...formData.config, cwd: e.target.value },
                      })
                    }
                    className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-gray-100 focus:outline-none focus:border-blue-500"
                    placeholder="/path/to/working/directory"
                  />
                  <button
                    type="button"
                    onClick={handleBrowseDirectory}
                    className="px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center gap-2 flex-shrink-0"
                    title="Browse for directory"
                  >
                    <FolderOpen size={16} />
                    Browse
                  </button>
                </div>
              </div>

              {/* Instances and Exec Mode */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    <span className="flex items-center gap-2">
                      Instances
                      <div className="group relative inline-block">
                        <HelpCircle className="h-4 w-4 text-gray-400 hover:text-gray-300 cursor-help" />
                        <div className="invisible group-hover:visible absolute z-10 w-64 p-2 mt-1 text-xs bg-gray-800 text-gray-300 rounded-lg shadow-lg border border-gray-700">
                          Number of instances to run. Use 1 for single instance, or more for load balancing.
                        </div>
                      </div>
                    </span>
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={formData.config.instances}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        config: { ...formData.config, instances: parseInt(e.target.value) },
                      })
                    }
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-gray-100 focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    <span className="flex items-center gap-2">
                      Exec Mode
                      <div className="group relative inline-block">
                        <HelpCircle className="h-4 w-4 text-gray-400 hover:text-gray-300 cursor-help" />
                        <div className="invisible group-hover:visible absolute z-10 w-64 p-2 mt-1 text-xs bg-gray-800 text-gray-300 rounded-lg shadow-lg border border-gray-700">
                          Fork: Standard mode for most apps.<br/>
                          Cluster: For Node.js apps to utilize multiple CPU cores.
                        </div>
                      </div>
                    </span>
                  </label>
                  <select
                    value={formData.config.execMode}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        config: { ...formData.config, execMode: e.target.value },
                      })
                    }
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-gray-100 focus:outline-none focus:border-blue-500"
                  >
                    <option value="fork">Fork</option>
                    <option value="cluster">Cluster</option>
                  </select>
                </div>
              </div>

              {/* Watch Mode */}
              <div className="flex flex-wrap gap-2 items-center">
                <input
                  type="checkbox"
                  id="watch"
                  checked={formData.config.watch}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      config: { ...formData.config, watch: e.target.checked },
                    })
                  }
                  className="mr-2"
                />
                <label htmlFor="watch" className="text-sm text-gray-300">
                  Enable file watching (auto-restart on changes)
                </label>
              </div>

              {/* Environment Variables */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Environment Variables
                </label>
                <div className="space-y-2">
                  {/* Add new env var */}
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={envKey}
                      onChange={(e) => setEnvKey(e.target.value)}
                      placeholder="KEY"
                      className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-gray-100 focus:outline-none focus:border-blue-500"
                    />
                    <input
                      type="text"
                      value={envValue}
                      onChange={(e) => setEnvValue(e.target.value)}
                      placeholder="VALUE"
                      className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-gray-100 focus:outline-none focus:border-blue-500"
                    />
                    <button
                      type="button"
                      onClick={handleAddEnvVar}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                    >
                      Add
                    </button>

                  </div>
                  {/* Display existing env vars */}
                  {Object.entries(formData.config.env || {}).map(([key, value]) => (
                    <div key={key} className="flex items-center justify-between bg-gray-800 px-3 py-2 rounded-lg">
                      <span className="text-gray-300">
                        {key}={value}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleRemoveEnvVar(key)}
                        className="text-red-400 hover:text-red-300"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              Create Service
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateServiceModal;
