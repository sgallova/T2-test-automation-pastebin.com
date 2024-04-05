class FormComponents {

  get codeTextArea() {
    return $("textarea#postform-text");
  }

  get nameField() {
    return $("input#postform-name");
  }

  get combobox() {
   return $("select#postform-expiration");
  }

  get submitBtn() {
    return $('//button[text()="Create New Paste"]');
  }
}

module.exports = FormComponents;
