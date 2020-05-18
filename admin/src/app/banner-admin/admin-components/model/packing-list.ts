import { BoxList } from './boxsList';

export class PackingList {
    id?: '';
    first_name?: '';
    last_name?: '';
    address?: '';
    city?: '';
    company_name?: '';
    country?: '';
    phone_number?: '';
    zip_code?: '';
    due_date?: '';
    comments?: '';
    received_by?: '';
    boxes?: BoxList[];
}
