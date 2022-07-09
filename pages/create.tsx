import { useEffect, useState } from 'react';
import CodeEditor from '../components/CodeEditor';
import Header from '../components/Header';

const Create = () => {
  const [code, setCode] = useState('');
  const [srcDoc, setSrcDoc] = useState('');

  const handleChange = (newValue: string, e: any) => {
    setCode(newValue);
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSrcDoc(`
      <html>
          <body>${code}</body>
          <style></style>
      </html>
  `);
    }, 500);

    return () => clearTimeout(timeout);
  }, [code]);

  return (
    <div>
      {/* Output */}
      <Header />
      <div style={{ display: 'flex', background: '#fff' }}>
        <iframe
          title="output"
          sandbox="allow-scripts"
          width="500px"
          height="700px"
          srcDoc={srcDoc}
        />
        <CodeEditor onChange={handleChange} value={code} />
      </div>
    </div>
  );
};

export default Create;
