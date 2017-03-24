package com.hotello.housekeeping.schedule.ui.cucumber.stepdefs;

import com.hotello.housekeeping.schedule.ui.HousekeepinguiApp;

import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.ResultActions;

import org.springframework.boot.test.context.SpringBootTest;

@WebAppConfiguration
@SpringBootTest
@ContextConfiguration(classes = HousekeepinguiApp.class)
public abstract class StepDefs {

    protected ResultActions actions;

}
