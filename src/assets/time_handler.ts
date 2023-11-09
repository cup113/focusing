function to_2digit(num: number) {
    if (num >= 10) {
        return num.toString();
    } else {
        return "0" + num.toString();
    }
}

export function format_time(seconds: number) {
    let p = seconds;
    const s = p % 60;
    p = Math.floor(p / 60);
    const m = p % 60;
    p = Math.floor(p / 60);
    const h = p;

    return `${to_2digit(h)}:${to_2digit(m)}:${to_2digit(s)}`;
}
