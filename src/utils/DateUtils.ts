import moment from 'moment';
import 'moment/locale/ko';  // TODO 동적으로 적용시키기

export const dateToString = (date: Date, pattern?: string) => {
    if (!pattern) {
        // pattern = 'YYYY MM DD h:mm:ss';
        pattern = 'LLL';
    }
    return moment(date).format(pattern);
}

export const stringToDate = (txtDt: string, pattern?: string) => {
    if (!pattern) {
        return moment(txtDt).toDate();
    } else {
        return moment(txtDt, pattern).toDate();
    }
}