import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://ikucpcyxsskonysjcuox.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlrdWNwY3l4c3Nrb255c2pjdW94Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc1ODMwODcsImV4cCI6MjA2MzE1OTA4N30.jw944ygMo6myTk3TRcdCYhPL1JUDTMzTlqWoEEYi3bw";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
