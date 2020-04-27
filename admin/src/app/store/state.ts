import { State, Action, StateContext, Selector } from '@ngxs/store';
import { UpdateDateRange, UpdateDateRangeType } from './actions';
import { DateRange } from '../banner-admin/admin-components/model/DateRange';

@State<DateRange>({
    name: 'dateRange',
    defaults: {
        due_date_start: '',
        due_date_end: '',
        order_date_start: '',
        order_date_end: ''
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
