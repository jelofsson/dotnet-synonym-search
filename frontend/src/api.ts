const API_URL = import.meta.env.VITE_BACKEND_API_URL;

const addSynonym = async (WordA: string, WordB: string) => {
  const response = await fetch(`${API_URL}/api/v1/synonym/add`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ WordA, WordB }),
  });
  return response.json();
};

const GetSynonyms = async (word: string) => {
  const response = await fetch(`${API_URL}/api/v1/synonym/?word=${word}`);
  return response.json();
};

export { addSynonym, GetSynonyms };
