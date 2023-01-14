# dom-animation
A Javascript library that provides shorthand DOM elements animations especially for landing pages.

# Getting Started

## Installation

run the following command
```bash
npm install @nikolajs/dom-animation
```

include in your html file
```html
    <script src="path/to/node_modules/@nikolajs/dom-animation/index.js"></script>
```

## Basic Usage
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

## Animations

Animations are defined under 'data-animated' attribute separated by a comma. 

### Transform

Specify that the animation segment is a transform property than specify a direction to translate the element in
#### Example
```html
<div 
    class="animated"
    data-animated="transform up"
    data-transition="700"
    data-trigger="on screen">
    <!-- ... -->    
    <!-- ... -->    
    <!-- ... -->    
</div>
```

### Fade

When mentioned, this property fades in the element
#### Example
```html
<div 
    class="animated"
    data-animated="fade"
    data-transition="700"
    data-trigger="on screen">
    <!-- ... -->    
    <!-- ... -->    
    <!-- ... -->    
</div>
```

### Height
#### Expand 
This property expands the element's height
##### Example
```html
<div 
    class="animated"
    data-animated="height expand"
    data-transition="700"
    data-trigger="on screen">
    <!-- ... -->    
    <!-- ... -->    
    <!-- ... -->    
</div>
```
#### Shrink 
This property shrinks the element's height
##### Example
```html
<div 
    class="animated"
    data-animated="height shrink"
    data-transition="700"
    data-trigger="on screen">
    <!-- ... -->    
    <!-- ... -->    
    <!-- ... -->    
</div>
```

## Using the data-target property
The data-target property applies the animation options on the element that has the 
mentioned selector 
### Example
```html
<h2 
    class="animated" 
    data-trigger="on mouse over"
    data-animated="height expand" 
    data-target="#height-expand">
    Height Expand
</h2>
    <div id="height-expand">
        <div class="card card-light p-2">
            <h3 class="text-dark">
                Lorem upsum dolor sit amet
            </h3>
            <p class="text-secondary">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
                voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
        </div>
    </div>
```
