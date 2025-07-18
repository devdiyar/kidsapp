# Docker Integration Guide

## Overview

The KidsApp repository now includes comprehensive Docker integration that allows you to run the entire application stack with a single command. This includes:

- **Backend Service** (Spring Boot) - Port 8080
- **Stadtserver Service** (Spring Boot) - Port 8082  
- **Mobile App** (React Native/Expo) - Port 19000
- **PostgreSQL Database** - Port 5432

## Quick Start

1. **Clone and navigate to the repository:**
   ```bash
   git clone https://github.com/devdiyar/kidsapp.git
   cd kidsapp
   ```

2. **Set up environment variables:**
   ```bash
   cp .env.example .env
   ```

3. **Start all services:**
   ```bash
   docker compose up --build
   ```

4. **Access the applications:**
   - Backend API: http://localhost:8080
   - Stadtserver API: http://localhost:8082
   - Mobile App (Expo): http://localhost:19000
   - Database: localhost:5432

## Architecture

### Services

- **db**: PostgreSQL 15 database with persistent storage
- **stadtserver**: City server backend with health checks
- **backend**: Main application backend with health checks
- **mobile**: React Native/Expo development server

### Features

- **Health Checks**: All services include health monitoring
- **Service Dependencies**: Proper startup order with dependency management
- **Hot Reload**: Development-friendly with live code reloading
- **Volume Mounts**: Persistent data and development workflow support
- **Environment Management**: Centralized configuration via .env files

## Configuration Files

- `docker-compose.yml` - Main service definitions
- `docker-compose.override.yml` - Development-specific overrides
- `.env.example` - Environment variable template
- `test-docker.sh` - Integration test script

## Development Workflow

### Starting Development Environment
```bash
# Start all services
docker compose up

# Start in background
docker compose up -d

# Rebuild specific service
docker compose up --build backend

# View logs
docker compose logs -f backend
```

### Stopping Services
```bash
# Stop all services
docker compose down

# Stop and remove volumes
docker compose down -v

# Force recreate
docker compose down && docker compose up --build --force-recreate
```

### Individual Service Management
```bash
# Start only database
docker compose up db

# Start backend services
docker compose up db stadtserver backend

# Scale services (if needed)
docker compose up --scale backend=2
```

## Troubleshooting

### Common Issues

**Port Conflicts:**
```bash
docker compose down
sudo lsof -i :8080  # Check what's using the port
```

**Build Issues:**
```bash
# Clean build
docker compose build --no-cache

# Check service logs
docker compose logs [service_name]
```

**Database Connection Issues:**
```bash
# Check database health
docker compose exec db pg_isready -U kidsapp

# Connect to database
docker compose exec db psql -U kidsapp -d kidsapp
```

**Mobile App Issues:**
```bash
# Check Expo logs
docker compose logs mobile

# Restart mobile service
docker compose restart mobile
```

### Verification

Run the test script to verify everything is configured correctly:
```bash
./test-docker.sh
```

## Production Considerations

For production deployment, consider:

1. **Security**: Change default passwords in production
2. **SSL/TLS**: Add reverse proxy with SSL certificates
3. **Monitoring**: Add application monitoring and logging
4. **Scaling**: Use Docker Swarm or Kubernetes for scaling
5. **Backups**: Implement database backup strategies

## Manual Setup (Alternative)

If you prefer manual setup without Docker:

1. **Start PostgreSQL** (or Oracle XE)
2. **Start Stadtserver:**
   ```bash
   cd stadtserver && ./mvnw spring-boot:run
   ```
3. **Start Backend:**
   ```bash
   cd backend && ./mvnw spring-boot:run
   ```
4. **Start Mobile App:**
   ```bash
   cd mobile && npm install && npm start
   ```

## Support

For issues with Docker integration, check:
1. Docker and Docker Compose installation
2. Port availability (8080, 8082, 5432, 19000)
3. System resources (memory, disk space)
4. Environment variable configuration