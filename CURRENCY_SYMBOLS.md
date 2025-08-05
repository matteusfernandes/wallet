# Símbolos de Moedas - TrybeWallet

## Moedas Suportadas e Seus Símbolos

### Moedas Tradicionais
- **BRL** (Real Brasileiro): R$ 1.234,56
- **USD** (Dólar Americano): $ 1,234.56
- **EUR** (Euro): € 1.234,56
- **GBP** (Libra Esterlina): £ 1,234.56
- **JPY** (Iene Japonês): ¥ 1,235
- **CAD** (Dólar Canadense): C$ 1,234.56
- **AUD** (Dólar Australiano): A$ 1,234.56
- **CHF** (Franco Suíço): CHF 1,234.56
- **CNY** (Yuan Chinês): ¥ 1,234.56
- **ARS** (Peso Argentino): $ 1.234,56

### Criptomoedas
- **BTC** (Bitcoin): ₿ 1,234.56789012
- **ETH** (Ethereum): Ξ 1,234.56789012
- **LTC** (Litecoin): Ł 1,234.56789012
- **XRP** (Ripple): XRP 1,234.56789012

## Funcionalidades

### formatCurrency(value, currency)
- Formata valores monetários com símbolos apropriados
- Usa Intl.NumberFormat para moedas tradicionais
- Formatação personalizada para criptomoedas (até 8 casas decimais)
- Fallback seguro para moedas não suportadas

### getCurrencySymbol(currency)
- Retorna apenas o símbolo da moeda
- Útil para exibições customizadas

## Exemplos de Uso

```typescript
formatCurrency(1234.56, 'BRL')  // "R$ 1.234,56"
formatCurrency(1234.56, 'USD')  // "$ 1,234.56"
formatCurrency(1.23456789, 'BTC')  // "₿ 1,23456789"

getCurrencySymbol('EUR')  // "€"
getCurrencySymbol('BTC')  // "₿"
```
