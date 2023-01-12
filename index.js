const triggers = {
    ON_SCREEN: 'on screen',
    ON_MOUSE_OVER: 'on mouse over',
    ON_MOUSE_OUT: 'on mouse out',
}
callBack = (element) => { }

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
                oldCSSProperties['transition'] = ` transform ${transition}ms `;
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
            if (animation[1] === 'expand') {
                oldCSSProperties['max-height'] = 0
                newCSSProperties['max-height'] = 1000
            }
        }
    })
    return { oldCSSProperties, newCSSProperties }
}

function isElementInViewport(elt) {
    return (
        elt.offsetTop >= window.scrollY &&
        elt.offsetTop + elt.offsetHeight <= window.scrollY + window.innerHeight
    )
}


function handleAnimatedElements() {
    let animated = 'transform up-scaleup,fade in'
    let transition = '700'
    let trigger = triggers.ON_SCREEN

    function animate(v, properties) {
        callBack(v)
        $(v).animate(properties.newCSSProperties, parseInt(transition))
        $(v).removeClass('animated')
    }

    $('.animated').each((k, v) => {
        if ($(v).data('animated') !== undefined)
            animated = $(v).data('animated')
        if ($(v).data('transition') !== undefined)
            transition = $(v).data('transition')
        if ($(v).data('trigger') !== undefined)
            trigger = $(v).data('trigger')
        const properties = getCSSProperties(animated, transition, trigger, v)
        $(v).css(properties.oldCSSProperties)
        setTimeout(() => {
            if (trigger === triggers.ON_SCREEN && isElementInViewport(v)) {
                animate(v, properties)
            } else if(trigger === triggers.ON_MOUSE_OVER){
                $(v).on('mouseover', () => {
                    animate(v, properties)
                })
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