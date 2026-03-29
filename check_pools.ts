import "dotenv/config";
import { supabase } from './src/supabase.js';

const { data, error } = await supabase
  .from('dex_pools')
  .select('pool, base_vault, quote_vault, lp_mint, active_bin, initial_bin, base_fee_bps, bin_step_bps, admin, paused_bits, creator_fee_vault, holders_fee_vault, nft_fee_vault')
  .limit(5);

if (error) {
  console.error(error);
  process.exit(1);
}

console.log('Pool data:');
console.table(data);
