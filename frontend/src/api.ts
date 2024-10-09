const addSynonym = async (WordA: string, WordB: string) => {
  const response = await fetch("https://localhost:7275/api/synonym/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ WordA, WordB }),
  });
  return response.json();
};

const GetSynonyms = async (word: string) => {
  const response = await fetch(
    `https://localhost:7275/api/synonym/lookup?word=${word}`,
  );
  return response.json();
};

export { addSynonym, GetSynonyms };
