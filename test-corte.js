const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(
    'https://auxbzlyvdjmdevffzhnn.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF1eGJ6bHl2ZGptZGV2ZmZ6aG5uIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA0NDY5NjgsImV4cCI6MjA4NjAyMjk2OH0.tcItDrvIciC6umD_G6ylspXYMqebs0oWek-lPCMt0LA'
);

async function test() {
    console.log('Testing connection to Supabase...');
    const { data, error } = await supabase.from('corte_feed').select('*').limit(1);
    if (error) {
        console.error('Supabase Error:', error);
    } else {
        console.log('Data:', data);
    }
}
test();
