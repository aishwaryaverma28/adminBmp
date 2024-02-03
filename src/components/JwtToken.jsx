import React, { useEffect } from 'react';

const JwtToken = () => {
  useEffect(() => {
    // Your user data or payload
    const userPayload = {
      userId: '123',
      username: 'exampleUser',
    };

    // Your secret key (should be securely stored on the server in a real-world scenario)
    const secretKey = 'yourSecretKey';

    // Header (typically includes the algorithm and token type)
    const header = {
      alg: 'HS256',
      typ: 'JWT',
    };

    // Combine header and payload, and encode them in Base64
    const encodedHeader = btoa(JSON.stringify(header));
    const encodedPayload = btoa(JSON.stringify(userPayload));

    // Create the token by concatenating the encoded header, payload, and a signature (HMAC-SHA256 in this example)
    const signature = btoa(
      new TextEncoder().encode(encodedHeader + '.' + encodedPayload + secretKey)
    );

    const jwtToken = `${encodedHeader}.${encodedPayload}.${signature}`;

    console.log('Generated JWT Token:', jwtToken);

    // Now, you can use the token as needed (e.g., store it in local storage, send it to the server for authentication, etc.)
  }, []);

  return (
    <div>
      {/* Your component JSX */}
    </div>
  );
};

export default JwtToken;
