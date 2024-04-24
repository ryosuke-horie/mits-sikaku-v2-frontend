export default function PageTitle(props: { title: string }) {
  return (
    <div className="mt-4 flex flex-row items-start lg:mb-4 lg:mt-0">
      <h1 className="ml-4 text-3xl font-extrabold leading-none tracking-tight text-point-green-dark dark:text-point-green-light md:text-5xl lg:text-5xl">
        {props.title}
      </h1>
    </div>
  );
}
