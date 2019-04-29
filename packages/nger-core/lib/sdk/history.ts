import { Action, Location, LocationListener, LocationState, Href, Path, LocationDescriptorObject, TransitionPromptHook, UnregisterCallback } from 'history'
export abstract class History<HistoryLocationState = LocationState> {
    length: number;
    action: Action;
    location: Location<HistoryLocationState>;
    abstract push(path: Path, state?: HistoryLocationState): void;
    abstract push(location: LocationDescriptorObject<HistoryLocationState>): void;
    abstract replace(path: Path, state?: HistoryLocationState): void;
    abstract replace(location: LocationDescriptorObject<HistoryLocationState>): void;
    abstract go(n: number): void;
    abstract goBack(): void;
    abstract goForward(): void;
    abstract block(prompt?: boolean | string | TransitionPromptHook): UnregisterCallback;
    abstract listen(listener: LocationListener): UnregisterCallback;
    abstract createHref(location: LocationDescriptorObject<HistoryLocationState>): Href;
}
