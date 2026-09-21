export function resize1(params) {
    let maxWidth = 600;
    let maxHeight = 480;

    (params && params.maxWidth) && (maxWidth=params.maxWidth) || maxWidth;

    (params && params.maxHeight) && (maxHeight=params.maxHeight) || maxHeight;

    console.log({ maxWidth, maxHeight });
}

export function resize2(params) {
    let maxWidth = 600;
    let maxHeight = 480;

     maxWidth = params?.maxWidth ?? maxWidth;

    maxHeight = params?.maxHeight ?? maxHeight;

    console.log({ maxWidth, maxHeight });
}