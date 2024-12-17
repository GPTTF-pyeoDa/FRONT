import express from "express";
import next from "next";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

async function testAPI() {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "" },
        {
          role: "user",
          content: "연결을 성공했다면 안녕!",
        },
      ],
      max_tokens: 1000,
    });
    console.log(`GPT : ${response.choices[0].message.content}`);
  } catch (error) {
    console.error("API 호출 중 오류 발생:", error);
  }
}

testAPI();

app.prepare().then(() => {
  const server = express();

  server.get("/", (req, res) => {
    return app.render(req, res, "/");
  });

  server.get("*", (req, res) => {
    return handle(req, res);
  });

  server.listen(3000, (err) => {
    if (err) throw err;
    console.log("listening to 3000");
  });
});
