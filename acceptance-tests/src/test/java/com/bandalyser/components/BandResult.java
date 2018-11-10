package com.bandalyser.components;

import com.codeborne.selenide.SelenideElement;
import org.openqa.selenium.By;
import uk.co.blackpepper.relish.core.Component;
import uk.co.blackpepper.relish.selenide.SelenideWidget;

public class BandResult extends SelenideWidget{
    public BandResult(SelenideElement peer, Component parent) {
        super(peer, parent);
    }

    public SelenideWidget name() {
        return new SelenideWidget(By.className("BandResult-name"), this);
    }

}
