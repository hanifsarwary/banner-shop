import { CustomerList } from './customer-list';
import { AddedByList } from './added-by';

export class CustomOrderList {
    id?: '';
    custom_job_name?: '';
    custom_product_name?: '';
    custom_quantity?: '';
    custom_version?: '';
    custom_proof?: '';
    custom_sample?: '';
    custom_paper?: '';
    flat_size?: '';
    ink_color?: '';
    internal_notes?: '';
    job_number?: '';
    reference_number?: '';
    details?: '';
    special_instructoon: '';
    due_date?: '';
    start_date?: '';
    status?: '';
    customer?: CustomerList;
    added_by?: AddedByList;
    ticket_count?: '';
    quoted_price?: '';
    final_size: '';

}
