#!/bin/bash
echo "🚀 Instalando dependências da versão legado..."
cd legado
npm install
echo "✅ Instalação concluída!"
echo ""
echo "Para executar a versão legado:"
echo "cd legado && NODE_OPTIONS=\"--openssl-legacy-provider\" npm start"
