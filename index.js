import "https://ajax.googleapis.com/ajax/libs/jquery/3.6.1/jquery.min.js"

const $ = jQuery

const triggers = {
    ON_SCREEN: 'on screen',
    ON_MOUSE_OVER: 'on mouse over',
    ON_MOUSE_OUT: 'on mouse out',
}

let callBack = (element) => { }

function getCSSProperties(animated, transition, trigger, elt) {
    const oldCSSProperties = {}
    const newCSSProperties = {}
    const statements = animated.split(',')
    const animations = statements?.map(elt => elt.split(' '))
    animations?.forEach(animation => {
        console.log('animation', animation)
        if (animation[0] === 'transform') {
            const transforms = animation?.[1]?.split('-') || ['up']
            transforms?.forEach(transformProperty => {
                if (!oldCSSProperties['transition'])
                    oldCSSProperties['transition'] = ''
                oldCSSProperties['transition'] += ` transform ${transition}ms `;
                if (transformProperty === 'up') {
                    oldCSSProperties['transform'] = 'translateY(50%)';
                    callBack = (element) => {
                        $(element).css({ "transform": "translateY(0)" })
                    }
                } else if (transformProperty === 'right') {
                    oldCSSProperties['transform'] = 'translateX(-50%)';
                    callBack = (element) => {
                        $(element).css({ "transform": "translateX(0)" })
                    }
                } else if (transformProperty === 'left') {
                    oldCSSProperties['transform'] = 'translateX(50%)';
                    callBack = (element) => {
                        $(element).css({ "transform": "translateX(0)" })
                    }
                } else if (transformProperty === 'down') {
                    oldCSSProperties['transform'] = 'translateY(-50%)';
                    callBack = (element) => {
                        $(element).css({ "transform": "translateY(0)" })
                    }
                }
            })
        } else if (animation[0] === 'fade') {
            if (animation[1] === 'out') {
                oldCSSProperties['opacity'] = 1
                newCSSProperties['opacity'] = 0
            } else {
                oldCSSProperties['opacity'] = 0
                newCSSProperties['opacity'] = 1
            }
        } else if (animation[0] === 'height') {
            oldCSSProperties['overflow'] = 'hidden';
            newCSSProperties['overflow'] = 'hidden';
            if (animation[1] === 'expand') {
                oldCSSProperties['max-height'] = 0
                newCSSProperties['max-height'] = 1000
            } else if (animation[1] === "shrink") {
                oldCSSProperties['max-height'] = 1000
                newCSSProperties['max-height'] = 0
            }
        }
    })
    return { oldCSSProperties, newCSSProperties }
}

function isElementInViewport(elt) {
    const rect = elt.getBoundingClientRect();

    return (
        rect.top <= window.screenTop + window.innerHeight &&
        rect.top >= window.screenTop ||
        rect.bottom <= window.screenTop + window.innerHeight &&
        rect.bottom >= window.screenTop
    );

}


function handleAnimatedElements() {

    $('.animated').each((k, v) => {
        let animated = 'transform up-scaleup,fade in'
        let transition = '700'
        let trigger = triggers.ON_SCREEN

        function animate(v, properties) {
            callBack(v)
            $(v).animate(properties.newCSSProperties, parseInt(transition))
            $(v).removeClass('animated')
        }
        if ($(v).data('animated') !== undefined)
            animated = $(v).data('animated')
        if ($(v).data('transition') !== undefined)
            transition = $(v).data('transition')
        if ($(v).data('trigger') !== undefined)
            trigger = $(v).data('trigger')
        const properties = getCSSProperties(animated, transition, trigger, v)
        console.log(properties.oldCSSProperties)
        $(v).css(properties.oldCSSProperties)
        setTimeout(() => {
            if (trigger === triggers.ON_MOUSE_OVER) {
                $(v).on('mouseover', () => {
                    callBack(v)
                    animate(v, properties)
                })
            }
            else {
                callBack(v)
                animate(v, properties)
            }
        }, 100)
    })
}

$(window).on('load', () => {
    handleAnimatedElements()
    $(window).on('scroll', (scrollEvent) => {
        handleAnimatedElements()
    })
})