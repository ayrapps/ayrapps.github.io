// Points download buttons at the latest release's zip and shows its version.
// The static href (the Releases page) stays as the fallback if this fails.
(function () {
  var buttons = document.querySelectorAll("[data-latest-zip]");
  if (buttons.length) {
    var repo = buttons[0].getAttribute("data-latest-zip");
    fetch("https://api.github.com/repos/" + repo + "/releases/latest", {
      headers: { Accept: "application/vnd.github+json" }
    })
      .then(function (r) { return r.ok ? r.json() : null; })
      .then(function (release) {
        if (!release || !release.assets) return;
        var zip = release.assets.filter(function (a) { return /\.zip$/i.test(a.name); })[0];
        if (!zip) return;
        var version = String(release.tag_name || "").replace(/^v/, "");
        buttons.forEach(function (b) { b.href = zip.browser_download_url; });
        document.querySelectorAll("[data-latest-version]").forEach(function (el) {
          el.textContent = el.getAttribute("data-latest-version").replace("{v}", version);
          el.hidden = false;
        });
      })
      .catch(function () {});
  }

  document.querySelectorAll("[data-copy]").forEach(function (button) {
    button.addEventListener("click", function () {
      var target = document.getElementById(button.getAttribute("data-copy"));
      if (!target || !navigator.clipboard) return;
      var label = button.textContent;
      navigator.clipboard.writeText(target.textContent.trim()).then(function () {
        button.textContent = button.getAttribute("data-copied") || "Copied";
        setTimeout(function () { button.textContent = label; }, 1600);
      });
    });
  });
})();
