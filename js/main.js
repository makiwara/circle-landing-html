/* Prepare icons */
var data = [ 
    '01', '02', '03', '04', '05', '06', '07', '08', '09', '10',
    'practice-1-books', 'practice-2-lecture', 'practice-3-research', 'practice-4-studies', 'practice-5-reflect' ];
var fallback = {}, placement = {};
for (var i=0; i<data.length; i++) {
    fallback['symbol-'+data[i]] = data[i] + '.png';
    placement['.icon-'+data[i]] = 'symbol-'+data[i];
}
$.svgIcons('img/icons/icons.svg', { 
        w: 64,
        h: 64,
        fallback_path: 'img/icons/', 
        fallback: fallback,
        placement: placement
})
