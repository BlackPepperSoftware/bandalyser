package com.bandalyser.steps;

import com.bandalyser.components.HomePage;
import cucumber.api.java.en.Given;
import cucumber.api.java.en.Then;
import cucumber.api.java.en.When;
import uk.co.blackpepper.relish.core.TableRow;

import java.util.List;

public class SomeSteps {

    public HomePage homePage = new HomePage();

    @When("^I search for \"([^\"]*)\"$")
    public void iSearchFor(String bandName) {
        homePage.bandSearchBox().setStringValue(bandName);
    }

    @Then("^I see the following information:$")
    public void iSeeTheFollowingInformation(List<TableRow> bandInfo) {
        homePage.bandInfo().matches(bandInfo);
    }

    @Given("^I am on the homepage$")
    public void iAmOnTheHomepage() throws Throwable {
        homePage.launch();
    }
}
