
(async function ({ integrationHost, integrationQuery }) {
  const chints = ["platform", "platformVersion", "architecture", "model", "uaFullVersion"];
  const userAgentData = (
    navigator &&
    navigator.userAgentData &&
    typeof navigator.userAgentData.getHighEntropyValues === "function"
  )
    ? await navigator.userAgentData.getHighEntropyValues(chints)
    : {};

  const userAgentDataStr = JSON.stringify(userAgentData);
  const uaDataValues = `uaDataValues=${userAgentDataStr}`;

  this.attachScript = function (url) {
    const d = window.document;
    const head = d.getElementsByTagName('head')[0];
    const script = d.createElement('script');
    script.type = 'text/javascript';
    script.src = url;
    script.async = 1;
    script.defer = true;
    head.appendChild(script);
  };

  this.getMainScriptUrl = function () {
    const doc_location = window.location.toString();
    const ippContent = localStorage.getItem("ippContent");
    const wpContent = localStorage.getItem("wpContent");
    const pwaContent = localStorage.getItem("pwaContent");
    const isIpadSign = this.checkIsIpad() ? { isIpadSign: true } : {};

    const searchParams = new URLSearchParams({ ...integrationQuery, ippContent, wpContent, pwaContent, doc_location, ...isIpadSign });
    for (const [key, value] of [...searchParams]) {
      if (!value) {
        searchParams.delete(key);
      }
    }

    return `${integrationHost}/ufis/main.js?${searchParams.toString()}&${uaDataValues}`;
  };

  this.checkIsIpad = function () {
    return !!(
      navigator.maxTouchPoints
      && navigator.maxTouchPoints > 2 
      && /MacIntel/.test(navigator.platform)
    );
  }

  const url = this.getMainScriptUrl();
  this.attachScript(url);
})({"integrationHost":"https://seekmymatch.com","integrationQuery":{"tds_ao":"1","amp;s1":"ps","amp;affid":"43882472","amp;_tgUrl":"aHR0cHM6Ly9zZWVrbXltYXRjaC5jb20vdGRzL2FlL3RnL3MvOWZlOThmZjk0NDliN2ExOTRkMmY3OWFlYjc3ZGRkOWY/X190PTE3MjM1NTEwODMxNjcmX19sPTM2MDAmX19jPTcxZGEyNDMwYjZhNGZmYmFkNGViZjQ0ZmFiNjljZTFiMWFmZjliMTU=","amp;tds_id":"b7838dem_jump_a_1566560547761","amp;subid2":"2666737341","amp;tds_ac_id":"s8304dem","amp;id":"25894","amp;clickid":"dtfzw66bb4d6a000d486b","amp;utm_source":"int","amp;tds_cid":"71da2430b6a4ffbad4ebf44fab69ce1b1aff9b15","amp;dci":"e0456a2a0435f044ed5b7174b3367fa5063aa0e1","amp;subid":"37","amp;tds_campaign":"b7838dem","amp;tds_host":"seekmymatch.com","amp;tds_oid":"25894"}});
