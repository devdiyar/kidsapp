#!/bin/bash

# Test script for Docker integration
set -e

echo "🐳 Testing Docker integration for KidsApp..."

# Test 1: Check if docker-compose.yml is valid
echo "✅ Testing docker-compose.yml syntax..."
docker compose config > /dev/null
echo "   docker-compose.yml syntax is valid"

# Test 2: Check if .env.example exists and is readable
echo "✅ Testing environment configuration..."
if [ -f ".env.example" ]; then
    echo "   .env.example file exists"
else
    echo "   ❌ .env.example file is missing"
    exit 1
fi

# Test 3: Check if all Dockerfiles exist
echo "✅ Testing Dockerfiles..."
for service in backend stadtserver mobile; do
    if [ -f "$service/Dockerfile" ]; then
        echo "   $service/Dockerfile exists"
    else
        echo "   ❌ $service/Dockerfile is missing"
        exit 1
    fi
done

# Test 4: Check if services are properly defined
echo "✅ Testing service definitions..."
services=$(docker compose config --services)
expected_services="db stadtserver backend mobile"

for service in $expected_services; do
    if echo "$services" | grep -q "^$service$"; then
        echo "   Service '$service' is defined"
    else
        echo "   ❌ Service '$service' is missing"
        exit 1
    fi
done

# Test 5: Test database service image pull
echo "✅ Testing database image availability..."
docker pull postgres:15-alpine > /dev/null 2>&1
echo "   PostgreSQL image is available"

echo ""
echo "🎉 All Docker integration tests passed!"
echo ""
echo "To start the application:"
echo "  1. Copy environment file: cp .env.example .env"
echo "  2. Start services: docker compose up --build"
echo ""
echo "Services will be available at:"
echo "  - Backend: http://localhost:8080"
echo "  - Stadtserver: http://localhost:8082"  
echo "  - Mobile (Expo): http://localhost:19000"
echo "  - Database: localhost:5432"