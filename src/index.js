import { $ } from './common/selectors.helper.js';

document.addEventListener('DOMContentLoaded', (e) => {
    let item = $('a');
    console.log(item.length);
    item.each((n, i) => {
        console.log(i, n.href, n.target);
    });
    console.log($('#root').length);
    $('li').on('click', (e) => {
        console.log('clicked!');
    });
    $('li').on('click', (e) => {
        console.log('clicked! again', $(e.target).html());
    });

    $('li.liB').on('click', e => {
        console.log($('li.liB').parent());
        console.log($('li.liB').nthParent(4));
        $('a').toggle('blurp abc');
    });

    console.log($('ul').find('li'));

    $('#root').append(item);
    $('#root').prepend('<div>ac</div>');

    $('a').addClass('xyz abc def');

    console.log($('ul').text());
});