class FormComponents {

  get codeTextArea() {
    return $("textarea#postform-text");
  }

  get nameField() {
    return $("input#postform-name");
  }

  get expirationCB() {
   return $("select#postform-expiration");
  }

  get syntaxHighlight() {
    return $("select#postform-format");
   }


  get submitBtn() {
    return $('//button[text()="Create New Paste"]');
  }
}

module.exports = FormComponents;
