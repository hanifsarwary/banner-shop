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
    quoted_price?: 0;
    final_size?: 0;
    invoice_number?: '';
    shipping_type?: '';
    shipping_contact_name?: '';
    shipping_street_address: '';
    shipping_city?: '';
    shipping_state?: '';
    shipping_zip_code?: '';
    created_at?: '';
    product?: any;
    order_options?: any;
}
