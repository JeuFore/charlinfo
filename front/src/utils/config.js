export default {
  localApiUrl: process.env.LOCAL_API_URL || 'http://192.168.1.12:1443/api',
  demoMode: process.env.DEMO_MODE === 'true',
};