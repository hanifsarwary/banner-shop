import { State, Action, StateContext, Selector } from '@ngxs/store';
import { UpdateDateRange, UpdateDateRangeType } from './actions';
import { DateRange } from '../banner-admin/admin-components/model/DateRange';

@State<DateRange>({
    name: 'dateRange',
    defaults: {
        due_date_start: '2019-10-10',
        due_date_end: '2019-10-04',
        order_date_start: '2019-10-10',
        order_date_end: '2019-10-04'
    }
})

export class DateRangeState {
    // Section 4
    @Selector()
    static getDateRange(state: DateRange) {
        return state;
    }

    // Section 5
    @Action(UpdateDateRange)
    remove({getState, patchState }: StateContext<DateRange>, { payload }: UpdateDateRange) {
        patchState(payload);
    }

    @Action(UpdateDateRangeType)
    update({getState, patchState }: StateContext<DateRange>, { payload }: UpdateDateRangeType) {}
}
