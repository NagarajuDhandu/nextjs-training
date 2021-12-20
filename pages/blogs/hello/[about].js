import { useRouter } from "next/router";
function Hello({ users }) {
  const router = useRouter();
  const resp = router.query;
  //console.log(resp);
  const real = resp.about;
  //console.log(real);
  return (
    <>
      <h1>User list</h1>
      {users.map((user) => {
        return real == user.id ? (
          <div>
            <h1> {user.email}</h1>
            <h1> {user.name}</h1>
            <h1> {user.username}</h1>
            <h1> {user.id}</h1>
          </div>
        ) : (
          <h1></h1>
        );
      })}
    </>
  );
}

export default Hello;

export async function getStaticProps(context) {
  const { params } = context;

  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  const result = await response.json();

  return {
    props: {
      users: result,
    },
  };
}

export async function getStaticPaths() {
  return {
    paths: [
      { params: { about: "1" } },
      { params: { about: "2" } },
      { params: { about: "3" } },
    ],
    fallback: false,
  };
}
