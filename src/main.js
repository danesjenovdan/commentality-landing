import '@/assets/css/app.scss'

import jQuery from 'jquery'

// import 'bootstrap/dist/js/bootstrap.bundle.min'
window.$ = jQuery

$('#submit').on('click', (event) => {
    event.preventDefault()

    const email = $('#email')
    const body = $('#message')
    const submit = $('#submit')

    if (!email.val()) {
        email.focus()
        return
    }

    if (!body.val()) {
        body.focus()
        return
    }

    [email, body, submit].forEach(item => item.prop('disabled', true))

    $.ajax({
        type: 'POST',
        url: 'https://shop.djnd.si/api/send_as_email/',
        data: JSON.stringify({
            title: 'commentality',
            email: email.val(),
            body: body.val(),
        }),
        dataType: 'json',
        success: () => {
            $('.form').hide()
            $('.thank-you').show()
        },
        error: () => {
            [email, body, submit].forEach(item => item.prop('disabled', false))
        },
    })
})

// Select all links with hashes
$('a[href*="#"]')
    .click((event) => {
        // Figure out element to scroll to
        let target = $(this.hash)
        target = target.length ? target : $(`[name=${this.hash.slice(1)}]`)
        // Does a scroll target exist?

        // Only prevent default if animation is actually gonna happen
        event.preventDefault()
        $('html, body').animate({
            scrollTop: target.offset().top,
        }, 1000, () => {
            // Callback after animation
            // Must change focus!
            const $target = $(target)
            $target.focus()
        })
    })
