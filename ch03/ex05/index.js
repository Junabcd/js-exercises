export function LFtoCRLF(s1){   
    let replace_s1 = s1.replaceAll("\n", "\r\n");
    return replace_s1;
};

export function CRLFtoLF(s2){   
    let replace_s2 = s2.replaceAll("\r\n", "\n");
    return replace_s2;
};