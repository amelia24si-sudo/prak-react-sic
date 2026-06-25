import { createClient } from '@supabase/supabase-js';
import 'dotenv/config';

const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.VITE_SUPABASE_ANON_KEY);

async function checkColumn(name) {
  const { data, error } = await supabase.from('orders').select(name).limit(1);
  console.log(`${name}:`, error ? `${error.code} ${error.message}` : 'OK', data);
}

async function main() {
  const cols = ['total_amount', 'amount', 'price', 'order_date', 'customer_name', 'status', 'created_at'];
  for (const col of cols) {
    await checkColumn(col);
  }
}

main().catch((err) => { console.error(err); process.exit(1); });