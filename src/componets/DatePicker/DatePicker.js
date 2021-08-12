import React, { useState, createContext, useContext, useCallback } from 'react';
import { DateFormat, DateWeekSubtract, DateMonthSubtract } from './DatePickerCtrl';
import Calendar from '../Calendar';
import moment from 'moment';

import styles from './DatePicker.module.scss';

const DatePickerContext = createContext();
const useDatePickerContext = () => useContext(DatePickerContext);

const DatePicker = ({ open, onClose, getDate, navigation, totalStart, totalEnd }) => {
    // DatePickerHeader의 date field
    const [date, setDate] = useState({
        start: 'dd/mm/yyyy',
        end: 'dd/mm/yyyy',
    });
    // DatePicker 네비게이션 data
    const [navTerms, setNavTerms] = useState([
        {
            id: 'total',
            text: '전체',
            active: 'default',
        },
        {
            id: 'today',
            text: '오늘',
            active: 'default',
        },
        {
            id: 'week',
            text: '최근 일주일',
            active: 'default',
        },
        {
            id: 'month',
            text: '최근 한 달',
            active: 'default',
        },
    ]);

    // DatePicker Methods
    const onClickNavBtn = useCallback(
        (id) => {
            // navigation state
            setNavTerms(navTerms.map((term) => (term.id === id ? { ...term, active: 'able' } : { ...term, active: 'disable' })));

            if (id === 'total') {
                setDate({
                    ...date,
                    start: DateFormat(totalStart),
                    end: DateFormat(totalEnd),
                });
            } else if (id === 'today') {
                setDate({
                    ...date,
                    start: DateFormat(),
                    end: DateFormat(),
                });
            } else if (id === 'week') {
                setDate({
                    ...date,
                    start: DateWeekSubtract(),
                    end: DateFormat(),
                });
            } else {
                setDate({
                    ...date,
                    start: DateMonthSubtract(),
                    end: DateFormat(),
                });
            }
        },
        [date, navTerms]
    );
    const onCalendar = (nextValue) => {
        const [start, end] = nextValue;

        setDate({
            ...date,
            start: DateFormat(start),
            end: end ? DateFormat(end) : DateFormat(start),
        });

        setNavTerms(navTerms.map((term) => ({ ...term, active: 'default' })));
    };
    const onClickFooterBtn = (e) => {
        const { name } = e.target;

        if (name === 'apply') {
            getDate(date);
        }

        onClose(false);
    };

    // Context state
    const value = {
        navigation,

        date,
        setDate,
        navTerms,
        setNavTerms,

        onClickNavBtn,
        onCalendar,
        onClickFooterBtn,
    };
    return (
        open && (
            <DatePickerContext.Provider value={value}>
                <div className={styles.DatePicker}>
                    <DatePickerHeader />
                    <DatePickerBody />
                    <DatePickerFooter />
                </div>
            </DatePickerContext.Provider>
        )
    );
};
const DatePickerHeader = () => {
    const { date } = useDatePickerContext();

    return (
        <div className={styles.DatePicker__header}>
            <div className={styles.DatePicker__field}>{date.start}</div>
            <div className={styles.DatePicker__field}>{date.end}</div>
        </div>
    );
};
const DateNavBtn = ({ term }) => {
    const { onClickNavBtn } = useDatePickerContext();

    return (
        <div className={styles.DatePicker__term} role="button" tabIndex={0} onClick={() => onClickNavBtn(term.id)}>
            <p className={styles[`DatePicker__${term.active}`]}>{term.text}</p>
        </div>
    );
};
const DatePickerBody = () => {
    const { navigation, date, navTerms, onCalendar } = useDatePickerContext();

    return (
        <div className={styles.DatePicker__body}>
            {(navigation === 'totalAble' || navigation === 'able') && (
                <div className={styles.DatePicker__body__left}>
                    {navTerms.map((term) =>
                        term.id === 'total' && navigation === 'able' ? null : <DateNavBtn key={term.id} term={term} />
                    )}
                </div>
            )}

            <div className={styles.DatePicker__body__right}>
                <Calendar
                    start={date.start === 'dd/mm/yyyy' ? new Date() : new Date(date.start)}
                    end={date.end === 'dd/mm/yyyy' ? new Date() : new Date(date.end)}
                    onCalendar={onCalendar}
                />
            </div>
        </div>
    );
};
const DatePickerFooter = () => {
    const { onClickFooterBtn } = useDatePickerContext();

    return (
        <div className={styles.DatePicker__footer}>
            <button name="cancel" type="button" className="btn btn-lg btn-link mr-3" onClick={onClickFooterBtn}>
                취소
            </button>
            <button name="apply" type="button" className="btn btn-lg btn-primary" onClick={onClickFooterBtn}>
                적용
            </button>
        </div>
    );
};

// navigation : 'totalAble', 'able', 'disable'
DatePicker.defaultProps = {
    open: true,
    onClose: () => false,
    getDate: (v) => v,
    navigation: 'totalAble',
    totalStart: new Date('1970.01.01'),
    totalEnd: new Date('2999.12.31'),
};

export default DatePicker;
