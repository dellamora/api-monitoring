# API Monitoring Setup

A straightforward monitoring stack for tracking API performance and health using Node.js, Prometheus, and Grafana.

## Stack
- Node.js API with basic endpoints
- Prometheus for metrics collection
- Grafana for visualization

## Quick Start
```bash
# Start API
node app.js

# Start Prometheus
prometheus --config.file=prometheus.yml

# Start Grafana
brew services start grafana
```
## Access Points

- API: http://localhost:3001
- Prometheus: http://localhost:9090
- Grafana: http://localhost:3000 (default login: admin/admin)

## Basic Metrics

- Request counts by endpoint
- Response times
- Error rates
- HTTP status codes

## Troubleshooting

If metrics aren't appearing in Grafana, verify that both the API and Prometheus are running and properly configured.

## Purpose

Perfect for local development monitoring and learning the basics of application observability.

Built for educational purposes. Contributions welcome.
