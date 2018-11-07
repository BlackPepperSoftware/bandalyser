package com.example;

import org.junit.runner.RunWith;

import cucumber.api.CucumberOptions;
import cucumber.api.junit.Cucumber;

@RunWith(Cucumber.class)
@CucumberOptions(
        features= "classpath:features",
        plugin = {"pretty", "html:build/cucumber","json:build/cucumber.json"},
        monochrome = true,
        tags = "~@Ignore",
        glue={"com.bandalyser.steps"}
)
public class TestRunner {
}
