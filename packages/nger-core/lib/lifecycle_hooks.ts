export interface SimpleChange {
    previousValue: any;
    currentValue: any;
    firstChange: boolean;
    isFirstChange(): boolean;
}
export interface SimpleChanges {
    [propName: string]: SimpleChange;
}
export interface OnChanges {
    ngOnChanges(changes: SimpleChanges): void;
}
export interface OnInit {
    ngOnInit(): void;
}
export interface DoCheck {
    ngDoCheck(): void;
}
export interface OnDestroy {
    ngOnDestroy(): void;
}
export interface OnError {
    ngOnError(err: Error): void;
}
export interface OnPageNotFound {
    ngOnPageNotFound(err: Error): void;
}
export interface AfterContentInit {
    ngAfterContentInit(): void;
}
export interface AfterContentChecked {
    ngAfterContentChecked(): void;
}
export interface AfterViewInit {
    ngAfterViewInit(): void;
}
export interface AfterViewChecked {
    ngAfterViewChecked(): void;
}
