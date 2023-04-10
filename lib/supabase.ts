import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv' 
dotenv.config()

const supabase = createClient(
  process.env.SUPABASE_URL || "",
  process.env.SUPABASE_SERVICE_ROLE || ""
)

export default supabase