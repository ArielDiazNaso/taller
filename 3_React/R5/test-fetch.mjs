const url = 'https://registrousuarios-arieldiaznaso.aws-ap-south-1.turso.io/v2/pipeline';
const authToken = 'eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3OTA1OTMyMTcsImlkIjoiMDFhMGU1NjUtZDEwMS03NzY0LTkxMzUtNWI2YTczOGI4YzhiIiwia2lkIjoiUWlOVGlQdjI1V0lLdHZKb0p2Q3BYQjI3Ql8wb0NhbDQwdmV1U2VEZDJlbyIsInJpZCI6ImU1ODcyZGM3LTc3MTctNGZlNy05YmVmLTVmNmY3MjMyOWM5OSJ9.w6eiwiVzgDPuLgOgFokeyQ70jV6yQolYChlfnz_iDzIoyv6_PM98mu5Ad3VWR4TvWdi2QB4q-KYt-Rm_3cxABg';

async function testFetch() {
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${authToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      requests: [
        { type: 'execute', stmt: { sql: 'SELECT 1 + 1 as res' } },
        { type: 'close' }
      ]
    })
  });
  console.log('Status:', res.status);
  const data = await res.json();
  console.log('Response:', JSON.stringify(data, null, 2));
}

testFetch();
