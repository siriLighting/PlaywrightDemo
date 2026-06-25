package com.example;

import com.microsoft.playwright.Browser;
import com.microsoft.playwright.BrowserType;
import com.microsoft.playwright.BrowserContext;
import com.microsoft.playwright.Page;
import com.microsoft.playwright.Playwright;
import com.microsoft.playwright.assertions.PlaywrightAssertions;
import com.microsoft.playwright.options.AriaRole;
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.regex.Pattern;

public class ExampleTest {

    static Playwright playwright;
    static Browser browser;

    BrowserContext context;
    Page page;

    @BeforeAll
    static void launchBrowser() {
        playwright = Playwright.create();
        boolean headless = Boolean.parseBoolean(
                System.getProperty("headless", System.getenv().getOrDefault("HEADLESS", "false")));
        browser = playwright.chromium().launch(
                new BrowserType.LaunchOptions()
                        .setHeadless(headless)
                        .setSlowMo(headless ? 0 : 500));
    }

    @AfterAll
    static void closeBrowser() {
        playwright.close();
    }

    @BeforeEach
    void createContextAndPage() {
        context = browser.newContext();
        page = context.newPage();
    }

    @AfterEach
    void closeContext() {
        context.close();
    }

    @Test
    void hasTitle() {
        page.navigate("https://playwright.dev/");

        // Expect a title "to contain" a substring.
        PlaywrightAssertions.assertThat(page).hasTitle(Pattern.compile("Playwright"));
    }

    @Test
    void getStartedLink() {
        page.navigate("https://playwright.dev/");

        // Click the get started link.
        page.getByRole(AriaRole.LINK,
                new Page.GetByRoleOptions().setName("Get started")).click();

        // Expects page to have a heading with the name of Installation.
        PlaywrightAssertions.assertThat(
                page.getByRole(AriaRole.HEADING,
                        new Page.GetByRoleOptions().setName("Installation"))
        ).isVisible();
    }
}
