import fs from "fs";
import axios from "axios";
import sharp from "sharp";
import OpenAI from "openai";

// Carrega a chave da API do arquivo .env
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || ""
});

const produtos = JSON.parse(fs.readFileSync("./produtos.json", "utf-8"));

const BASE_PROMPT = (desc: string, nome: string) => `
  Food photography of ${desc},
  Brazilian gourmet bakery style,
  soft natural side lighting, light marble background,
  shallow depth of field focusing on ${nome.replace("-", " ")},
  ultra realistic, 8k resolution, commercial product photography,
  vivid natural colors, professional studio lighting,
  --ar 1:1 --v 6.0
`;

async function gerarImagem(prompt: string, nome: string, categoria: string) {
  try {
    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt: prompt,
      size: "1024x1024",
      quality: "hd",
      n: 1,
    });
    return response.data[0].url;
  } catch (err) {
    console.error(`Erro ao gerar ${nome}:`, err);
    return null;
  }
}

async function baixarImagem(url: string, path: string) {
  const response = await axios({
    url,
    responseType: "arraybuffer"
  });

  await sharp(response.data)
    .resize(800, 800, { fit: "cover" })
    .jpeg({ quality: 85 })
    .toFile(path);

  // Gerar thumbnail
  await sharp(response.data)
    .resize(300, 300, { fit: "cover" })
    .jpeg({ quality: 80 })
    .toFile(path.replace("\.jpg", "-thumb.jpg"));
}

async function run() {
  console.log("🚀 Iniciando geração de imagens...");
  const erros: string[] = [];

  for (const produto of produtos) {
    const pasta = `./public/img/produtos/${produto.categoria}`;
    if (!fs.existsSync(pasta)) {
      fs.mkdirSync(pasta, { recursive: true });
    }

    const caminho = `${pasta}/${produto.nome}.jpg`;

    // Pular se já existir
    if (fs.existsSync(caminho)) {
      console.log(`⏭️  Já existe: ${produto.nome}`);
      continue;
    }

    console.log(`🎨 Gerando: ${produto.nome}`);

    const prompt = BASE_PROMPT(produto.descricao, produto.nome);
    const url = await gerarImagem(prompt, produto.nome, produto.categoria);

    if (url) {
      await baixarImagem(url, caminho);
      console.log(`✅ Salvo: ${caminho}`);
    } else {
      erros.push(produto.nome);
    }

    // Rate limit: esperar 1 segundo entre requisições
    await new Promise(resolve => setTimeout(resolve, 1000));
  }

  if (erros.length > 0) {
    console.log("\n❌ Produtos com erro:");
    erros.forEach(e => console.log(`  - ${e}`));
  }

  console.log("\n✨ Geração concluída!");
}

run().catch(console.error);
