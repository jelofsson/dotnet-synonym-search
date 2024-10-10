using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/v1/[controller]")]
public class SynonymController : ControllerBase
{
    private readonly SynonymService _synonymService;

    // Constructor that injects the singleton SynonymService
    public SynonymController(SynonymService synonymService)
    {
        _synonymService = synonymService;
    }

    // POST api/v1/synonym/add - Endpoint to add a pair of synonyms
    [HttpPost("add")]
    public IActionResult AddSynonym([FromBody] SynonymRequest request)
    {
        _synonymService.AddSynonym(request.WordA, request.WordB);
        return Ok(new { message = "Synonyms added successfully!" });
    }

    // GET api/v1/synonym?word=clean - Endpoint to get a list of synonyms for a word
    [HttpGet]
    public IActionResult LookupSynonym([FromQuery] string word)
    {
        var synonyms = _synonymService.GetSynonyms(word);
        if (synonyms.Count == 0)
        {
            return NotFound(new { message = "No synonyms found" });
        }
        return Ok(synonyms);
    }
}

// Simple DTO (data transfer object) for handling the add synonym payload
public class SynonymRequest
{
    public string WordA { get; set; }
    public string WordB { get; set; }
}
