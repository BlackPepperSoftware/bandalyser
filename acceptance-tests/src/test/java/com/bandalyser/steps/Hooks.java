package com.bandalyser.steps;

import com.codeborne.selenide.Configuration;
import com.codeborne.selenide.WebDriverRunner;
import cucumber.api.CucumberOptions;
import cucumber.api.java.After;
import cucumber.api.java.Before;
import org.openqa.selenium.Point;
import org.openqa.selenium.WebDriverException;

import java.io.IOException;

import static com.codeborne.selenide.Selenide.clearBrowserCookies;
import static com.codeborne.selenide.Selenide.clearBrowserLocalStorage;

@CucumberOptions(features = "features")
public class Hooks {


    @Before
    public void before() throws IOException {
        Configuration.browser = "chrome";
        String property = System.getProperty("selenide.baseUrl");
        Configuration.chromeSwitches = "disable-infobars";
        if (property == null) {
            Configuration.baseUrl = "http://localhost:4200/";
        }

        Configuration.browserSize = "1024x768";
        WebDriverRunner.getWebDriver().manage().window().setPosition(new Point(60, 80));

//        SelenideWidget.setDemoMode(true);
    }

    @After(order = 100)
    public void after() throws IOException {
        clearBrowserCookies();
        try {
            clearBrowserLocalStorage();
        } catch(WebDriverException wde) {
            System.err.println("Cannot clear local storage. Non browser test?");
        }
    }

}
