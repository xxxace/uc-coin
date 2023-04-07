import { useState, ChangeEvent, FormEvent } from 'react';
import ipfsClient from './IpfsClient';

function FileUploader() {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (!file) return;

    try {
      const fileBuffer = await file.arrayBuffer();
      const result = await ipfsClient.add(new Uint8Array(fileBuffer));
      console.log('IPFS result:', result);
      alert(`文件已成功上传，CID：${result.path}`);
    } catch (error) {
      console.error('上传文件到 IPFS 时发生错误：', error);
      alert('上传文件失败，请重试。');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" onChange={handleFileChange} />
      <button type="submit">上传到 IPFS</button>
    </form>
    
  );
};

export default FileUploader;