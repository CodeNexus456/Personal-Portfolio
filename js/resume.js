
    function triggerResumePrint(){
      var originalTitle = document.title;
      document.title = "Suraj_Kumar_Resume";
      window.print();
      window.setTimeout(function(){
        document.title = originalTitle;
      }, 1000);
    }

    document.getElementById('downloadBtn').addEventListener('click', triggerResumePrint);
    document.getElementById('printBtn').addEventListener('click', triggerResumePrint);

