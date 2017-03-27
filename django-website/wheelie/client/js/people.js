(function() {

    var mobile;
    /* this value is set with the $large media query */
    if (document.documentElement.clientWidth < 1128) {
        mobile = 1;
    }

    if (!document.querySelector('.people-container-person')) {
        return;
    }

    var person = document.querySelectorAll('.people-container-person');
    var description = document.querySelectorAll('.people-container-person-description');

    // Get the width of a single team member's pic
    var personWidth = document.querySelector('.people-container-person').clientWidth;

    if (!mobile) {
        for (var i = 0; i < description.length; i += 1) {
            description[i].style.left = personWidth * 1.5 + 'px';
            person[i].addEventListener('mouseover', personMouseOver);
            person[i].addEventListener('mouseout', personMouseOut);
        }
    }

    if (mobile) {
        for (var j = 0; j < description.length; j += 1) {
            person[j].addEventListener('click', personClick);
        }
    }

    function personMouseOver() {
        var photo = this.querySelector('.people-container-person-photo');
        photo.classList.add('left');
    }

    function personMouseOut() {
        var photo = this.querySelector('.people-container-person-photo');
        photo.classList.remove('left');
    }

    var lastElementClicked;

    function personClick() {
        var thisDescription = this.querySelector('.people-container-person-description');

        if (lastElementClicked && lastElementClicked !== thisDescription) {
            lastElementClicked.classList.remove('fade-in');
            thisDescription.classList.add('fade-in');
        } else {
            thisDescription.classList.toggle('fade-in');
        }

        lastElementClicked = thisDescription;
    }
})();
