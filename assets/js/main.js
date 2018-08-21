$(document).ready(function () {
    replaceAllMarkdownLink();
});

/**
 * 替换页面中所有的<a href="*.md">的为<a href="*.html">
 */
function replaceAllMarkdownLink() {
    $('a').each(function () {
        $a = $(this);
        let href = $a.attr('href');
        if (href !== undefined && href.indexOf('.md') !== -1) {
            console.log(href);
            $a.attr('href', href.substr(0, href.length - 3).concat('.html'));
        }
    })
}