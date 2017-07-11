var Yaj = require('yaj');

beforeEach(() => {

});

afterEach(() => {
    document.body.innerHTML = "";
});

test('Testing basic selectors', () => {
    document.body.innerHTML = '<div><p class="test">content</p></div>';
    var selector = yo('.test');
    expect(selector.html()).toBe('content');
    expect(selector.els().length).toBe(1);

    document.body.innerHTML = '<div><p id="test">content2</p></div>';
    var selector = yo('#test');
    expect(selector.html()).toBe('content2');
    expect(selector.els().length).toBe(1);

    selector.html('new test')
    expect(selector.html()).toBe('new test');
    expect(document.body.innerHTML).toBe('<div><p id="test">new test</p></div>');
    expect(selector.els().length).toBe(1);
});

test('Testing hasClass, toggleClass, addClass, removeClass', () => {
    document.body.innerHTML = '<div><p id="test" class="cls1 cls2">content2</p></div>';
    var selector = yo('#test');
    expect(selector.hasClass('cls1')).toBe(true);
    expect(selector.hasClass('cls2')).toBe(true);
    expect(selector.hasClass('cls3')).toBe(false);

    selector.toggleClass('cls2');
    expect(selector.hasClass('cls2')).toBe(false);
    selector.toggleClass('cls2');
    expect(selector.hasClass('cls2')).toBe(true);

    selector.addClass('cls3');
    expect(selector.hasClass('cls3')).toBe(true);
    selector.removeClass('cls3');
    expect(selector.hasClass('cls3')).toBe(false);
});

test('Testing attr, css', () => {
    document.body.innerHTML = '<div><img id="test" /></div>';
    var selector = yo('#test');
    expect(selector.attr('src')).toBe("");
    selector.attr('src', '/some-image.png');
    expect(selector.attr('src')).toBe('/some-image.png');

    expect(selector.css('font-family')).toBe("");
    selector.css('font-family', 'Arial');
    expect(selector.css('font-family')).toBe('Arial');
});

test('Testing append and remove', () => {
    document.body.innerHTML = '<div><p class="test">content</p><p class="tmpl">value</p><p id="x">vl</p></div>';

    var selector = yo('.test');
    expect(selector.html()).toBe("content");

    selector.append('<div>appended</div>');
    expect(selector.html()).toBe('content<div>appended</div>');

    var selector2 = yo('.tmpl');
    selector.append(selector2);
    expect(selector.html()).toBe('content<div>appended</div><p class="tmpl">value</p>');

    var element = document.getElementById('x');
    selector.append(element);
    expect(selector.html()).toBe('content<div>appended</div><p class="tmpl">value</p><p id="x">vl</p>');

    expect(document.body.innerHTML).toBe('<div><p class="test">content<div>appended</div><p class="tmpl">value</p><p id="x">vl</p></p><p class=\"tmpl\">value</p></div>');
    selector.remove();
    expect(document.body.innerHTML).toBe('<div><p class=\"tmpl\">value</p></div>');
});
