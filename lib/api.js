import client from "./sanity";
import imageUrlBuilder from "@sanity/image-url";

const blogFields = `
    title,
    subtitle,
    'slug':slug.current,
    date,
    'author':author->{name, 'avatar':avatar.asset->url},
    coverImage
`;
const builder = imageUrlBuilder(client);

export function urlFor(source) {
  return builder.image(source);
}

export async function getAllBlogs() {
  const result = await client.fetch(`*[_type == "blog"] | order(date asc) {${blogFields}}`);

  return result;
}

export async function getPaginatedBlogs({offset, date}={offset:0, date: 'asc'}) {
  const result = await client.fetch(`*[_type == "blog"] | order(date ${date}) {${blogFields}}[${offset}...${offset +6}]`);

  return result;
}

export async function getBlogBySlug(slug) {
  const result = await client
    .fetch(
      `*[_type == "blog" && slug.current == $slug] {
        ${blogFields},
        content[]{..., "asset":asset->}
    }`,
      { slug }
    )
    .then((res) => res?.[0]);

  return result;
}
