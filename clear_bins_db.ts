import "dotenv/config";
import { createClient } from "@supabase/supabase-js";

async function main() {
  const supa = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  console.log("Clearing bins for pool BHtsEQ2ZWJangaS8EoSapBdTimxZWAmhRYH4gJGdoE2B...");

  const { data, error } = await supa
    .from("dex_pools")
    .update({ bins: null })
    .eq("pool", "BHtsEQ2ZWJangaS8EoSapBdTimxZWAmhRYH4gJGdoE2B")
    .select();

  if (error) {
    console.error("Error updating bins:", error);
    process.exit(1);
  }

  console.log("Successfully cleared bins");
  console.log("Updated pool:", data);
}

main().catch(console.error);
