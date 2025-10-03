#!/bin/bash

set -e

echo "🔧 Building and pushing Docker images..."

docker build --no-cache -t product-api ./ProductApi
docker build --no-cache -t product-frontend ./product-frontend
docker build --no-cache -t product-gateway ./ProductGateway

echo "🚀 Applying Kubernetes manifests..."

kubectl apply -f k8s/product-api-deployment.yaml
kubectl apply -f k8s/product-frontend-deployment.yaml
kubectl apply -f k8s/product-gateway-deployment.yaml

echo "🔁 Restarting deployments..."

kubectl rollout restart deployment product-api
kubectl rollout restart deployment product-frontend
kubectl rollout restart deployment product-gateway

echo "✅ Deployment complete."