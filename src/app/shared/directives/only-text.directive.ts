import { Directive, HostListener } from '@angular/core';

@Directive({
    selector: '[OnlyText]'
})
export class OnlyText {

    constructor() { }

    @HostListener('keydown', ['$event']) onKeyDown(event: KeyboardEvent) {
        let e = <KeyboardEvent>event;
        switch (e.code) {
            case 'Space':
                return
            default:
                break;
        }
        if(e.code.startsWith('Key')) return;
        // if ([46, 8, 9, 27, 13, 110, 190].indexOf(Number(e.keyCode)) !== -1 ||
        //     // Allow: Ctrl+A
        //     (e.code === 'KeyA' && (e.ctrlKey || e.metaKey)) ||
        //     // Allow: Ctrl+C
        //     (e.code === 'KeyA' && (e.ctrlKey || e.metaKey)) ||
        //     // Allow: Ctrl+V
        //     (e.code === 'KeyV' && (e.ctrlKey || e.metaKey)) ||
        //     // Allow: Ctrl+X
        //     (e.code === 'KeyX' && (e.ctrlKey || e.metaKey)) ||
        //     // Allow: home, end, left, right
        //     (e.keyCode >= 35 && e.keyCode <= 39)) {
        //     // let it happen, don't do anything
        //     return;
        // }
        // Ensure that it is a number and stop the keypress
        if (e.key === ' ' || !isNaN(Number(e.key))) {
            e.preventDefault();
        }
    }
}