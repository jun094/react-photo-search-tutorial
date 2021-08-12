// num : getTime()
// local : 'en' || 'ko'
export const DateFormat = (_num, _locale) => {
    const num = _num ? _num : new Date().getTime();
    const locale = _locale ? _locale : 'ko';

    const date = new Date(num * 1);
    const y = date.getFullYear();
    let m = date.getMonth() + 1;
    let d = date.getDate();

    m = m < 10 ? '0' + String(m) : m;
    d = d < 10 ? '0' + String(d) : d;

    if (locale === 'ko') return y + '.' + m + '.' + d;
    return d + '.' + m + '.' + y;
};

export const DateWeekSubtract = (_num) => {
    const num = _num ? _num : new Date().getTime();

    let date = new Date(num * 1);
    let dayOfMonth = date.getDate();
    date.setDate(dayOfMonth - 7);

    return DateFormat(new Date(date).getTime());
};

export const DateMonthSubtract = (_num) => {
    const num = _num ? _num : new Date().getTime();

    let date = new Date(num * 1);
    let monthOfYear = date.getMonth();
    date.setMonth(monthOfYear - 1);

    return DateFormat(new Date(date).getTime());
};
