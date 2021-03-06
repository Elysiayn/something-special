[].forEach.call(document.getElementsByClassName('tags-input'), function (el) {
    let hiddenInput = document.createElement('input'),
        mainInput = document.createElement('input');
    tags = [];

    hiddenInput.setAttribute('type', 'hidden');
    hiddenInput.setAttribute('name', el.getAttribute('data-name'));

    mainInput.setAttribute('type', 'text');
    mainInput.classList.add('main-input', 'form-control', 'w-100');
    mainInput.addEventListener('input', function () {
        let enteredTags = mainInput.value.split(',');
        if (enteredTags.length > 1) {
            enteredTags.forEach(function (t) {
                let filteredTag = filterTag(t);
                if (filteredTag.length > 0)
                    addTag(filteredTag);
            });
            // clears input field 
            mainInput.value = '';
        }
    });

    // pressing enter adds tag
    mainInput.addEventListener('keyup', function (e) {
        e.preventDefault();
        let keyCode = e.which || e.keyCode;
        let enteredTags = mainInput.value.split();
        console.log("in listener")

        console.log("Key", keyCode);
        console.log("Length", mainInput.value.length);
        if (keyCode === 13 && enteredTags.length > 0) {
            console.log('if triggered')
            console.log(enteredTags)
            enteredTags.forEach (function (t) {
                let filteredTag = filterTag(t);
                if (filteredTag.length > 0)
                    addTag(filteredTag);
            }
            );
            // clears input field
            mainInput.value = '';
        }
    });

    // pressing backspace deletes last tag
    mainInput.addEventListener('keydown', function (e) {
        let keyCode = e.which || e.keyCode;
        if (keyCode === 13) {
            e.preventDefault()
            return false
        }
        if (keyCode === 8 && mainInput.value.length === 0 && tags.length > 0) {
            removeTag(tags.length - 1);
        }
    });

    el.appendChild(mainInput);
    el.appendChild(hiddenInput);

    //test tag
    // addTag('hello!');

    function addTag(text) {
        let tag = {
            text: text,
            element: document.createElement('span'),
        };
        tag.element.classList.add('tag');
        tag.element.textContent = tag.text;

        let closeBtn = document.createElement('span');
        closeBtn.classList.add('close');
        closeBtn.addEventListener('click', function () {
            removeTag(tags.indexOf(tag));
        });
        tag.element.appendChild(closeBtn);

        tags.push(tag);

        el.insertBefore(tag.element, mainInput);

        refreshTag();
    }

    function removeTag(index) {
        let tag = tags[index];
        tags.splice(index, 1);
        el.removeChild(tag.element);
        refreshTag();
    }

    function refreshTag() {
        let tagsList = [];
        tags.forEach(function (t) {
            tagsList.push(t.text);
        });
        hiddenInput.value = tagsList.join(',');
    }

    function filterTag(tag) {
        //current filter removes all puncutation besides - and _ and leave spaces, trim all white space of edges and replace all remaining white spaces w/ -
        return tag.replace(/[^\w -]/g, '').trim().replace(/\W+/g, '-');
    }

});