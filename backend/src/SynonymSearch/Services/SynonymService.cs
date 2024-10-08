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

        // Add the starting point (from) to the queue
        queue.Enqueue(from);

        // Perform breadth-first search to find all transitive synonyms
        while (queue.Count > 0)
        {
            var current = queue.Dequeue();  // Get the next word from the queue

            // Traverse all synonyms of the current word
            foreach (var synonym in synonyms[current])
            {
                if (!visited.Contains(synonym))
                {
                    // Mark the synonym as visited to avoid reprocessing it
                    visited.Add(synonym);

                    // Add the synonym to the synonym set of 'to'
                    synonyms[to].Add(synonym);  

                    // Ensure the synonym of the current word also gets the original 'to' as a synonym to maintain bidirectionality
                    synonyms[synonym].Add(to);

                    // Continue the BFS by adding this synonym to the queue to explore the rest of its synonyms
                    queue.Enqueue(synonym);
                }
            }
        }
    }
}
