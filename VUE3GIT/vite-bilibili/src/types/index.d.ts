declare module "rgbaster"{
    interface Opts {
        ignore?: string[];
        scale?: number;
        skipTransparentPixels?: boolean;
    }
    export default function (src: string, opts?: Opts): Promise<{
        color: string;
        count: number;
    }[]>;
    export {};
}
declare module "vue3-infinite-list"
