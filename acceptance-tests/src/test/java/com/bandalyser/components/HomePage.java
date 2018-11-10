package com.bandalyser.components;

import com.codeborne.selenide.SelenideElement;
import org.openqa.selenium.By;
import uk.co.blackpepper.relish.selenide.InputText;
import uk.co.blackpepper.relish.selenide.Page;
import uk.co.blackpepper.relish.selenide.SelenideAbstractListWidget;

public class HomePage extends Page {
    public HomePage() {
        super("/");
    }


    public InputText bandSearchBox() {
        return new InputText(By.className("BandSearchBox"), this);
    }

    public SelenideAbstractListWidget<BandResult> resultList() {
        return new SelenideAbstractListWidget<BandResult>(By.className("SearchResults"), this) {

            @Override
            protected BandResult createItem(SelenideElement selenideElement) {
                return new BandResult(selenideElement, this);
            }

            @Override
            public By itemsSelector() {
                return By.className("BandResult");
            }
        };
    }
}

