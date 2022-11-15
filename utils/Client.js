import sanityClient from '@sanity/client';
import imgUrlBuilder from '@sanity/image-url';

export const client = sanityClient({
  projectId: 'uywsb6pf',
  dataset: 'production',
  apiVersion: '2022-11-12',
  useCdn: true,
  token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
  ignoreBrowserTokenWarning: true,
});

const builder = imgUrlBuilder(client);

export const urlFor = (source) => builder.image(source);
