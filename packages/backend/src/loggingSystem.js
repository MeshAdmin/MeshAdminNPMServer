// Advanced Logging System with Live View
const EventEmitter = require('events');

class LoggingSystem extends EventEmitter {
  constructor() {
    super();
    this.logs = [];
    this.maxLogs = 10000; // Keep last 10k logs
  }

  log(level, message, source = 'system') {
    const logEntry = {
      id: Date.now() + Math.random(),
      level,
      message,
      source,
      timestamp: new Date().toISOString(),
    };

    this.logs.push(logEntry);

    // Keep only maxLogs entries
    if (this.logs.length > this.maxLogs) {
      this.logs = this.logs.slice(-this.maxLogs);
    }

    // Emit real-time log event
    this.emit('newLog', logEntry);

    return logEntry;
  }

  critical(message, source) {
    return this.log('critical', message, source);
  }

  warning(message, source) {
    return this.log('warning', message, source);
  }

  info(message, source) {
    return this.log('info', message, source);
  }

  debug(message, source) {
    return this.log('debug', message, source);
  }

  getLogs(filters = {}) {
    let filteredLogs = this.logs;

    if (filters.level) {
      filteredLogs = filteredLogs.filter(log => log.level === filters.level);
    }

    if (filters.source) {
      filteredLogs = filteredLogs.filter(log => log.source === filters.source);
    }

    if (filters.search) {
      filteredLogs = filteredLogs.filter(log =>
        log.message.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    return filteredLogs;
  }

  clearLogs() {
    this.logs = [];
    this.emit('logsCleared');
  }
}

const loggingSystem = new LoggingSystem();
module.exports = loggingSystem;
