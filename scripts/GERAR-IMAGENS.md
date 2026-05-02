# 🎨 Guia de Geração de Imagens - Pedacinhos de Felicidade

Este script gera automaticamente imagens de alta qualidade para todos os produtos da confeitaria usando a API da OpenAI (DALL-E 3).

## 📦 Estrutura de Pastas

As imagens serão salvas em:
```
public/img/produtos/
├── bolos/
├── doces/
├── salgados/
├── bebidas/
├── complementos/
├── pascoa/
├── natal/
├── dia-pais/
├── dia-maes/
├── dia-namorados/
├── dia-professor/
├── dia-mulheres/
└── junina/
```

## 🚀 Como Usar (MODO CRON)

O script está configurado para rodar via GitHub Actions automaticamente!

### 1. Configuração Inicial (apenas uma vez)

1. Obtenha sua API Key da OpenAI:
   - Acesse: https://platform.openai.com/api-keys
   - Crie uma nova chave de API

2. Configure no GitHub:
   - Vá em Settings → Secrets and variables → Actions
   - Adicione um novo secret: `OPENAI_API_KEY`
   - Cole sua chave lá

### 2. Como Executar Localmente

```bash
# Modo 1: Via npm
npm run gerar-imagens

# Modo 2: Com arquivo .env
echo "OPENAI_API_KEY=sk-sua-chave" > .env
npm run gerar-imagens
```

### 3. Execução Manual via Console

```bash
# No diretório do projeto
node -e "
import('fs').then(fs => {
  const produtos = JSON.parse(fs.readFileSync('./produtos.json', 'utf-8'));
  console.log('Total:', produtos.length, 'produtos');
  produtos.forEach(p => console.log(' -', p.nome));
});
"
```

## 🎯 O Que o Script Faz

1. **Lê o arquivo `produtos.json`** contendo todos os produtos
2. **Gera prompts otimizados** para cada produto com descrição detalhada
3. **Chama a API DALL-E 3** para criar imagens fotorrealistas
4. **Redimensiona para 800x800px** (tamanho ideal para o site)
5. **Cria thumbnails de 300x300px** para listagens
6. **Salva na pasta correta** de acordo com a categoria

## 📄 Produtos Incluídos (100+ itens)

### Bolos (12)
- Bolo de Chocolate, Red Velvet, Prestígio, Morango, Ninho, Cookies
- Floresta Negra, Cenoura, Limão, Milho, Formigueiro, Sensor

### Doces (12)
- Brigadeiro Gourmet, Beijinho, Camafeu, Brigadeiro Branco
- Olho de Sogra, Trufado, Sonho, Pé de Moça, Bombom Morango
- Cocada Queimada, Brigadeiro Copinho, Quindim

### Salgados (12)
- Coxinha, Quibe, Kibe, Bolinha de Queijo, Esfiha Carne/Queijo
- Torta Alemã, Mini Pizza, Croquete, Rissole, Empadinha, Pastel

### Bebidas (12)
- Suco Natural, Refrigerante, Água de Coco, Chá Gelado
- Café, Milk Shake, Vitaminas, Caipirinha, Suco Detox
- Refri Lata, Suco Polpa, Chocomel

### Complementos (12)
- Mesa Decorada, Velas, Balões, Pratos/Copos, Guardanapos
- Topo Bolo, Porta Doces, Palito, Caixa Bombons, Painel
- Boneco, Tag

### Datas Especiais
- **Páscoa** (10): Ovos, coelhos, cestas
- **Natal** (10): Panetones, chocotones, cestas
- **Dia dos Pais** (10): Bolos, kits, harmonizações
- **Dia das Mães** (10): Bolos, tortas, flores
- **Dia dos Namorados** (10): Corações, caixas, românticos
- **Dia do Professor** (10): Bolos, cestas, café
- **Dia das Mulheres** (10): Bolos femininos, taças
- **Festa Junina** (10): Típicos, pipoca, quentão
- **Carnaval** (10): Coloridos, confetes
- **Black Friday** (10): Kits, ofertas

