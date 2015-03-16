loungejs minimizes the work of writing and using javascript, it uses the loungejs: namespace eq: 'loungejs:array'  in HTML documents and references some Javascript functionality you may want to use.

Unlike other frameworks where you are still writing javascript
loungejs uses HTML like tags to execute javascript code.

Also, unlike other frameworks that load the entire library when you may only
need a small feature, loungejs loads only what you activate.

Other features supported are basic programming ideas like loops, if conditions etc.

lounge-open.js is what you include in your HTML doc as a script source to use loungejs-mod.

lounge-tender.js disables / enables what functionality is loaded from mod-lounge directory
so you only load with you are using, instead of loading one big script source where many features may not be needed for a project.

mod-lounge ( directory ) where all the loungejs tag implementations live.


all parts of the framework must live in the same directory or you will recieve errors.

