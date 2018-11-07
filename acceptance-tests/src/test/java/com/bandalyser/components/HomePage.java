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

    public SelenideAbstractListWidget bandInfo() {
        return new SelenideAbstractListWidget<BandInfoCategory>(By.className("BandInfo"), this) {

            @Override
            protected BandInfoCategory createItem(SelenideElement selenideElement) {
                return new BandInfoCategory(selenideElement, this);
            }

            @Override
            public By itemsSelector() {
                return By.className("BandInfo-Category");
            }
        };
    }
}
