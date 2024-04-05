const FormComponents= require("../../pageobjects/components/form.component.js")

class FormPage {

  constructor() {
   this.formComponents= new FormComponents();
  }
  async open() {
    await browser.url("https://pastebin.com/");
  }
}

module.exports = FormPage;
