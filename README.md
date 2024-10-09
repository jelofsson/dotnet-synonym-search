# Synonym Search Tool

This is my implementation of a synonym tool.

The user should be able to ask for synonyms for a word and lookup should work
in both directions. For example, If “wash” is a synonym to “clean”, then you should
be able to look up both words and get the respective synonyms.

A word may have multiple synonyms, and all should be returned at a user
request.

Transitive rule implementation, i.e. if “B” is a synonym to “A” and “C” a synonym
to “B”, then “C” should automatically, by transitive rule, also be the synonym for
“A”.

To solve this I use a graph data structure where each node is a word and the edges are the synonyms.

I use a dictionary to store the graph where the key is the word and the value is a set of synonyms.  
also I have implemented an algorithm to union and connect the transitive synonyms using Breadth First Search (BFS).

## How to run

Frontend is hosted on github pages and the backend is hosted on AWS EC2.

### Backend

To run the backend locally, you can run the following commands:

```bash
cd backend/src/SynonymSearch
dotnet run
```

To run the tests, you can run the following commands:

```bash
cd backend/tests/SynonymSearch.Tests
dotnet test
```

### Frontend

To run the frontend locally, you can run the following commands:

```bash
cd frontend
npm install
npm run dev
```
