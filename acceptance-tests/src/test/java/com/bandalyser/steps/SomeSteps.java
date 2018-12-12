package com.bandalyser.steps;

import com.bandalyser.components.HomePage;
import com.bandalyser.components.TopTracksPage;
import cucumber.api.PendingException;
import cucumber.api.java.en.And;
import cucumber.api.java.en.Given;
import cucumber.api.java.en.Then;
import cucumber.api.java.en.When;

public class SomeSteps {

    public HomePage homePage = new HomePage();
    private TopTracksPage topTracksPage = new TopTracksPage();

    @When("^I search for \"([^\"]*)\"$")
    public void iSearchFor(String bandName) {
        homePage.bandSearchBox().setStringValue(bandName);
    }

    @Given("^I am on the homepage$")
    public void iAmOnTheHomepage() throws Throwable {
        homePage.launch();
    }

    @Then("^the result list should contain '([^\"]*)'$")
    public void theResultListShouldContain(String artistName) {
        homePage.resultList().findFirst(band -> band.name().getStringValue().equalsIgnoreCase(artistName));
    }

    @And("^I select \"([^\"]*)\" result$")
    public void iSelectResult(String resultToSelect) {
        homePage.resultList().with("name", resultToSelect).click();
    }

    @Then("^I should see the following top tracks$")
    public void iShouldSeeTheFollowingTopTracks() {
        topTracksPage.assertVisible();
    }
}
