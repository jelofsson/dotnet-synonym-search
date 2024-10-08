// SynonymService.cs
using System.Collections.Generic;

public class SynonymService
{
    private Dictionary<string, HashSet<string>> synonyms;

    public SynonymService()
    {
        synonyms = new Dictionary<string, HashSet<string>>();
    }

    // Add a pair of synonyms (word A and word B)
    public void AddSynonym(string wordA, string wordB)
    {
        if (!synonyms.ContainsKey(wordA))
            synonyms[wordA] = new HashSet<string>();
        if (!synonyms.ContainsKey(wordB))
            synonyms[wordB] = new HashSet<string>();

        synonyms[wordA].Add(wordB);
        synonyms[wordB].Add(wordA);
        // Union both sets for transitive relations
        UnionSynonyms(wordA, wordB);
    }
    
    public List<string> GetSynonyms(string word)
    {
        return synonyms.ContainsKey(word) ? synonyms[word].ToList() : new List<string>();
    }

    // Union and connect transitive synonyms
    private void UnionSynonyms(string from, string to)
    {
        Queue<string> queue = new Queue<string>();
        HashSet<string> visited = new HashSet<string>();
        queue.Enqueue(from);

        while (queue.Count > 0)
        {
            var current = queue.Dequeue();
            foreach (var synonym in synonyms[current])
            {
                if (!visited.Contains(synonym))
                {
                    visited.Add(synonym);
                    synonyms[to].Add(synonym); // Expand synonym list
                    queue.Enqueue(synonym);
                }
            }
        }
    }
}
