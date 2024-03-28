export interface __TransCompoRoot {
    parent: Parent;
}

interface Parent {
    appear: string;
    show: boolean;
    isInitialRender: boolean
}

export interface __TransCompoProps {
    ref: object;
    style: object;
    children: any
}