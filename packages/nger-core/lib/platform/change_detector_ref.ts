export abstract class ChangeDetectorRef {
    abstract markForCheck(): void;
    abstract detach(): void;
    abstract detectChanges(): void;
    abstract checkNoChanges(): void;
    abstract reattach(): void;
}

export class DefaultChangeDetectorRef extends ChangeDetectorRef {
    markForCheck(): void { }
    detach(): void { }
    detectChanges(): void { }
    checkNoChanges(): void { }
    reattach(): void { }
}