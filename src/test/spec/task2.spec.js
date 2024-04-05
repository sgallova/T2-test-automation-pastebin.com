const FormPage = require("../../pageobjects/pages/form.page.js");
const ResultPage = require("../../pageobjects/pages/result.page.js");

const formPage = new FormPage();
const resultPage = new ResultPage();

describe("Bash Paste Testsuite", () => {
  //constant values used in the Test suite
  const code =
    ' git config --global user.name New Sheriff in Town \n git reset $(git commit-tree HEAD^{tree} -m "Legacy code") \n git push origin master --force';
  const syntax= "bash";
    const expValue = "10M";
  const title = "how to gain dominance among developers";

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
  it("Should create a new paste with 4 parameters", async () => {
    //Make the comboboxes visible to allow selection
    await browser.execute(function (combobox) {
      combobox.style.visibility = "visible";
    }, await formPage.formComponents.expirationCB);

    await browser.execute(function (combobox2) {
      combobox2.style.visibility = "visible";
    }, await formPage.formComponents.syntaxHighlight);

    //fill out the form
    await formPage.formComponents.codeTextArea.setValue(code);
    await formPage.formComponents.syntaxHighlight.selectByAttribute("data-language", syntax);
    await formPage.formComponents.expirationCB.selectByAttribute("value", expValue);
    await formPage.formComponents.nameField.setValue(title);

    //submit the form
    await formPage.formComponents.submitBtn.click();

    //Verify that the paste was created
    await resultPage.resultComponent.postView.waitForDisplayed({
      timeout: 8000,
      timeoutMsg: "The Paste was not created",
      interval: 300,
    });

    //Assertions to confirm that the data was created as expecetd
    expect(resultPage.resultComponent.resultArea).toHaveText(code);
    expect(resultPage.resultComponent.resultTile).toHaveText(title);
    expect(resultPage.resultComponent.syntaxBtn).toHaveText(syntax.charAt(0).toUpperCase() + syntax.slice(1));
    expect(resultPage.resultComponent.resultExp).toHaveText("10 Min", {
      ignoreCase: true,
    });
  });
});
