const main = $('main');

function ConfigureLinks() {
    $('[link]').each((index, link) => {
        link.href = link.attributes['link'].value;
    });
}

function Navigate(hash) {
    if (!hash)
        return;
    const destiny = $('[destiny-link]');
    const url = hash.substring(1);
    fetch(url)
        .then(response => response.text())
        .then(html => {
            destiny.html(html);
        });
}

function InitialPage() {
    Navigate('#pages/home.html');
}

ConfigureLinks();
InitialPage();