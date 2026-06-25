import { createClient } from '@supabase/supabase-js';
import 'dotenv/config';

const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.VITE_SUPABASE_ANON_KEY);

async function main() {
  const { data, error } = await supabase.from('orders').select('*').limit(5);
  console.log('select * result', { error, data });
}

main().catch((err) => { console.error(err); process.exit(1); });
