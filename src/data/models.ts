export interface CommSearch {
    // Pageable
    page?: number;
    size?: number;
    sort?: string;

    // 날짜 검색
    selDtKind?: string;
    txtDtFrom?: string;
    txtDtTo?: string;

    // 범위 검색
    selSection?: string;
    txtSectionFrom?: string;
    txtSectionTo?: string;

    // 키워드 검색
    selDetail?: string;
    txtDetail?: string;
}

export interface CommDetails {
    seqCreate?: number;
    seqUpdate?: number;
    dtCreate: Date;
    dtUpdate: Date;
}

export interface FieldError {
    field: string;
    value: any;
    reason: string;
}

export interface BoardSearch extends CommSearch {
    name?: string;
    toc?: string; // title + content
    use?: boolean;
}

export interface BoardDetails extends CommDetails {
    seqBoard?: number;
    title?: string;
    content?: string;
    use?: boolean;
    name?: string;

    user?: UserDetails;
}

export interface UserDetails extends CommDetails {
    seqUser?: number;
    name?: string;
    email?: string;
    urlPicture?: string;
}