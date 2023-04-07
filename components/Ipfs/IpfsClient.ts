import { create } from 'ipfs-http-client';

const ipfsClient = create({
  host: 'ipfs.io',
  port: 5001,
  protocol: 'https',
});

export default ipfsClient;