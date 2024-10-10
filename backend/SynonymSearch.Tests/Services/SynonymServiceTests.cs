using System.Collections.Generic;
using Xunit;

public class SynonymServiceTests
{
    [Fact]
    public void AddSynonym_ShouldAddSynonym_Bidirectional()
    {
        // Arrange
        var service = new SynonymService();

        // Act
        service.AddSynonym("Car", "Automobile");

        // Assert
        var synonymsForCar = service.GetSynonyms("Car");
        var synonymsForAutomobile = service.GetSynonyms("Automobile");

        // The assertions will verify that the synonyms were added bidirectionally
        Assert.Contains("Automobile", synonymsForCar);
        Assert.Contains("Car", synonymsForAutomobile);
    }

    [Fact]
    public void AddSynonym_SynonymsShouldBeTransitive()
    {
        // Arrange
        var service = new SynonymService();

        // Act
        service.AddSynonym("A", "B");
        service.AddSynonym("B", "C");

        // Assert
        var synonymsForA = service.GetSynonyms("A");
        var synonymsForC = service.GetSynonyms("C");

        // Transitive relationship should link A and C as synonyms
        Assert.Contains("C", synonymsForA);
        Assert.Contains("A", synonymsForC);
    }

    [Fact]
    public void GetSynonyms_ShouldReturnEmptyList_WhenWordNotPresent()
    {
        // Arrange
        var service = new SynonymService();

        // Act
        var result = service.GetSynonyms("NonExistentWord");

        // Assert
        Assert.Empty(result);  // Should return an empty list for words with no synonyms
    }


    [Fact]
    public void GetSynonyms_ShouldNotReturnItself()
    {
        // Arrange
        var service = new SynonymService();

        // Act
        service.AddSynonym("A", "B");
        service.AddSynonym("B", "A");
        var result = service.GetSynonyms("A");

        // Assert
        Assert.DoesNotContain("A", result);  // Should not return the word itself as a synonym
    }

    [Fact]
    public void AddSynonym_ShouldHandleMultipleSynonymsForSameWord()
    {
        // Arrange
        var service = new SynonymService();

        // Act
        service.AddSynonym("Cold", "Chilly");
        service.AddSynonym("Cold", "Frigid");

        // Assert
        var result = service.GetSynonyms("Cold");
        Assert.Contains("Chilly", result);
        Assert.Contains("Frigid", result);
    }
}
