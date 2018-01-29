(function () {
    const remote = require('electron').remote;
    
    function init() {
      document.getElementById("min-btn").addEventListener("click", function (e) {
        const window = remote.getCurrentWindow();
        window.minimize();
      });
      
        document.getElementById("close-btn").addEventListener("click", function (e) {
          const window = remote.getCurrentWindow();
          window.close();
        });
    };
    
    document.onreadystatechange = function () {
      if (document.readyState == "complete") {
        init();
        findDayOfYear();
        convertToday();
      }
    };
    
})();