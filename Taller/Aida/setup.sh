#!/bin/bash

# Script de configuración inicial del proyecto
# Este script configura la base de datos y las dependencias

echo "================================"
echo "Setup del Sistema de Gestión Académica"
echo "================================"
echo ""

# Verificar si PostgreSQL está instalado
if ! command -v psql &> /dev/null; then
    echo "❌ PostgreSQL no está instalado"
    echo "Por favor instala PostgreSQL desde: https://www.postgresql.org/download/"
    exit 1
fi

echo "✅ PostgreSQL detectado"
echo ""

# Crear base de datos
echo "Creando base de datos 'academia'..."
psql -U postgres -c "CREATE DATABASE academia;" 2>/dev/null || echo "La base de datos ya existe"

# Importar schema
echo "Creando tablas..."
psql -U postgres -d academia -f database/schema.sql

# Importar datos de ejemplo
echo ""
read -p "¿Deseas cargar datos de ejemplo? (s/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Ss]$ ]]; then
    psql -U postgres -d academia -f database/seed.sql
    echo "✅ Datos de ejemplo cargados"
fi

echo ""
echo "Configurando Backend..."
cd backend
cp .env.example .env

echo ""
echo "⚠️  Edita el archivo 'backend/.env' con tus credenciales de PostgreSQL"
echo "DATABASE_URL=postgresql://usuario:contraseña@localhost:5432/academia"
echo ""

# Instalar dependencias backend
echo "Instalando dependencias del backend..."
npm install

cd ..

# Instalar dependencias frontend
echo ""
echo "Instalando dependencias del frontend..."
cd frontend
npm install

cd ..

echo ""
echo "✅ ¡Configuración completada!"
echo ""
echo "Para ejecutar el proyecto:"
echo "  Terminal 1 (Backend):   cd backend && npm run dev"
echo "  Terminal 2 (Frontend):  cd frontend && npm run dev"
echo ""
