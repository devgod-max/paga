import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  "https://hatvvepwaoasyplzxamd.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhhdHZ2ZXB3YW9hc3lwbHp4YW1kIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc1MDQxOTYsImV4cCI6MjA2MzA4MDE5Nn0.Ul_mZ6OHxDIUwc2W_8xseBJd6DZ9Jj2HDQWSDuNYzss"
);
