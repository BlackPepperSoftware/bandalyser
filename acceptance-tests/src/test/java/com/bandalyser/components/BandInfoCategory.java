package com.bandalyser.components;

import com.codeborne.selenide.SelenideElement;
import org.openqa.selenium.By;
import uk.co.blackpepper.relish.core.Component;
import uk.co.blackpepper.relish.selenide.SelenideWidget;

public class BandInfoCategory extends SelenideWidget{
    public BandInfoCategory(SelenideElement peer, Component parent) {
        super(peer, parent);
    }

    public SelenideWidget boringLevel() {
        return new SelenideWidget(By.className("BandInfo-Category-BoringLevel"), this);
    }
}
