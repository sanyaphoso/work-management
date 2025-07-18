import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://vsvumjduamzzgqtndqys.supabase.co' // แก้เป็นของคุณ
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZzdnVtamR1YW16emdxdG5kcXlzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAxNDEzNTQsImV4cCI6MjA2NTcxNzM1NH0.evYHXzRbcmmyfIxYOqIgr1ANqyd2CkPR9i9KRyvAQiQ'

// const getStorage = () => {
//   // เลือก storage ตามค่าที่เราเก็บไว้ใน localStorage
//   return localStorage.getItem("rememberMe") === "true"
//     ? localStorage
//     : sessionStorage;
// };

const getStorage = () => {
  const remember = localStorage.getItem("rememberMe");
  
  if (remember === "true") {
    return localStorage;
  }

  // ✅ ถ้าไม่ติ๊ก remember me → ใช้ sessionStorage
  return sessionStorage;
};

export const supabase = createClient(
    supabaseUrl, 
    supabaseAnonKey,
    {
        auth: {
        persistSession: true,
        storage: getStorage(), // ✅ ดึงจาก rememberMe
        },
    }
)
