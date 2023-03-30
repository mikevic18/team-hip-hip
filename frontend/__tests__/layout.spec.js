const renderDOM = require('./helpers.js__')

describe('index layout', () => {
    let dom;

    beforeEach(async () => {
        dom = await renderDOM('index.html')
    })

    afterEach(() => {
        dom.window.document.body.innerHTML = ''
    })

    describe('open nav', () => {
        it('Should open navigation when clicked', () => {
            const openNav = dom.window.document.querySelector('#open-nav')
            const sidebar = dom.window.document.querySelector('sidebar')

            openNav.dispatchEvent(new dom.window.MouseEvent('click'))
            expect(sidebar.style.width).toBe('250px')
        })
    })

})