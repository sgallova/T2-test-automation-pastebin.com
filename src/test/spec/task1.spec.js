const FormPage = require("../../pageobjects/pages/form.page.js");
const ResultPage = require("../../pageobjects/pages/result.page.js");

const formPage = new FormPage();
const resultPage = new ResultPage();

describe("pastebin.com Testsuite", () => {
  //constant values used in the Test suite
  const code = "Hello from WebDriver";
  const expValue = "10M";
  const title = "helloweb";

  //Open https://pastebin.com/ in browser and wait until the page is displayed.
  beforeEach(async () => {
    formPage.open();
    await formPage.formComponents.codeTextArea.waitForDisplayed({
      timeout: 5000,
      timeoutMsg: "The page was not loaded as expected",
      interval: 300,
    });
  });

  /*Create 'New Paste'*/
  it("Should create a new paste with 3 parameters", async () => {
    //Make the combobox visible to allow selection
    await browser.execute(function (combobox) {
      combobox.style.visibility = "visible";
    }, await formPage.formComponents.combobox);

    //await formPage.formComponents.combobox.style.visibility = "visible";
    await formPage.formComponents.codeTextArea.setValue(code);
    await formPage.formComponents.combobox.selectByAttribute("value", expValue);
    await formPage.formComponents.nameField.setValue(title);

    //submit the form
    await formPage.formComponents.submitBtn.click();

    //Verify that the paste was created
    await resultPage.resultComponent.postView.waitForDisplayed({
      timeout: 8000,
      timeoutMsg: "The Paste was not created",
      interval: 300,
    });

    //Assertions to confirm that the data was created
    expect(resultPage.resultComponent.resultArea).toHaveText(code);
    expect(resultPage.resultComponent.resultTile).toHaveText(title);
    expect(resultPage.resultComponent.resultExp).toHaveText("10 Min", {
      ignoreCase: true,
    });
  });
});
