var gdpr_url = window.location.pathname;
if ((gdpr_url === "/widget-almanax-dpln-smooth.html") || (gdpr_url === "/widget-almanax-dpln-cubic.html") || (gdpr_url === "/widget-almanax-lagoon-smooth.html") || (gdpr_url === "/widget-almanax-lagoon-cubic.html") || (gdpr_url === "/widget-almanax-gray-smooth.html") || (gdpr_url === "/widget-almanax-gray-cubic.html") || (gdpr_url === "/widget-almanax-green-smooth.html") || (gdpr_url === "/widget-almanax-green-cubic.html") || (gdpr_url === "/widget-almanax-orange-smooth.html") || (gdpr_url === "/widget-almanax-orange-cubic.html") || (gdpr_url === "/module-almanax.html")){
    }else{
//Pause ads loading waiting for consent
(adsbygoogle=window.adsbygoogle||[]).pauseAdRequests=1;
//Quantcast Choice. Consent Manager Tag v2.0 (for TCF 2.0)
(function() {
  var host = window.location.hostname;
  var element = document.createElement('script');
  var firstScript = document.getElementsByTagName('script')[0];
  var url = 'https://quantcast.mgr.consensu.org'
    .concat('/choice/', 'SuYXCNrSG-FZB', '/', host, '/choice.js')
  var uspTries = 0;
  var uspTriesLimit = 3;
  element.async = true;
  element.type = 'text/javascript';
  element.src = url;

  firstScript.parentNode.insertBefore(element, firstScript);

  function makeStub() {
    var TCF_LOCATOR_NAME = '__tcfapiLocator';
    var queue = [];
    var win = window;
    var cmpFrame;

    function addFrame() {
      var doc = win.document;
      var otherCMP = !!(win.frames[TCF_LOCATOR_NAME]);

      if (!otherCMP) {
        if (doc.body) {
          var iframe = doc.createElement('iframe');

          iframe.style.cssText = 'display:none';
          iframe.name = TCF_LOCATOR_NAME;
          doc.body.appendChild(iframe);
        } else {
          setTimeout(addFrame, 5);
        }
      }
      return !otherCMP;
    }

    function tcfAPIHandler() {
      var gdprApplies;
      var args = arguments;

      if (!args.length) {
        return queue;
      } else if (args[0] === 'setGdprApplies') {
        if (
          args.length > 3 &&
          args[2] === 2 &&
          typeof args[3] === 'boolean'
        ) {
          gdprApplies = args[3];
          if (typeof args[2] === 'function') {
            args[2]('set', true);
          }
        }
      } else if (args[0] === 'ping') {
        var retr = {
          gdprApplies: gdprApplies,
          cmpLoaded: false,
          cmpStatus: 'stub'
        };

        if (typeof args[2] === 'function') {
          args[2](retr);
        }
      } else {
        queue.push(args);
      }
    }

    function postMessageEventHandler(event) {
      var msgIsString = typeof event.data === 'string';
      var json = {};

      try {
        if (msgIsString) {
          json = JSON.parse(event.data);
        } else {
          json = event.data;
        }
      } catch (ignore) {}

      var payload = json.__tcfapiCall;

      if (payload) {
        window.__tcfapi(
          payload.command,
          payload.version,
          function(retValue, success) {
            var returnMsg = {
              __tcfapiReturn: {
                returnValue: retValue,
                success: success,
                callId: payload.callId
              }
            };
            if (msgIsString) {
              returnMsg = JSON.stringify(returnMsg);
            }
            event.source.postMessage(returnMsg, '*');
          },
          payload.parameter
        );
      }
    }

    while (win) {
      try {
        if (win.frames[TCF_LOCATOR_NAME]) {
          cmpFrame = win;
          break;
        }
      } catch (ignore) {}

      if (win === window.top) {
        break;
      }
      win = win.parent;
    }
    if (!cmpFrame) {
      addFrame();
      win.__tcfapi = tcfAPIHandler;
      win.addEventListener('message', postMessageEventHandler, false);
    }
  };

  makeStub();

  var uspStubFunction = function() {
    var arg = arguments;
    if (typeof window.__uspapi !== uspStubFunction) {
      setTimeout(function() {
        if (typeof window.__uspapi !== 'undefined') {
          window.__uspapi.apply(window.__uspapi, arg);
        }
      }, 500);
    }
  };

  var checkIfUspIsReady = function() {
    uspTries++;
    if (window.__uspapi === uspStubFunction && uspTries < uspTriesLimit) {
      console.warn('USP is not accessible');
    } else {
      clearInterval(uspInterval);
    }
  };

  if (typeof window.__uspapi === 'undefined') {
    window.__uspapi = uspStubFunction;
    var uspInterval = setInterval(checkIfUspIsReady, 6000);
  }
})();
//End Quantcast Choice. Consent Manager Tag v2.0 (for TCF 2.0)
//Resume ads loading after consent
__tcfapi('addEventListener', 2, function(tcData, success) {
    if (success) {
        if (tcData.gdprApplies) {
			if(tcData.eventStatus === 'tcloaded' || tcData.eventStatus === 'useractioncomplete') {
			var checkEuConsentv2 = document.cookie.indexOf('euconsent-v2=');
			var checkGGpartnersConsent = document.cookie.indexOf('addtl_consent=');
            if ((checkEuConsentv2 !== -1) && (checkGGpartnersConsent !== -1)) {
            (adsbygoogle=window.adsbygoogle||[]).pauseAdRequests=0;
            }
			}
        } else {
            (adsbygoogle=window.adsbygoogle||[]).pauseAdRequests=0;
        }
    }
});
		}