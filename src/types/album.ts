export enum TemplateType {
    TEMPLATE_1 = 'template1',
    TEMPLATE_2 = 'template2',
    TEMPLATE_3 = 'template3'
}

export type Slot = {
    id: string;
    occupied: boolean;
    stickerId?: string;
};

export type Sticker = {
    id: string;
    image: string;
};

export type AlbumPage = {
    id: string;
    templateType: TemplateType;
    slots: Slot[];
    infoText?: string;
}; 