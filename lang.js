// 한국어/영어 페이지 전환
// - 각 페이지 <head>에 상대 언어 페이지를 <link rel="alternate" hreflang="ko|en" href="..."> 로 적고, 이 스크립트를 그 뒤에 불러온다.
// - KO/EN 버튼(.lang-switch a[hreflang])으로 고른 언어는 localStorage에 기억한다.
// - 고른 적이 없으면 브라우저 언어가 한국어일 때 한국어, 아니면 영어 페이지로 보낸다.
(function () {
  var current = document.documentElement.lang === 'en' ? 'en' : 'ko';
  var saved = null;
  var storageOk = true;
  try { saved = localStorage.getItem('lang'); } catch (e) { storageOk = false; }
  var wanted = saved || (/^ko\b/i.test(navigator.language || '') ? 'ko' : 'en');

  // 저장소를 못 쓰면 고른 언어를 기억할 수 없어 자동 이동이 KO/EN 버튼을 되돌려 버리므로 이동하지 않는다
  if (storageOk && wanted !== current) {
    var alt = document.querySelector('link[rel="alternate"][hreflang="' + wanted + '"]');
    if (alt) {
      location.replace(alt.getAttribute('href') + location.hash);
      return;
    }
  }

  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('.lang-switch a[hreflang]');
    if (!a) return;
    try { localStorage.setItem('lang', a.getAttribute('hreflang')); } catch (err) {}
  });
})();
