class ResultComponent {
  get resultArea() {
   return $("div.de1");
  }
  get resultTile() {
    return $("div.info-top");
  }

  get resultExp() {
    return $("div.expire");
  }

  get postView(){
    return $("div.post-view")
  }

  get syntaxBtn(){
    return $('a[href="/archive/bash"]');
  }
}

module.exports= ResultComponent;
