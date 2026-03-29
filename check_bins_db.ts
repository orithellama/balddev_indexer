import "dotenv/config";
import { createClient } from "@supabase/supabase-js";

async function main() {
  const supa = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const { data, error } = await supa
    .from("dex_pools")
    .select("pool, bins")
    .eq("pool", "BHtsEQ2ZWJangaS8EoSapBdTimxZWAmhRYH4gJGdoE2B")
    .single();

  if (error) {
    console.error("Error:", error);
    process.exit(1);
  }

  console.log("Pool:", data.pool);
  console.log("Bins type:", typeof data.bins);
  console.log("Bins value:", data.bins);

  if (typeof data.bins === "string") {
    const parsed = JSON.parse(data.bins);
    console.log("Parsed bins length:", Array.isArray(parsed) ? parsed.length : "not array");
    if (Array.isArray(parsed) && parsed.length > 0) {
      console.log("First few bins:", parsed.slice(0, 3));
    }
  } else if (Array.isArray(data.bins)) {
    console.log("Bins array length:", data.bins.length);
    if (data.bins.length > 0) {
      console.log("First few bins:", data.bins.slice(0, 3));
    }
  } else if (data.bins === null) {
    console.log("✅ Bins is NULL (correctly cleared)");
  }
}

main().catch(console.error);
