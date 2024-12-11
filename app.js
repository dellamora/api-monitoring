const express = require('express');
const client = require('prom-client');
const app = express();

const register = new client.Registry();
client.collectDefaultMetrics({ register });

const httpRequestsTotal = new client.Counter({
    name: 'http_requests_total',
    help: 'Total de requisições HTTP',
    labelNames: ['method', 'status', 'endpoint']
});

const httpRequestDuration = new client.Histogram({
    name: 'http_request_duration_seconds',
    help: 'Duração das requisições HTTP',
    labelNames: ['method', 'status', 'endpoint']
});

register.registerMetric(httpRequestsTotal);
register.registerMetric(httpRequestDuration);

app.use((req, res, next) => {
    const end = httpRequestDuration.startTimer();
    res.on('finish', () => {
        httpRequestsTotal.inc({
            method: req.method,
            status: res.statusCode,
            endpoint: req.path
        });
        end({
            method: req.method,
            status: res.statusCode,
            endpoint: req.path
        });
    });
    next();
});

app.get('/metrics', async (req, res) => {
    res.set('Content-Type', register.contentType);
    res.end(await register.metrics());
});

app.get('/api/users', (req, res) => {
    setTimeout(() => {
        res.json({ users: ['Justin', 'Francielle', 'Oliver'] });
    }, Math.random() * 1000); 
});

app.get('/api/products', (req, res) => {
    setTimeout(() => {
        res.json({ products: ['Laptop', 'Mouse', 'Keyboard'] });
    }, Math.random() * 1000);
});

app.listen(3001, () => {
    console.log('lol 3001');
});
