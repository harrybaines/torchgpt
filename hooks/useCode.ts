import { useState } from "react";
import { DEFAULT_CODE_OUTPUT } from "../utils/constants";

interface RequestBody {
  inputText: string;
  tableSchema?: string;
}

export function useCode() {
  const [isGettingCode, setIsGettingCode] = useState(false);
  const [outputCode, setOutputCode] = useState(DEFAULT_CODE_OUTPUT);
  const [gettingCodeError, setGettingCodeError] = useState("");

  const getCode = async (inputText: string, testing: boolean = false) => {
    setIsGettingCode(true);

    try {
      if (testing) {
        setTimeout(() => {
          setIsGettingCode(false);
        }, 3000);
        setOutputCode(DEFAULT_CODE_OUTPUT);
      } else {
        const requestBody: RequestBody = { inputText };
        const response = await fetch(`/api/code`, {
          method: "POST",
          body: JSON.stringify(requestBody),
          headers: { "Content-Type": "application/json" },
        });
        if (response.ok) {
          const data = await response.json();
          setOutputCode(data.outputText);
        } else {
          setGettingCodeError(`Error getting code.`);
        }

        setIsGettingCode(false);
      }
    } catch (error) {
      console.error(error);
      setGettingCodeError(`Error getting code.`);
      setIsGettingCode(false);
    }
  };

  return {
    outputCode,
    setOutputCode,
    getCode,
    isGettingCode,
    gettingCodeError,
  };
}
