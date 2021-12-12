import { Directive, HostListener } from '@angular/core';

@Directive({
    selector: '[PinInput]'
})
export class PinInput {

    constructor() { }

    @HostListener('keydown', ['$event']) onKeyDown(event: KeyboardEvent) {
        let e = <KeyboardEvent>event;
        switch (e.code) {
            case 'Minus':
            case 'NumpadSubtract':
            case 'Backspace':
            case 'Backspace':
            case 'Delete':
            case 'ArrowLeft':
            case 'ArrowRight':
            case 'Tab':
                return;
            default:
                break;
        }
        if (// Allow: Ctrl+A
            (e.code === 'KeyA' && (e.ctrlKey || e.metaKey)) ||
            // Allow: Ctrl+C
            (e.code === 'KeyC' && (e.ctrlKey || e.metaKey)) ||
            // Allow: Ctrl+V
            (e.code === 'KeyV' && (e.ctrlKey || e.metaKey)) ||
            // Allow: Ctrl+X
            (e.code === 'KeyX' && (e.ctrlKey || e.metaKey)) ||
            // Allow: home, end, left, right
            (e.keyCode >= 35 && e.keyCode <= 39)
        ) {
            // let it happen, don't do anything
            return;
        }
        // Ensure that it is a number and stop the keypress
        if (e.key === ' ' || e.key === '-' || isNaN(Number(e.key))) {
            e.preventDefault();
        }
    }
}