#!/usr/bin/env node

import fs from "fs";
import axios from "axios";
import sharp from "sharp";
import OpenAI from "openai";
import dotenv from "dotenv";

// Carrega variáveis de ambiente
dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || "",
});

const produtos = JSON.parse(fs.readFileSync("./produtos.json", "utf-8"));

const BASE_PROMPT = (desc, nome) => `
Food photography of ${desc},
Brazilian gourmet bakery style,
soft natural side lighting, light marble background,
shallow depth of field focusing on ${nome.replace(/-/g, " ")},
ultra realistic, 8k resolution, commercial product photography,
vivid natural colors, professional studio lighting
`;

async function gerarImagem(prompt, nome, categoria) {
  try {
    console.log(`  🤖 Enviando prompt para ${nome}...`);
    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt: prompt,
      size: "1024x1024",
      quality: "hd",
      n: 1,
    });
    return response.data[0].url;
  } catch (err) {
    console.error(`  ❌ Erro ao gerar ${nome}:`, err.message);
    return null;
  }
}

async function baixarImagem(url, path) {
  try {
    const response = await axios({
      url,
      responseType: "arraybuffer",
    });

    // Imagem principal 800x800
    await sharp(response.data)
      .resize(800, 800, { fit: "cover" })
      .jpeg({ quality: 85 })
      .toFile(path);

    // Thumbnail 300x300
    const thumbPath = path.replace(".jpg", "-thumb.jpg");
    await sharp(response.data)
      .resize(300, 300, { fit: "cover" })
      .jpeg({ quality: 80 })
      .toFile(thumbPath);

    return true;
  } catch (err) {
    console.error(`  ❌ Erro ao baixar ${path}:`, err.message);
    return false;
  }
}

async function run() {
  console.log("\n🚀 Iniciando geração de imagens dos produtos...");
  console.log(`📦 Total de produtos: ${produtos.length}\n`);

  const erros = [];
  const gerados = [];

  for (const produto of produtos) {
    const pasta = `./public/img/produtos/${produto.categoria}`;
    if (!fs.existsSync(pasta)) {
      fs.mkdirSync(pasta, { recursive: true });
    }

    const caminho = `${pasta}/${produto.nome}.jpg`;

    // Pular se já existir
    if (fs.existsSync(caminho)) {
      console.log(`⏭️  Já existe: ${produto.nome}`);
      gerados.push(produto.nome);
      continue;
    }

    console.log(`\n🎨 [${produto.categoria}] ${produto.nome}`);

    const prompt = BASE_PROMPT(produto.descricao, produto.nome);
    const url = await gerarImagem(prompt, produto.nome, produto.categoria);

    if (url) {
      const sucesso = await baixarImagem(url, caminho);
      if (sucesso) {
        console.log(`  ✅ Salvo: ${caminho}`);
        gerados.push(produto.nome);
      } else {
        erros.push(produto.nome);
      }
    } else {
      erros.push(produto.nome);
    }

    // Rate limit: esperar entre requisições
    await new Promise((resolve) => setTimeout(resolve, 2000));
  }

  // Resumo
  console.log("\n" + "=".repeat(50));
  console.log("📊 RESUMO DA GERAÇÃO");
  console.log("=".repeat(50));
  console.log(`✅ Gerados: ${gerados.length}`);
  console.log(`❌ Erros: ${erros.length}`);

  if (erros.length > 0) {
    console.log("\n❌ Produtos com erro:");
    erros.forEach((e) => console.log(`  - ${e}`));
  }

  console.log("\n✨ Concluído!\n");
}

run().catch(console.error);
