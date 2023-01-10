# dom-animation
A Javascript library that provides shorthand DOM elements animations especially for landing pages.

#Getting Started

##Installation

run the following command
```bash
npm install @nikolajs/dom-animation
```

##Usage
```html
    <div 
        class="animated"
        data-animated="fade,transform up"
        data-transition="700"
        data-trigger="on screen">
        <!-- ... -->    
        <!-- ... -->    
        <!-- ... -->    
    </div>
```

##Animations

Animations are defined under 'data-animated' attribute separated by a comma. 

###Transform

Specify that the animation segment is a transform property than specify a direction to translate the element in

###Fade

When defined, this property fades in the element