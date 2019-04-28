export abstract class ChangeDetectorRef {
    abstract markForCheck(): void;
    abstract detach(): void;
    abstract detectChanges(): void;
    abstract checkNoChanges(): void;
    abstract reattach(): void;
}