## 🎨 Estilo das Imagens

**Características Gerais:**
- Fotografia de produto comercial
- Iluminação natural suave lateral
- Fundo mármore claro elegante
- Profundidade de campo (foco no produto)
- Cores vibrantes e naturais
- Estilo confeitaria gourmet brasileira
- Ultra realista, 8k resolution

## 🔄 Workflow Automático (GitHub Actions)

O projeto já possui workflow configurado:

```yaml
name: Gerar Imagens Produtos
on:
  schedule:
    - cron: '0 2 * * 1'  # Toda segunda às 2AM
  workflow_dispatch:  # Manual

jobs:
  gerar:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm install
      - run: npm run gerar-imagens
        env:
          OPENAI_API_KEY: ${{ secrets.OPENAI_API_KEY }}
```

## 💾 Rate Limiting

O script inclui pausa de 2 segundos entre requisições:
- DALL-E 3: ~3 RPM (requisições por minuto)
- Para 100 produtos: ~3-4 minutos

## 📊 Custos Estimados

- DALL-E 3: $0.04 por imagem (1024x1024)
- Para 100 produtos: ~$4.00
- Por mês (geração semanal): ~$16.00

## 🚨 Solução de Problemas

### Erro "API Key inválida"
```bash
# Verifique a chave
echo $OPENAI_API_KEY
# Ou crie arquivo .env
echo "OPENAI_API_KEY=sk-..." > .env
```

### Imagens repetidas
O script **pula automaticamente** produtos que já possuem imagens na pasta

### Lentidão
É normal devido ao rate limiting (2 segundos por imagem = ~3 minutos para 100 imagens)

### "Cannot find module 'dotenv'"
```bash
npm install dotenv
```

## 📝 Atualizando Produtos

Para adicionar/remover produtos:
1. Edite `produtos.json`
2. Mantenha o formato:
```json
{
  "categoria": "bolos",
  "nome": "bolo-novo",
  "descricao": "descrição detalhada para a IA gerar",
  "pagina": "home, produtos"
}
```

## 💡 Dicas para Melhores Resultados

1. **Descricões detalhadas**: Quanto mais específico, melhor
2. **Estilo claro**: "Brazilian gourmet bakery style"
3. **Iluminação**: "soft natural side lighting"
4. **Fundo**: "light marble background"
5. **Foco**: "shallow depth of field"

## 🔍 Verificando Imagens Geradas

```bash
# Listar todas as pastas
find public/img/produtos -name "*.jpg" -type f | wc -l

# Ver estrutura
tree public/img/produtos/

# Ver imagens faltando
npm run gerar-imagens  # Ele pula as que já existem
```

## 🌐 Integração com o Site

As imagens são referenciadas automaticamente no código:
```javascript
// Exemplo em Produtos.jsx
<Image 
  src="/img/produtos/bolos/bolo-chocolate.jpg"
  alt="Bolo de Chocolate"
/>
```

## 📈 SEO e Performance

- **Formato**: JPEG (otimização automática)
- **Tamanho**: 800x800px (web otimizado)
- **Thumb**: 300x300px (listagens rápidas)
- **Qualidade**: 85% (equilíbrio qualidade/tamanho)

## 🔄 Workflow Git

```bash
# Após gerar imagens
git add public/img/produtos/
git commit -m "feat: imagens novos produtos [skip ci]"
git push
```

**Nota**: Use `[skip ci]` para evitar build no CI quando só atualizar imagens

## 📞 Suporte

Para problemas com a API OpenAI:
- Dashboard: https://platform.openai.com
- Documentação: https://platform.openai.com/docs
- Status: https://status.openai.com

## ✨ Notas Importantes

- ✅ Todas as URLs da API estão no código - sem depender de .env
- ✅ Thumbnails gerados automaticamente
- ✅ Rate limit respeitado
- ✅ Pastas criadas se não existirem
- ✅ Produtos existentes são pulados
- ✅ Resumo com erros e sucessos
- ✅ GitHub Actions configurado
- ✅ Build verificado e funcionando