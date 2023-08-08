import React from "react";
import { useEffect, useState } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { useCode } from "../hooks/useCode";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy, faCheck } from "@fortawesome/free-solid-svg-icons";

const TESTING_OUTPUT = false;

export default function Home() {
  const [inputText, setInputText] = useState("");
  const [isCopied, setIsCopied] = useState(false);

  const {
    outputCode,
    setOutputCode,
    getCode,
    isGettingCode,
    gettingCodeError,
  } = useCode();

  const handleGetCode = () => {
    getCode(inputText, TESTING_OUTPUT);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputText(event.target.value);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(outputCode);
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 2500);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if ((event.ctrlKey || event.metaKey) && event.key === "Enter") {
      event.preventDefault();
      handleGetCode();
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <div className="mx-auto w-[850px]">
          <h1 className="text-2xl mb-2 font-mono">TorchGPT 🔥</h1>
          <h2 className="text-lg mb-8 font-mono text-gray-500">
            PyTorch code generation tool
          </h2>
          <div className="bg-white rounded-lg shadow-sm p-8 flex">
            <div className="flex-1">
              <h1 className="text-md font-semibold mb-2">Input Prompt</h1>
              <textarea
                className="w-full px-4 border border-gray-300 rounded-lg mb-2 h-60 text-sm"
                placeholder="e.g. calculate the cumulative product of all elements in a torch tensor"
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
              ></textarea>
              <button
                className={`flex items-center justify-center w-full px-4 py-2 text-white ${
                  isGettingCode
                    ? "bg-blue-300 cursor-not-allowed"
                    : "bg-blue-500 hover:bg-blue-600"
                } rounded-lg`}
                onClick={handleGetCode}
                disabled={isGettingCode}
              >
                {isGettingCode ? "Generating..." : "Generate Code"}
              </button>
            </div>
            <div className="ml-4 flex-1">
              <h1 className="text-md font-semibold mb-2">PyTorch Code</h1>
              <div className="relative">
                <SyntaxHighlighter
                  language="python"
                  wrapLines={true}
                  showLineNumbers={true}
                  lineNumberStyle={{ color: "#ccc" }}
                  customStyle={{
                    maxHeight: "none",
                    height: "auto",
                    overflow: "visible",
                    wordWrap: "break-word",
                    color: "inherit",
                    backgroundColor: "#F8F8F8",
                    borderRadius: "0.5rem",
                    padding: "10px 0px",
                  }}
                  lineProps={{ style: { whiteSpace: "pre-wrap" } }}
                >
                  {outputCode}
                </SyntaxHighlighter>
                <button
                  onClick={handleCopy}
                  className={`absolute top-0 right-0 mt-2 mr-2 ${
                    isGettingCode ? "cursor-not-allowed" : "cursor-pointer"
                  }`}
                  disabled={isGettingCode}
                >
                  <FontAwesomeIcon
                    icon={isCopied ? faCheck : faCopy}
                    className={`text-gray-700 dark:text-gray-200 font-bold text-sm ${
                      isCopied ? "text-green-500" : ""
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
