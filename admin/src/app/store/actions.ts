import { DateRange } from '../banner-admin/admin-components/model/DateRange';


export class UpdateDateRange {
    static readonly type = '[DATERANGE] Update';

    constructor(public payload: DateRange) {}
}

export class UpdateDateRangeType {
    static readonly type = '[DATERANGETYPE] Update';

    constructor(public payload: string) {}
}
