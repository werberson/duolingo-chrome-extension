var template = document.createElement('template');
template.innerHTML = '<div id="styles"></div>';
document.body.appendChild(template.content.firstChild);

template = document.createElement('template');
template.innerHTML = "<bdi><span><span><bdi><span class=\"hints-sentence popover-well\" style=\"position: relative;\"><span><span class=\"token-wrapper popover-wrapper\"><span class=\" non-space token   \" id=\"token_0\" data-token-index=\"0\">Traduza o que ouvir. <a onclick=\"window.postMessage({ action: 'showText'}, '*');\">mostrar</a></span></span></span></span></bdi></span></span></bdi>";
var hideOver = template.content.firstChild;

var hiding = false;

MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
var observer = new MutationObserver(function(mutations) {
    // fired when a mutation occurs
    mutations.forEach(function(mutation) {
        if(mutation.target.id === 'big-speaker' && mutation.addedNodes.length === 3) {
            hideText();
        } else if(hiding) {
            if(mutation.target.id === 'prev-session-element-container' && mutation.removedNodes.length > 0) {
                addInstructionText();
            } else if(mutation.target.className === 'hints translation-source' && mutation.addedNodes.length > 0) {
                addInstructionText();
            } else if(mutation.target.id === 'next_button' && mutation.target.innerText === 'Continuar'){
                showText();
            }
        }
    });
});

function hideText() {
    hiding = true;
    document.querySelector('#styles').innerHTML = '<style>.translation-source { display: none; }</style>';
    addInstructionText();
}

function showText() {
    hiding = false;
    document.querySelector('#styles').innerHTML = '<style>.translation-source { display: block; }</style>';
    document.querySelector('.text-to-translate').removeChild(hideOver);
}

function addInstructionText() {
    document.querySelector('.text-to-translate').appendChild(hideOver);
}

window.addEventListener("message", function(event) {
    // We only accept messages from ourselves
    if (event.source != window)
        return;

    if (event.data.action && (event.data.action == "showText")) {
        showText();
        console.log("Content script received: " + event.data);
    }
}, false);

// define what element should be observed by the observer
// and what types of mutations trigger the callback
observer.observe(document.body, {
    subtree: true,
    childList: true
});