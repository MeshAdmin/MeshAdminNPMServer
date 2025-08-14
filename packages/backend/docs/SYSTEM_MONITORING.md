# System Monitoring Agent

This system monitoring agent collects CPU, RAM, Disk, and Network metrics every 5 seconds using the `systeminformation` library, stores rolling metrics in Redis, and broadcasts them to clients via WebSocket.

## Features

- **Real-time Metrics Collection**: Collects system metrics every 5 seconds
- **Comprehensive Monitoring**: CPU, Memory, Disk, and Network statistics
- **Redis Storage**: Stores rolling metrics with configurable history size
- **WebSocket Broadcasting**: Real-time updates to connected clients
- **REST API**: HTTP endpoints for accessing metrics data
- **Alert System**: Configurable thresholds with warning/critical alerts
- **Health Monitoring**: Built-in health checks and status monitoring

## Configuration

Environment variables for configuration:

```bash
# Redis Configuration
REDIS_HOST=localhost                    # Redis host (default: localhost)
REDIS_PORT=6379                        # Redis port (default: 6379)
REDIS_PASSWORD=                         # Redis password (optional)
REDIS_DB=0                             # Redis database number (default: 0)

# System Monitoring Configuration
SYSTEM_MONITORING_INTERVAL=5000        # Collection interval in ms (default: 5000ms)
SYSTEM_MONITORING_HISTORY_SIZE=1440    # Number of metrics to keep (default: 1440 = 12 hours at 5s intervals)
```

## Metrics Collected

### CPU Metrics

- Usage percentage
- Load averages (1min, 5min, 15min)
- Number of cores
- CPU speed (GHz)
- Temperature (when available)

### Memory Metrics

- Total, used, free, available memory (bytes)
- Memory usage percentage
- Swap memory statistics

### Disk Metrics

- Total, used, free disk space (bytes)
- Disk usage percentage
- Read/write speeds (bytes/sec)
- Read/write IOPS

### Network Metrics

- Per-interface statistics (bytes/packets sent/received)
- Interface status and configuration
- Total network activity across all interfaces

## API Endpoints

All endpoints require authentication. Base path: `/api/system-monitoring`

### GET /status

Get system monitoring service status.

**Response:**

```json
{
  "success": true,
  "data": {
    "isRunning": true,
    "uptime": 3600,
    "redisConnected": true
  }
}
```

### GET /latest

Get the most recent system metrics.

**Response:**

```json
{
  "success": true,
  "data": {
    "timestamp": 1640995200000,
    "cpu": {
      "usage": 25.5,
      "load": [1.2, 1.5, 1.8],
      "cores": 8,
      "speed": 3.2,
      "temperature": 45.2
    },
    "memory": {
      "total": 17179869184,
      "used": 8589934592,
      "free": 8589934592,
      "available": 8589934592,
      "usage": 50.0,
      "swap": {
        "total": 2147483648,
        "used": 0,
        "free": 2147483648,
        "usage": 0
      }
    },
    "disk": {
      "total": 1000000000000,
      "used": 500000000000,
      "free": 500000000000,
      "usage": 50.0,
      "readSpeed": 1048576,
      "writeSpeed": 524288,
      "iops": {
        "read": 100,
        "write": 50
      }
    },
    "network": {
      "interfaces": [...],
      "totalBytesReceived": 1048576000,
      "totalBytesSent": 524288000,
      "totalPacketsReceived": 1000000,
      "totalPacketsSent": 500000
    }
  }
}
```

### GET /history?count=100

Get historical system metrics.

**Query Parameters:**

- `count` (optional): Number of records to retrieve (default: 100, max: 1000)

### GET /summary

Get aggregated system monitoring summary with averages and peaks over the last 5 minutes.

### GET /health

Health check endpoint for system monitoring components.

### POST /start

Start system monitoring (admin only).

### POST /stop

Stop system monitoring (admin only).

## WebSocket Events

Clients can subscribe to real-time system monitoring updates by joining the `system-monitoring` room.

### Client Events

```javascript
// Join monitoring room
socket.emit('join-system-monitoring');

// Leave monitoring room
socket.emit('leave-system-monitoring');
```

### Server Events

```javascript
// Listen for system monitoring events
socket.on('system-monitoring', event => {
  switch (event.type) {
    case 'system-metrics':
      // Real-time metrics data
      console.log('New metrics:', event.data);
      break;
    case 'system-alert':
      // Alert notifications
      console.log('Alert:', event.data);
      break;
    case 'system-status':
      // System health status
      console.log('Status:', event.data);
      break;
  }
});
```

## Alert System

The system monitoring includes configurable alert thresholds:

- **CPU Usage**: Warning at 80%, Critical at 95%
- **Memory Usage**: Warning at 85%, Critical at 95%
- **Disk Usage**: Warning at 90%, Critical at 98%

Alerts are broadcast via WebSocket and can be retrieved through the API.

## Usage Examples

### Starting the Server

The system monitoring starts automatically when the server starts:

```bash
pnpm run dev
```

### Testing the System

Run the test script to verify functionality:

```bash
npx tsx scripts/test-system-monitoring.ts
```

### Frontend Integration

```javascript
// Connect to WebSocket
const socket = io('http://localhost:3000');

// Join system monitoring room
socket.emit('join-system-monitoring');

// Listen for metrics
socket.on('system-monitoring', event => {
  if (event.type === 'system-metrics') {
    updateDashboard(event.data);
  }
});

// Alternatively, use REST API
fetch('/api/system-monitoring/latest')
  .then(response => response.json())
  .then(data => {
    console.log('Latest metrics:', data);
  });
```

## Architecture

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│ systeminformation│───▶│SystemMonitoring  │───▶│     Redis       │
│    Library      │    │    Service       │    │   (Storage)     │
└─────────────────┘    └──────────────────┘    └─────────────────┘
                               │
                               ▼
                       ┌──────────────────┐
                       │   WebSocket      │
                       │  Broadcasting    │
                       └──────────────────┘
                               │
                               ▼
                       ┌──────────────────┐
                       │   Connected      │
                       │    Clients       │
                       └──────────────────┘
```

## Performance Considerations

- **Memory Usage**: The service stores metrics in memory and Redis. With default settings (1440 records), memory usage is minimal.
- **CPU Impact**: Metric collection runs every 5 seconds with minimal CPU overhead.
- **Network Traffic**: WebSocket broadcasts are sent only to subscribed clients.
- **Redis Storage**: Metrics are stored as JSON strings with automatic cleanup of old data.

## Troubleshooting

### Redis Connection Issues

- Ensure Redis is running: `redis-server`
- Check Redis configuration in environment variables
- Monitor logs for Redis connection errors

### Missing Metrics

- Verify system permissions for hardware access
- Check if `systeminformation` supports your platform
- Review logs for collection errors

### WebSocket Connection Problems

- Ensure clients are properly joining the `system-monitoring` room
- Check CORS configuration for WebSocket connections
- Verify authentication middleware is working

## Dependencies

- **systeminformation**: ^5.21.22 - System information library
- **redis**: ^4.6.5 - Redis client
- **socket.io**: ^4.7.5 - WebSocket library

## License

This system monitoring agent is part of the Mesh Admin project and follows the same license terms.
