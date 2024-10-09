const addSynonym = async (word: string, synonym: string) => {
  const response = await fetch("http://localhost:3001/synonyms", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ word, synonym }),
  });
  return response.json();
};

export { addSynonym };
