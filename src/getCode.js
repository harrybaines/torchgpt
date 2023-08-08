import fetch from "isomorphic-unfetch";
import { DEFAULT_CODE_OUTPUT } from "../utils/constants";

const getCode = async (query, apiKey, testing = false) => {
  if (testing) {
    return DEFAULT_CODE_OUTPUT;
  }
  const prompt = `You are an expert machine learning engineer and PyTorch developer assistant. Follow my instructions as precisely as possible. Convert this text description: "${query}" into efficient, professional, executable and concise PyTorch code. Code:`;
  const response = await fetch("https://api.openai.com/v1/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      prompt,
      temperature: 0.5,
      max_tokens: 2048,
      n: 1,
      stop: "\\n",
      model: "text-davinci-003",
      frequency_penalty: 0.5,
      presence_penalty: 0.5,
      logprobs: 10,
    }),
  });

  const data = await response.json();
  if (!response.ok) {
    console.log(response);
    throw new Error(data.error || "Error getting code.");
  }

  return data.choices[0].text.trim();
};

export default getCode;
