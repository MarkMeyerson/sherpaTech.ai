// Test script to verify backend integration setup
// Note: This is a Node.js script for testing, not a browser module

console.log('🧪 Testing Backend Integration Setup...\n');

// Test 1: Check if files exist
try {
  const fs = await import('fs');
  const path = await import('path');
  
  const envPath = path.join(process.cwd(), '.env.local');
  const serviceExists = fs.existsSync(path.join(process.cwd(), 'src', 'services', 'trainingService.js'));
  
  console.log('✅ TrainingService file exists:', serviceExists);
  console.log('✅ Environment file exists:', fs.existsSync(envPath));
  
  if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, 'utf8');
    const hasViteUrl = envContent.includes('VITE_SUPABASE_URL=') && !envContent.includes('VITE_SUPABASE_URL=YOUR_SUPABASE_URL');
    const hasViteKey = envContent.includes('VITE_SUPABASE_ANON_KEY=') && !envContent.includes('VITE_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY');
    
    console.log('🌐 Vite Supabase URL configured:', hasViteUrl);
    console.log('🔑 Vite Supabase Key configured:', hasViteKey);
    
    if (hasViteUrl && hasViteKey) {
      console.log('\n🎉 Backend is properly configured!');
      console.log('✨ Your app will sync data to the cloud');
    } else {
      console.log('\n⚠️  Backend not configured - running in offline mode');
      console.log('📝 Follow BACKEND_SETUP_GUIDE.md to enable cloud sync');
    }
  } else {
    console.log('\n⚠️  Environment file not found');
    console.log('📝 Create .env.local file with your Supabase credentials');
  }

  console.log('\n📋 Next Steps:');
  console.log('1. Start your app: npm start');
  console.log('2. Register as a new user');
  console.log('3. Complete some training items');
  console.log('4. Check for "Offline Mode" or "Synced" status in header');
  
  if (!fs.existsSync(envPath) || envContent.includes('YOUR_SUPABASE_URL')) {
    console.log('5. Follow BACKEND_SETUP_GUIDE.md to enable cloud storage');
  }

} catch (error) {
  console.error('Error testing setup:', error.message);
}
